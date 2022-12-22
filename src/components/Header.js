import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "../styles/Header.module.css"

export default function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <header className={styles.header}>
      <img className={styles.img} src="/text_header-title.png" alt="title" />
      <span className={styles.menu} onClick={() => setDrawerOpened(true)}>
        <hr /><hr /><hr />
      </span>
      <Drawer className={styles.drawer} anchor="right" open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <ul className={styles["bullet-point"]}>
          <li>
            <HomeIcon className={styles.icon} />
            TOPページ
          </li>
          <li>
            <AccountCircleIcon className={styles.icon} />
            ユーザー名変更
          </li>
          <li>
            <LockIcon className={styles.icon} />
            パスワード変更
          </li>
          <li>
            <LogoutIcon className={styles.icon} />
            ログアウト
          </li>
        </ul>
      </Drawer>
    </header>
  )
}