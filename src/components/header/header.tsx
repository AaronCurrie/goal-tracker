import styles from "./header.module.css";
import ScrollableLinks from "./scrollable-selector/scrollable-selector";
import PeriodSelector from "./period-selector/period-selector";

export default function Header({ year, period }: { year: string, period: string }) {

    const yearNumber = year.split("-")[0];
    const date = year.split("-")[1];

    return (
        <header className={styles.header}>
            <div className={styles.dates}>
                    <PeriodSelector period={period}/>
                    <ScrollableLinks year={Number(yearNumber)} date={date} period={period as "yearly" | "quarterly" | "monthly"}/>
            </div>
        </header>
    );
}