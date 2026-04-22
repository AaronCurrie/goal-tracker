import styles from "./pill.module.css";
import { Category, Activity } from "@/lib/types/goals";

export default function Pill({item, colour = 'default'}: {item: Category | Activity | null | any, colour?: string}) {
    if(!item) return null;
    return (
        <div className={`${styles.pill} ${styles[colour]}`}>
            <p>{item?.name}</p>
        </div>
    )
}