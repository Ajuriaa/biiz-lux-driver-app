import { environment } from '../../environments/environments';
import { ref, onUnmounted } from 'vue';
import { travelData, hasNewTrip, isDrivingToPassenger } from '@/services/trip/trip.data';
import { Geolocation } from '@capacitor/geolocation';
import { useWebSocket } from '@vueuse/core';

const driverId = 1;
const chanelId = JSON.stringify({ channel: 'DriverCoordinatesChannel' });

export function useWebsocket() {
  const coords = ref({ title: 'COORD', lat: 0, lng: 0, driver: driverId });

  const { ws, status, send, close } = useWebSocket(environment.wsUrl, {
    onConnected: () => {
      send(
        JSON.stringify({
          command: 'subscribe',
          identifier: chanelId,
        }),
      );
    }
  });

  async function handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);    
    
    // Everytime it pings and if its traveling
    if (data.type === 'ping' && isDrivingToPassenger.value) {
      const { coords } = await Geolocation.getCurrentPosition();

      const info = JSON.stringify({
        action: 'driver_coords',
        driverCoords: {
          lat: coords.latitude,
          lng: coords.longitude,
          passengerId: 2,
        },
      });

      const payload = JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({ channel: 'DriverCoordinatesChannel' }),
        data: info,
      });

      send(payload);
    }

    if (data.message === 'sendCoordinates') {
      // Pa despues mi dog      
      const { coords: liveCoords } = await Geolocation.getCurrentPosition();      

      coords.value.lat = liveCoords.latitude;
      coords.value.lng = liveCoords.longitude;

      const info = JSON.stringify({
        action: 'send_coordinates',
        coords: coords.value,
      });

      const payload = JSON.stringify({
        command: 'message',
        identifier: chanelId,
        data: info,
      });

      send(payload);
    }

    if (data.message && data.message.driver_id === driverId) {
      hasNewTrip.value = true;
      travelData.startCoords = data.message.start_coords;
      travelData.endCoords = data.message.end_coords;
      travelData.fare = data.message.fare;
      travelData.passengerId = data.message.passenger_id;
    }
  }

  ws.value?.addEventListener('message', handleMessage);

  // Close the websocket
  onUnmounted(() => {
    ws.value?.removeEventListener('message', handleMessage);
    close();
  });

  return { ws, status, send };
}
