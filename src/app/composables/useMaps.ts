import { ref, Ref } from 'vue';
import { environment } from '../../environments/environments';
import { Geolocation } from '@capacitor/geolocation';
import { Loader } from '@googlemaps/js-api-loader'

const DEFAULT_MAP_ZOOM = 18;
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';
const MAP_ID = 'f8e6a2472dfc90b0';

interface Coords {
  latitude: number
  longitude: number
}

export function useMaps(mapRef: Ref<HTMLDivElement>) {
  const map = ref<google.maps.Map>();
  let mapMarker: google.maps.Marker | null;

  async function createMap() {
    const { coords } = await Geolocation.getCurrentPosition();

    const loader = new Loader({ apiKey: environment.mapsApiKey });

    const { Map } = await loader.importLibrary('maps');

    map.value = new Map(mapRef.value, {
      mapId: MAP_ID,
      center: {
        lat: coords.latitude,
        lng: coords.longitude
      },
      zoom: DEFAULT_MAP_ZOOM,
      clickableIcons: false,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      gestureHandling: 'greedy',
    });
    
    // Add a current position marker to the map
    addMarker(coords);

    return { map, coords };
  }

  function addMarker(coords: Coords) {
    const ICON_SIZE = 70;

    // Clean the previous marker
    if (mapMarker) mapMarker?.setMap(null);

    mapMarker = new google.maps.Marker({
      map: map.value,
      position: {
        lat: coords.latitude,
        lng: coords.longitude
      },
      icon: {
        url: MARKER_IMAGE,
        size: new google.maps.Size(ICON_SIZE, ICON_SIZE),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(ICON_SIZE / 2.5, (ICON_SIZE / 2) + 3)
      },
      draggable: true,
    });
  }

  return { createMap, addMarker };
}
