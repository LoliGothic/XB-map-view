import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import styles from "../styles/Header.module.css"

export default function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <header className={styles.header}>
      <img className={styles.img} src="/text_header-title.png" alt="title" />
      <span className={styles.menu} onClick={() => setDrawerOpened(true)}>
        <hr /><hr /><hr />
      </span>
      <Drawer anchor="right" open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <p>hello</p>
      </Drawer>
    </header>
  )
}