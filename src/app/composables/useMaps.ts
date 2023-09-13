import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environments';
import { Geolocation } from '@capacitor/geolocation';

const DEFAULT_MAP_ZOOM = 18;
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';

interface Coords {
  latitude: number
  longitude: number
}

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
        zoom: DEFAULT_MAP_ZOOM,
        clickableIcons: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        gestureHandling: 'greedy',
      },
    });

    // Add a current position marker to the map
    await addMarker(coords);
  });

  async function setNewMarker(coords: Coords, markerId: string) {
    map.value?.removeMarker(markerId);
    addMarker(coords);
  }

  async function addMarker(coords: Coords): Promise<void> {
    const ICON_SIZE = 60;

    const markerId = await map.value?.addMarker({
      coordinate: {
        lat: coords.latitude,
        lng: coords.longitude
      },
      iconUrl: MARKER_IMAGE,
      iconSize: { height: ICON_SIZE, width: ICON_SIZE },
      iconOrigin: { x: 0, y: 0 },
      iconAnchor: { x: ICON_SIZE / 2, y: (ICON_SIZE / 2) + 3 },
      draggable: true,
    });
    
    await map.value?.setOnMapClickListener(({ latitude, longitude }) => {
      const newCoords: Coords = { latitude, longitude };
      if (markerId) setNewMarker(newCoords, markerId);
    });
  }

  // Clean up the map reference.
  onUnmounted(async () => await map.value?.destroy());

  return { map };
}
