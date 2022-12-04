import { useState } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, MarkerF, InfoWindow} from "@react-google-maps/api";

export default function Map() {
  const router = useRouter();

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };
  
  const center = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const positionAkiba = {
    lat: 35.69731,
    lng: 139.7747,
  };

  const positionIwamotocho = {
    lat: 35.69397,
    lng: 139.7762,
  };

  const divStyle = {
    background: "white",
    fontSize: 7.5,
  };

  const [size, setSize] = useState(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} onLoad={() => createOffsetSize()}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <MarkerF position={positionAkiba} />
        <MarkerF position={positionIwamotocho} />
        <InfoWindow position={positionAkiba} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>秋葉原オフィス</h1>
          </div>
        </InfoWindow>
        <InfoWindow position={positionIwamotocho} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>岩本町オフィス</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </LoadScript>
  );
}
