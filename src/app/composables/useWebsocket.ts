import { environment } from '../../environments/environments';
import { ref, onUnmounted } from 'vue';
import { travelData, hasNewTrip, isDrivingToPassenger } from '@/services/trip/trip.data';
import { Geolocation } from '@capacitor/geolocation';
import { useWebSocket } from '@vueuse/core';

// Helper functions
const str = (data: any) => JSON.stringify(data);
const parse = (data: any) => JSON.parse(data);

// TODO: Replace hardcoded driverId with the real one
const driverId = 1;
const channelIds = { driver: "DriverCoordinatesChannel" };

export function useWebsocket() {
  const coords = ref({ title: 'COORD', lat: 0, lng: 0, driver: driverId });

  const { ws, status, send, close } = useWebSocket(environment.wsUrl, {
    onConnected: () => {
      // Subscribe to the channel
      send(str({ command: 'subscribe', identifier: str({ channel: channelIds.driver }) }));
    }
  });

  function sendMessage({ data, channelId = channelIds.driver }: { data: any; channelId?: string; }) {
    send(str({ command: 'message', identifier: str({ channel: channelId }), data: str(data) }));
  }
  
  function performAction({ action, identifier = channelIds.driver, data = {} }: { action: string, identifier?: string, data?: any }) {
    // The action gets sent through the data object    
    sendMessage({ data: { action, ...data }, channelId: identifier });
  }

  async function handleMessage(event: MessageEvent) {
    const data = parse(event.data);
    
    // Everytime it pings and if its traveling
    if (data.type === 'ping' && isDrivingToPassenger.value) {
      const { coords } = await Geolocation.getCurrentPosition();

      performAction({
        action: 'driver_coords',
        data: {
          driverCoords: {
            lat: coords.latitude,
            lng: coords.longitude,
            passengerId: 2,
          },
        },
      });
    }

    if (data.message === 'sendCoordinates') {
      const { coords: liveCoords } = await Geolocation.getCurrentPosition();      

      coords.value.lat = liveCoords.latitude;
      coords.value.lng = liveCoords.longitude;

      performAction({ action: 'send_coordinates', data: { coords: coords.value } });
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

  onUnmounted(() => {
    ws.value?.removeEventListener('message', handleMessage);
    close();
  });

  return { ws, status, send, sendMessage, performAction };
}
