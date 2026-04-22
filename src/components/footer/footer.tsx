"use client";

import Link from "next/link";
import styles from "./footer.module.css";
import Image from "../image/image";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const goalsPath = `/goals/yearly/${currentYear}-0${currentMonth + 1}-01`;

    const isActive = (path: string) => pathname.startsWith(path);
    
    return (
        <footer className={`${styles.footer}`}>
          <Link className={isActive('/goals') ? styles.active : styles.inactive} href={goalsPath}>
            <Image src={"/character/quests.png"} alt={"Quests"} />
          </Link>
          <Link className={isActive(`/stats`) ? styles.active : styles.inactive} href={`/stats`}>
            <Image src={"/character/statsv2.png"} alt={"Stats"} />
          </Link>
          <span style={{ width: "120px" }}></span>
          <Link className={isActive(`/more`) ? styles.active : styles.inactive} href={`/more`}>
            <Image src={"/character/info.png"} alt={"More"} />
          </Link>
          <Link className={isActive(`/profile`) ? styles.active : styles.inactive} href={`/profile`}>
            <Image src={"/character/user.png"} alt={"Profile"} />
          </Link>
        </footer>
    )
}