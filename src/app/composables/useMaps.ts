import { ref, onMounted, onUnmounted } from 'vue';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environments';

export function useMaps(mapRef: any) {
  const newMap = ref<GoogleMap>();
  const tmpCoords = { lat: 14.060536, lng: -87.241214 };

  onMounted(async () => {
    newMap.value = await GoogleMap.create({
      id: 'my-map',
      element: mapRef.value,
      apiKey: environment.mapsApiKey,
      config: {
        center: tmpCoords,
        zoom: 17,
        clickableIcons: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        gestureHandling: 'greedy',
      },
    });

    // Add a marker to the map
    await newMap.value.addMarker({
      coordinate: tmpCoords,
    });
  });

  // Clean up the map reference.
  onUnmounted(async () => await newMap.value?.destroy());
}
