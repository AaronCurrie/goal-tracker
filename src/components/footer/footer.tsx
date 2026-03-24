import Link from "next/link";
import styles from "./footer.module.css";
import Image from "../image/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return (
        <footer className={`${styles.footer}`}>
          <Link className={styles.active} href={`/goals/yearly/${currentYear}-0${currentMonth + 1}-01`}>
            <Image src={"/character/quests.png"} alt={"Quests"} />
          </Link>
          <Link className={styles.inactive} href={`/stats`}>
            <Image src={"/character/statsv2.png"} alt={"Stats"} />
          </Link>
          <span style={{ width: "120px" }}></span>
          <Link className={styles.inactive} href={`/more`}>
            <Image src={"/character/info.png"} alt={"More"} />
          </Link>
          <Link className={styles.inactive} href={`/profile`}>
            <Image src={"/character/user.png"} alt={"Profile"} />
          </Link>
        </footer>
    )
}