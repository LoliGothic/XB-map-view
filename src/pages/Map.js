import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from "@react-google-maps/api";
import axios from "axios";
import styles from "../styles/Map.module.css";

export default function Map() {
  const [allShopInfo, setAllShopInfo] = useState([]);
  const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521});

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

  // 地図の大きさ指定
  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const [size, setSize] = useState(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  function showInfoWindow(shopId) {
    const allShop = [];
    allShopInfo.forEach((shopInfo) => {
      // クリックしたマーカーのvisibleをtrueにして，表示する
      if (shopInfo.id === shopId) {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: true});
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng})
      }
      // クリックしたマーカー以外のvisibleをfalseにして，非表示にする
      else {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
      }
    })

    setAllShopInfo(allShop)
  }

  function closeInfoWindow(shopId) {
    const allShop = [];
    allShopInfo.forEach((shopInfo) => {
      if (shopInfo.id === shopId) {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng})
      }
      else {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
      }
    })

    setAllShopInfo(allShop);
  }

  // マーカー以外の地図をおしたら，すべてvisibleをfalseにし，非表示にする
  function resetVisible() {
    const allShop = [];
    setAllShopInfo(allShopInfo.forEach((shopInfo) => {
      allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
    }))

    setAllShopInfo(allShop)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} onLoad={() => createOffsetSize()}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} onClick={resetVisible}> 
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
                <div className={styles["info-window"]}>
                  <h1 className={styles["shop-name"]}>{shopInfo.name}</h1>
                  <p className={styles["shop-adress"]}>{shopInfo.adress}</p>
                  <div className={styles.scr}>
                    <div className={styles.review}>
                      <p className={styles["user-name"]}>るてん</p>
                      <p className={styles["review-time"]}>11時30分</p>
                      <p className={styles.moji}>椅子アリ！二台あり！ディスペンサー二つとも超2弾が入っている！</p>
                    </div>
                    <div className={styles.review}>
                      <p className={styles["user-name"]}>ぽこピー</p>
                      <p className={styles["review-time"]}>11時30分</p>
                      <p className={styles.moji}>獣王痛恨撃あああああああああああああああああああああああああああああああああ</p>
                    </div>
                    <div className={styles.review}>
                      <p className={styles["user-name"]}>ぽこピー</p>
                      <p className={styles["review-time"]}>11時30分</p>
                      <p className={styles.moji}>獣王痛恨撃あああああああああああああああああああああああああああああああああ</p>
                    </div>
                    <div className={styles.review}>
                      <p className={styles["user-name"]}>ぽこピー</p>
                      <p className={styles["review-time"]}>11時30分</p>
                      <p className={styles.moji}>獣王痛恨撃あああああああああああああああああああああああああああああああああ</p>
                    </div>
                    <div className={styles.review}>
                      <p className={styles["user-name"]}>ぽこピー</p>
                      <p className={styles["review-time"]}>11時30分</p>
                      <p className={styles.moji}>獣王痛恨撃</p>
                    </div>
                  </div>
                  <div>
                    <input type="text" className={styles["input"]} />
                    <button className={styles["post"]}>投稿</button>
                  </div>
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
