import { Ref } from 'vue';
import { environment } from '../../environments/environments';
import { Geolocation } from '@capacitor/geolocation';
import { Loader } from '@googlemaps/js-api-loader'
import { MarkerUrl } from "@/core/enums/marker";

const DEFAULT_MAP_ZOOM = 18;
const MAP_ID = 'f8e6a2472dfc90b0';

interface ICoordinate {
  lat: number
  lng: number
}

export function useMaps(mapRef: Ref<HTMLDivElement>) {
  let map: google.maps.Map;
  let mapMarker: google.maps.Marker | null;
  let geocoder: google.maps.Geocoder;
  let directionsService: google.maps.DirectionsService;
  let directionsRenderer: google.maps.DirectionsRenderer;

  const DEFAULT_MARKER_SIZE = 50;
  const DRIVER_MARKER_SIZE = 40;

  const directionOptions: google.maps.DirectionsRendererOptions = {
    polylineOptions: { strokeColor: '#00E741' },
    suppressMarkers: true
  };

  async function createMap() {
    const { coords } = await Geolocation.getCurrentPosition();

    const loader = new Loader({ apiKey: environment.mapsApiKey });

    const { Map } = await loader.importLibrary('maps');

    map = new Map(mapRef.value, {
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

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer(directionOptions);
    geocoder = new google.maps.Geocoder();

    return { myCoords: coords };
  }

  function addMarker(coords: ICoordinate, markerUrl: MarkerUrl) {
    const iconType = markerUrl === MarkerUrl.driver ? {
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(DRIVER_MARKER_SIZE/2 , DRIVER_MARKER_SIZE / 4 ),
      url: MarkerUrl.driver,
      scaledSize: new google.maps.Size(DRIVER_MARKER_SIZE , DEFAULT_MARKER_SIZE/2)
    } : {
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(DEFAULT_MARKER_SIZE/2.5 , ( DEFAULT_MARKER_SIZE / 2 ) + 3),
      url: MarkerUrl.passenger,
      scaledSize: new google.maps.Size(DEFAULT_MARKER_SIZE, DEFAULT_MARKER_SIZE)
    };

    mapMarker = new google.maps.Marker({
      map: map,
      position: {
        lat: coords.lat,
        lng: coords.lng
      },
      icon: iconType,
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

  function renderRoute(origin: ICoordinate, destination: ICoordinate) {
    directionsRenderer.setMap(map);
    addMarker(origin, MarkerUrl.passenger);
    addMarker(destination, MarkerUrl.driver);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        console.log(response)
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      }
    );
  }

  return { createMap, addMarker, getCoordinateFromPlace, getPlaceFromCoordinate, renderRoute };
}
