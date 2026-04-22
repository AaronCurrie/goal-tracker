import PageHeader from "@/components/page-header/page-header";
import styles from "./more.module.css";
import Link from "next/link";

export default function More() {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <Link className={styles.linkCard} href={"/info/setting-goals"}><p>Learn more about <span className={styles.highlight}>setting goals.</span></p></Link>
            <Link className={styles.linkCard} href={"/info/use-the-app"}><p>How to <span className={styles.highlight}>use this app.</span></p></Link>
            <Link className={styles.linkCard} href={"/info/faq"}><p>Frequently Asked <span className={styles.highlight}>Questions</span></p></Link>
            <Link className={styles.linkCard} href={"/info/tips"}><p><span className={styles.highlight}>Tips</span> to get the most out of setting goals.</p></Link>
            <Link className={styles.linkCard} href={"/info/suggest"}><p>Suggest a <span className={styles.highlight}>feature</span> or improvement.</p></Link>
            <Link className={styles.linkCard} href={"/info/bugs"}><p>Report a <span className={styles.highlight}>bug</span> or issue.</p></Link>
        </div>
    )
}