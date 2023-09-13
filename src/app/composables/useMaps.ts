import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environments';
import { Geolocation } from '@capacitor/geolocation';

const DEFAULT_ZOOM = 18;

export function useMaps(mapRef: Ref<HTMLDivElement>) {
  const map = ref<GoogleMap>();

  onMounted(async () => {
    const { coords } = await Geolocation.getCurrentPosition();
    
    map.value = await GoogleMap.create({
      id: 'driver-map',
      element: mapRef.value,
      apiKey: environment.mapsApiKey,
      config: {
        center: {
          lat: coords.latitude,
          lng: coords.longitude
        },
        zoom: DEFAULT_ZOOM,
        clickableIcons: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        gestureHandling: 'greedy',
      },
    });

    // Add a current position marker to the map
    await map.value.addMarker({
      coordinate: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
  });

  // Clean up the map reference.
  onUnmounted(async () => await map.value?.destroy());

  return { map };
}
