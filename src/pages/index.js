import { useEffect, useRef} from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const name = useRef(null);
  const signupPassword = useRef(null);
  const signupEmail = useRef(null);
  const loginPassword = useRef(null);
  const loginEmail = useRef(null);

  // ログイン画面に遷移した時はlocalStorageをすべて削除する
  useEffect(() => {
    localStorage.clear();
  },[])

  function switching() {
    // signupとlogin画面を切り替え
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");

    // inputを全部クリア
    name.current.value = "";
    signupPassword.current.value = "";
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
        email: signupEmail.current.value
      })
      .then((res) => {
        alert("正常に登録されました");
      })
      .catch((err) => {
        alert(err.response.data);
      })
      .finally(() => {
        name.current.value = "";
        signupPassword.current.value = "";
        signupEmail.current.value = "";
      })
  }

  function postAccountData(e) {
    // ページがリロードする処理を無効化する
    e.preventDefault();

    // json形式でバックエンドにpassword,emailをpostする
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "login", {
        Password: loginPassword.current.value,
        Email: loginEmail.current.value
      })
      .then((res) => {
        router.push({pathname: "/Map"});
        
        // localStorageにuuidを保存
        localStorage.setItem("uuid", res.data.Uuid)
      })
      .catch((err) => {
        alert(err.response.data);
      })
      .finally(() => {
        loginPassword.current.value = "";
        loginEmail.current.value = "";
       })
  } 
  
  return (
    <div className={styles.body}>
      <div className={styles["login-page"]}>
        <div className={styles.form}>
          <form method="post" className={styles["register-form"]} onSubmit={postNewaccountData}>
            <input type="text" placeholder="username" ref={name} required />
            <input type="password" placeholder="password" ref={signupPassword} minLength="6" required />
            <input type="email" placeholder="email address" ref={signupEmail} required />
            <button>create</button>
            <p className={styles.message}>
              Already registered?{" "}
              <Link href="#" onClick={switching}>
                Sign In
              </Link>
            </p>
          </form>
          <form method="post" onSubmit={postAccountData}>
            <input type="password" placeholder="password" ref={loginPassword} required />
            <input type="email" placeholder="email address" ref={loginEmail} required />
            <button>login</button>
            <p className={styles.message}>
              Not registered?{" "}
              <Link href="#" onClick={switching}>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
