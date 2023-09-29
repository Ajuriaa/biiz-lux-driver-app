import { ref, Ref } from 'vue';
import { environment } from '../../environments/environments';
import { Geolocation } from '@capacitor/geolocation';
import { Loader } from '@googlemaps/js-api-loader'

const DEFAULT_MAP_ZOOM = 18;
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';
const MAP_ID = 'f8e6a2472dfc90b0';

interface ICoordinate {
  lat: number
  lng: number
}

export function useMaps(mapRef: Ref<HTMLDivElement>) {
  const map = ref<google.maps.Map>();
  let mapMarker: google.maps.Marker | null;
  let geocoder: google.maps.Geocoder;

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

    geocoder = new google.maps.Geocoder();
    
    // Add a current position marker to the map
    addMarker({ lat: coords.latitude, lng: coords.longitude });

    return { map, coords };
  }

  function addMarker(coords: ICoordinate) {
    const ICON_SIZE = 70;

    // Clean the previous marker
    if (mapMarker) mapMarker?.setMap(null);

    mapMarker = new google.maps.Marker({
      map: map.value,
      position: {
        lat: coords.lat,
        lng: coords.lng
      },
      icon: {
        url: MARKER_IMAGE,
        size: new google.maps.Size(ICON_SIZE, ICON_SIZE),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(ICON_SIZE / 2.5, (ICON_SIZE / 2) + 3)
      },
    });
  }

  function getCoordinateFromPlace(address: string): Promise<ICoordinate> {
    return new Promise<ICoordinate>((resolve, reject) => {
      const options: google.maps.GeocoderRequest = {
        address: address,
        language: 'es',
        region: 'HN'
      };

      geocoder.geocode(options, (results, status) => {
        if (status === 'OK' && results) {
          const coord = results[0].geometry.location;
          const coordinates: ICoordinate = { lat: coord.lat(), lng: coord.lng() };
          resolve(coordinates);
        } else {
          reject(new Error(`Geocoding failed with status: ${status}`));
        }
      });
    });
  }

  function getPlaceFromCoordinate(coordinate: ICoordinate): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const options: google.maps.GeocoderRequest = {
        language: 'es',
        region: 'HN',
        location: coordinate
      };

      geocoder.geocode(options, (results, status) => {
        console.log(results);
        if (status === 'OK' && results) {
          const address = results[0].formatted_address;
          resolve(address);
        } else {
          reject(new Error(`Reverse geocoding failed with status: ${status}`));
        }
      });
    });
  }

  return { createMap, addMarker, getCoordinateFromPlace, getPlaceFromCoordinate };
}
