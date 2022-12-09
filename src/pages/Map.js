import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from "@react-google-maps/api";
import axios from "axios";
import styles from "../styles/Map.module.css";

export default function Map() {
  const [allShopInfo, setAllShopInfo] = useState([]);
  const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "shop")
      .then((res) => {
        const allShop = []
        res.data.forEach((shopInfo) => {
          allShop.push({id: shopInfo.Id, name: shopInfo.Name, adress: shopInfo.Adress, lat: shopInfo.Lat, lng: shopInfo.Lng, type01: shopInfo.Type01, type02: shopInfo.Type02, type03: shopInfo.Type03, visible: false});
        })
        // データベースから取ってきたお店の情報に表示/非表示を判別するvisibleを付け加えてallShopInfoに格納
        setAllShopInfo(allShop)
      })
      .catch((err) => {
        console.log(err);
      })
  },[])
  const router = useRouter();
  const containerStyle = {
    height: "100vh",
    width: "100%",
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

  function showInfoWindow(shopId) {
    allShopInfo.forEach((shopInfo) => {
      if (shopInfo.id === shopId) {
        shopInfo.visible = true;
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng})
        setShow(!show)
      }
    })
  }
  
  function closeInfoWindow(shopId) {
    allShopInfo.forEach((shopInfo) => {
      if (shopInfo.id === shopId) {
        shopInfo.visible = false;
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng})
      }
    })
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} onLoad={() => createOffsetSize()}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}> 
      {allShopInfo.map((shopInfo, index) => {
        if (shopInfo.visible == false) {
          return (
            <div key={index}>
              <MarkerF position={{lat: shopInfo.lat, lng: shopInfo.lng}} onClick={showInfoWindow.bind(this, shopInfo.id)} />
            </div>
          )
        }
        else {
          return (
            <div key={index}>
              <MarkerF position={{lat: shopInfo.lat, lng: shopInfo.lng}} onClick={closeInfoWindow.bind(this, shopInfo.id)} />
              <InfoWindowF position={{lat: shopInfo.lat, lng: shopInfo.lng}} options={infoWindowOptions} onCloseClick={closeInfoWindow.bind(this, shopInfo.id)}>
                <div style={divStyle}>
                  <h1>秋葉原オフィス</h1>
                </div>
              </InfoWindowF>
            </div>
          )
        }
      })}
      </GoogleMap>
    </LoadScript>
  );
}
