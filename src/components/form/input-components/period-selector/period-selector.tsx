import style from "./period-selector.module.css";

export default function PeriodSelectorInput({ period, setPeriodType }: { period: string, setPeriodType: (type: "yearly" | "quarterly" | "monthly") => void }) {
    const types = ["yearly", "quarterly", "monthly"];

    return (
            <div className={style.tabs}>
                {types.map((type) => (
                    <button type='button' key={type} className={`${style.tabItem} ${type === period ? style.active : ""}`} onClick={() => setPeriodType(type as "yearly" | "quarterly" | "monthly")}>
                        <span>{type.toUpperCase()}</span>
                    </button>
                ))}
            </div>
    )
}