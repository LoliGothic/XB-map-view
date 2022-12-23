import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from "@react-google-maps/api";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [size, setSize] = useState(undefined);
  const [loginUserData, setLoginUserData] = useState([]);
  const [allShopInfo, setAllShopInfo] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521});
  const explanation = useRef(null);
  const router = useRouter();

  // googlemapの設定
  const containerStyle = {
    height: "92%",
    width: "100%",
  };
  const infoWindowOptions = {
    pixelOffset: size,
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  useEffect(() => {
    // ログインしているかチェック
    checkLoginStatus();

    // 初期座標をセットする
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "shop")
      .then((res) => {
        const allShop = []
        res.data.forEach((shopInfo) => {
          allShop.push({id: shopInfo.Id, name: shopInfo.Name, adress: shopInfo.Adress, lat: shopInfo.Lat, lng: shopInfo.Lng, type01: shopInfo.Type01, type02: shopInfo.Type02, type03: shopInfo.Type03, visible: false});
        })

        // データベースから取ってきたお店の情報に表示/非表示を判別するvisibleを付け加えてallShopInfoに格納
        setAllShopInfo(allShop);
      })
      .catch((err) => {
        alert(err.response.data);
      })
  },[])

  function checkLoginStatus() {
    // passwordとemailをlocalStorageから取得する
    const password = localStorage.getItem("session");
    const email = localStorage.getItem("identity");

    // 二つとも存在すれば，dbの値を一致するか確認
    if (password != null && email != null) {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "check", {
          password: password,
          email: email
        })
        .then((res) => {
          setLoginUserData(res.data);
        })
        // 一致しなければログイン画面に遷移
        .catch((err) => {
          router.push({pathname: "/Login"});
        })
    }
    // どちらかがlocalStorageに存在しなければログイン画面に遷移
    else {
      router.push({pathname: "/Login"});
    }
  }

  function successCallback(position) {
    setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
  }

  function errorCallback(error) {
    setCenter({lat: 35.69575, lng: 139.77521});
  }

  function showInfoWindow(shopId) {
    const allShop = [];
    allShopInfo.forEach((shopInfo) => {
      // クリックしたマーカーのvisibleをtrueにして，表示する
      if (shopInfo.id === shopId) {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: true});
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng});
      }
      // クリックしたマーカー以外のvisibleをfalseにして，非表示にする
      else {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
      }
    })

    setAllShopInfo(allShop);

    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + `review/${shopId}`)
      .then((res) => {
        // 全ての口コミを取得してきてreviewsに格納
        const tmpReviews = [];
        res.data.forEach((review) => {
          tmpReviews.push({id: review.Id, shopId: review.ShopId, createdAt: review.CreatedAt.substring(0,10), explanation: review.Explanation, name: review.Name, password: review.Password, email: review.Email});
        })
        setReviews(tmpReviews);
      })
  }

  function closeInfoWindow(shopId) {
    const allShop = [];
    allShopInfo.forEach((shopInfo) => {
      if (shopInfo.id === shopId) {
        allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
        setCenter({lat: shopInfo.lat, lng: shopInfo.lng});
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
    allShopInfo.forEach((shopInfo) => {
      allShop.push({id: shopInfo.id, name: shopInfo.name, adress: shopInfo.adress, lat: shopInfo.lat, lng: shopInfo.lng, type01: shopInfo.type01, type02: shopInfo.type02, type03: shopInfo.type03, visible: false});
    })

    setAllShopInfo(allShop);
  }

  function postReview(shopId, e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // ログインしているかチェック
    checkLoginStatus();

    // stateのloginUserDataが存在すれば口コミを投稿する
    if (loginUserData != null) {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "review", {
          userId: loginUserData.Id,
          shopId: shopId,
          explanation: explanation.current.value
        })
        .then((res) => {
          // 全ての口コミを取得してきてreviewsに格納
          const tmpReviews = [];
          res.data.forEach((review) => {
            tmpReviews.push({id: review.Id, shopId: review.ShopId, createdAt: review.CreatedAt.substring(0,10), explanation: review.Explanation, name: review.Name, password: review.Password, email: review.Email});
          })
          setReviews(tmpReviews);
          explanation.current.value = "";
        })
        .catch((err) => {
          alert(err.response.data);
        })
      }
    
  }

  function deleteReview(id, shopId) {
    if (window.confirm("投稿を削除しますか？")) {
      // ログインしているかチェック
      checkLoginStatus();
      
      axios
        .delete(process.env.NEXT_PUBLIC_BACKEND_API_URL + "review", {
          data: {
            id: id,
            shopId: shopId
          }
        })
        .then((res) => {
          // 全ての口コミを取得してきてreviewsに格納
          const tmpReviews = [];
          res.data.forEach((review) => {
            tmpReviews.push({id: review.Id, shopId: review.ShopId, createdAt: review.CreatedAt.substring(0,10), explanation: review.Explanation, name: review.Name, password: review.Password, email: review.Email});
          })
          setReviews(tmpReviews);
        })
    }
  }

  return (
    <div className={styles.window}>  
      <Header />
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} onLoad={() => createOffsetSize()}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onClick={resetVisible}> 
          {allShopInfo && allShopInfo.map((shopInfo, index) => {
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
                      <h1>{shopInfo.name}</h1>
                      <p className={styles["shop-adress"]}>{shopInfo.adress}</p>
                      <div className={styles["review-list"]}>
                        {reviews && reviews.map((review, index) => {
                            return (
                              <div key={index} className={styles.review}>
                                <p className={styles["user-name"]}>{review.name}</p>
                                <p className={styles["review-time"]}>{review.createdAt}</p>
                                {review.email == loginUserData.Email && review.password == loginUserData.Password &&
                                  <p className={styles.batsu} onClick={deleteReview.bind(this, review.id, review.shopId)}>×</p>
                                }
                                <p className={styles.explanation}>{review.explanation}</p>
                              </div>
                            )
                        })}
                      </div>
                      <form method="post" onSubmit={(e) => postReview(shopInfo.id, e)}>
                        <input type="text" className={styles["input-explanation"]} placeholder="100文字以内で入力してください" ref={explanation} maxLength="100" required />
                        <button className={styles["post-explanation"]}>投稿</button>
                      </form>
                    </div>
                  </InfoWindowF>
                </div>
              )
            }
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}