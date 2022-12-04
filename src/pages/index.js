import { useRef } from "react";
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

  function postNewaccountData() {
    // json形式でバックエンドにname,password,emailをpostする
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "signup", {
        name: name.current.value,
        password: signupPassword.current.value,
        email: signupEmail.current.value
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data);
      })

    name.current.value = "";
    signupPassword.current.value = "";
    signupEmail.current.value = "";
  }

  function postAccountData() {
    // json形式でバックエンドにpassword,emailをpostする
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_API_URL + "login", {
        Password: loginPassword.current.value,
        Email: loginEmail.current.value
      })
      .then((res) => {
        router.push({pathname: "/Map", query: res.data}, "/Map")
      })
      .catch((err) => {
        alert(err.response.data);
      })
  }
  
  return (
    <div className={styles.body}>
      <div className={styles.loginPage}>
        <div className={styles.form}>
          <form className={styles.registerForm}>
            <input type="text" placeholder="username" ref={name} required />
            <input type="password" placeholder="password" ref={signupPassword} required />
            <input type="email" placeholder="email address" ref={signupEmail} required />
            <button type="button" onClick={postNewaccountData}>create</button>
            <p className={styles.message}>
              Already registered?{" "}
              <Link href="#" onClick={switching}>
                Sign In
              </Link>
            </p>
          </form>
          <form className={styles.loginForm}>
            <input type="password" placeholder="password" ref={loginPassword} required />
            <input type="email" placeholder="email address" ref={loginEmail} required />
            <button type="button" onClick={postAccountData}>login</button>
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
