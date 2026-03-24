import Image from "@/components/image/image";
import Link from "next/link";

export default function More() {
    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1>More</h1>
            <Image src={"/character/coming-soon.png"} alt={"Coming Soon"} />
            <Link href={"/info/setting-goals"}>Learn more about setting goals</Link>
        </div>
    )
}