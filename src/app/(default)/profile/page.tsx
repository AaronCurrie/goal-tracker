import Image from "@/components/image/image";
import styles from "../../../components/button/button.module.css";
import Link from "next/link";

export default function Profile() {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1>Profile</h1>
            <Image src={"/character/mountain-happy.png"} alt={"Profile Image"} />
            <p>Welcome to your life side quest portfolio!!</p>
            <Link href={"/info/setting-goals"}>Learn more about setting goals</Link>
            <form action="/auth/signout" method="post">
                <button className={`${styles.button} ${styles.edit}`} type="submit">Sign out</button>
            </form>
        </div>
    )
}