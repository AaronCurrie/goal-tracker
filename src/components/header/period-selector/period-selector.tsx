import Link from "next/link";
import style from "./period-selector.module.css";

export default function PeriodSelector({ period }: { period: string }) {
    const types = ["yearly", "quarterly", "monthly"];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return (
            <div className={style.tabs}>
                {types.map((type) => (
                    <Link key={type} className={`${style.tabItem} ${type === period ? style.active : ""}`} href={`/goals/${type}/${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`}>
                        <span>{type.toUpperCase()}</span>
                    </Link>
                ))}
            </div>
    )
}