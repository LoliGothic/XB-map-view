import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import Header from "../components/Header"
import styles from "../styles/Change.module.css";

export default function ChangePassword() {
  const [loginUserData, setLoginUserData] = useState([])
  const newName = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // ログインしているかチェック
    checkLoginStatus();
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
          console.log(res.data);
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

  function postNewName(e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // ログインしているかチェック
    checkLoginStatus();

    axios
      .patch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "name", {
        email: loginUserData.Email,
        newName: newName.current.value
      })
      .then((res) => {
        alert("ユーザー名が変更されました");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      })
  }

  return (
    <div className={styles.window}>
      <Header />
    <div className={styles.body}>
      <div className={styles["change-page"]}>
        <div className={styles.form}>
          <form method="post" className={styles["register-form"]} onSubmit={postNewName}>
            <input type="text" placeholder="新しいユーザ名" ref={newName} maxLength="20" required />
            <button>変更</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}