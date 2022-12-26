import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import Header from "../components/Header";
import styles from "../styles/Change.module.css";

export default function ChangePassword() {
  const [loginUserData, setLoginUserData] = useState([]);
  const currentPassword = useRef(null);
  const newPassword = useRef(null);
  const checkNewPassword = useRef(null);
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

  function postNewPassword(e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // ログインしているかチェック
    checkLoginStatus();

    axios
      .patch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "password", {
        email: loginUserData.Email,
        currentPassword: currentPassword.current.value,
        newPassword: newPassword.current.value,
        checkNewPassword: checkNewPassword.current.value
      })
      .then((res) => {
        alert("パスワードが変更されました");

        // localStorageにemailとpasswordを保存
        localStorage.setItem("identity", res.data.Email);
        localStorage.setItem("session", res.data.Password);
      })
      .catch((err) => {
        if (err.response.data != null) {
          alert(err.response.data);
        }
        else {
          alert("エラーが発生しました")
        }
      })
      .finally(() => {
        currentPassword.current.value = "";
        newPassword.current.value = "";
        checkNewPassword.current.value = "";
      })
  }

  return (
    <div className={styles.window}>
      <Header />
      <div className={styles.body}>
        <div className={styles["change-page"]}>
          <div className={styles.form}>
            <form method="post" className={styles["register-form"]} onSubmit={postNewPassword}>
              <input type="password" placeholder="現在のパスワード" ref={currentPassword} minLength="6" required />
              <input type="password" placeholder="新しいパスワードパスワード" ref={newPassword} minLength="6" required />
              <input type="password" placeholder="新しいパスワード(確認)" ref={checkNewPassword} minLength="6" required />
              <button>変更</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}