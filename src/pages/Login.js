import { useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import styles from "../styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const name = useRef(null);
  const signupPassword = useRef(null);
  const checkSignupPassword = useRef(null);
  const signupEmail = useRef(null);
  const loginPassword = useRef(null);
  const loginEmail = useRef(null);

  // ログイン画面に遷移した時はlocalStorageをすべて削除する
  useEffect(() => {
    localStorage.clear();
    console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);
  },[])

  function switching() {
    // signupとlogin画面を切り替え
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");

    // inputを全部クリア
    name.current.value = "";
    signupPassword.current.value = "";
    checkSignupPassword.current.value = "";
    signupEmail.current.value = "";
    loginPassword.current.value = "";
    loginEmail.current.value = "";
  };

  function postNewaccountData(e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // json形式でバックエンドにname,password,emailをpostする
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "signup", {
        name: name.current.value,
        password: signupPassword.current.value,
        checkPassword: checkSignupPassword.current.value,
        email: signupEmail.current.value
      })
      .then((res) => {
        alert("正常に登録されました");
        name.current.value = "";
        signupPassword.current.value = "";
        checkSignupPassword.current.value = "";
        signupEmail.current.value = "";
      })
      .catch((err) => {
        if (err.response.data != null) {
          alert(err.response.data);
        }
        else {
          alert("エラーが発生しました")
        }
      })
  }

  function postAccountData(e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // json形式でバックエンドにpassword,emailをpostする
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "login", {
        password: loginPassword.current.value,
        email: loginEmail.current.value
      })
      .then((res) => {
        router.push({pathname: "/"});
        
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
  } 
  
  return (
    <div className={styles.body}>
      <div className={styles["login-page"]}>
        <div className={styles.form}>
          <form method="post" className={styles["register-form"]} onSubmit={postNewaccountData}>
            <input type="text" placeholder="ユーザー名" ref={name} maxLength="20" required />
            <input type="email" placeholder="メールアドレス" ref={signupEmail} required />
            <input type="password" placeholder="パスワード" ref={signupPassword} minLength="6" required autoComplete="off" />
            <input type="password" placeholder="パスワード(確認)" ref={checkSignupPassword} minLength="6" required autoComplete="off" />
            <button>アカウント作成</button>
            <p className={styles.message}>
              すでにアカウントをお持ちの方は{" "}
              <Link href="#" onClick={switching}>
                こちら
              </Link>
            </p>
          </form>
          <form method="post" onSubmit={postAccountData}>
            <input type="email" placeholder="メールアドレス" ref={loginEmail} required />
            <input type="password" placeholder="パスワード" ref={loginPassword} minLength="6" required autoComplete="off" />
            <button>ログイン</button>
            <p className={styles.message}>
              初めての方は{" "}
              <Link href="#" onClick={switching}>
                こちら
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
