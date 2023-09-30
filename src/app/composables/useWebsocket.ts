import { environment } from '../../environments/environments';
import { ref, onUnmounted } from 'vue';
import { travelData, hasNewTrip, isArriving } from '@/services/trip/trip.data';

const driverId = 1;
const chanelId = JSON.stringify({ channel: 'DriverCoordinatesChannel' });
const iLat = ref(14.098533)
const iLng = ref(-87.226023)

export function useWebsocket() {
  const ws = new WebSocket(environment.wsUrl);
  const wsStatus = ref(ws.readyState);

  const coords = ref({ title: 'COORD', lat: 14.098533, lng: -87.226023, driver: driverId });

  ws.addEventListener('open', () => {
    wsStatus.value = ws.readyState;
    ws.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: chanelId,
      }),
    );
  });

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    
    // Everytime it pings and if its traveling
    if (data.type === 'ping' && isArriving.value) {
      console.log('sending', iLat.value.toFixed(4), iLng.value.toFixed(4));
      
      // const { coords } = await Geolocation.getCurrentPosition();
      iLat.value += 0.0010;
      iLng.value += 0.0010;

      const info = JSON.stringify({
        action: 'driver_coords',
        driverCoords: {
          lat: iLat.value,
          lng: iLng.value,
          passengerId: 2
        }
      });
    
      const payload = JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({ channel: 'DriverCoordinatesChannel' }),
        data: info,
      });
    
      ws.send(payload);
    }

    if (data.message === 'sendCoordinates') {
      // Pa despues mi dog
      // const { coords } = await Geolocation.getCurrentPosition();

      const info = JSON.stringify({
        action: 'send_coordinates',
        coords: coords.value,
      });

      const payload = JSON.stringify({
        command: 'message',
        identifier: chanelId,
        data: info,
      });

      ws.send(payload);
    }

    if (data.message && data.message.driver_id === driverId) {
      hasNewTrip.value = true;
      travelData.startCoords = data.message.start_coords;
      travelData.endCoords = data.message.end_coords;
      travelData.fare = data.message.fare;
      travelData.passengerId = data.message.passenger_id;
    }
  });

  const close = () => {
    ws.close();
    wsStatus.value = ws.readyState;
  };

  // Close the websocket
  onUnmounted(() => close());

  return { ws };
}


// TODO: Pa dos meses
export function send() {

}
