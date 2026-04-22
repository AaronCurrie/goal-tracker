import Image from '@/components/image/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1>Not Found</h1>
            <Image src={"/character/not-found.png"} alt={"Not Found"} />
            <Link href={"/"}>Return Home</Link>
        </div>
  )
}