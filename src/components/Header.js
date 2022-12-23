import { useState } from "react";
import { useRouter } from 'next/router';
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "../styles/Header.module.css"

export default function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const router = useRouter();

  async function transitionHome() {
    await router.push({pathname: "/"});

    // そのままhomeに戻るとapi alredy presentedエラーが出るのでリロードしてあげる
    location.reload();
  }

  function transitionChangeName() {
    router.push({pathname: "/ChangeName"});
  }

  function transitionChangePassword() {
    router.push({pathname: "/ChangePassword"});
  }

  function logout() {
    router.push({pathname: "Login"});
  }

  return (
    <header className={styles.header}>
      <img src="/text_header-title.png" alt="title" onClick={transitionHome} />
      <span className={styles.menu} onClick={() => setDrawerOpened(true)}>
        <hr /><hr /><hr />
      </span>
      <Drawer className={styles.drawer} anchor="right" open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <ul className={styles["bullet-point"]}>
          <li onClick={transitionHome}>
            <HomeIcon className={styles.icon} />
            <p>TOPページ</p>
          </li>
          <li onClick={transitionChangeName}>
            <AccountCircleIcon className={styles.icon} />
            <p>ユーザー名変更</p>
          </li>
          <li onClick={transitionChangePassword}>
            <LockIcon className={styles.icon} />
            <p>パスワード変更</p>
          </li>
          <li onClick={logout}>
            <LogoutIcon className={styles.icon} />
            <p className={styles.logout}>ログアウト</p>
          </li>
        </ul>
      </Drawer>
    </header>
  )
}