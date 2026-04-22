import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./scrollable-selector.module.css";
import Link from "next/link";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
    year: number;
    period: "yearly" | "quarterly" | "monthly";
    date?: string;
}

export default function ScrollableLinks({ year, period, date }: Props) {
    const types = ["yearly", "quarterly", "monthly"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const linkBuilder = (direction: number, scrollType: "yearly" | "quarterly" | "monthly" ): string => {
        if(scrollType === "yearly") {
            return `/goals/${scrollType}/${year + direction}-${date}-01`;
        }
        if (scrollType === "quarterly") {
            const currentMonth = Number(date);
            const nextMonthRaw = currentMonth + direction * 3;
            const yearOffset = Math.floor((nextMonthRaw - 1) / 12);
            const normalizedMonth = ((nextMonthRaw - 1) % 12 + 12) % 12 + 1;
            const finalYear = Number(year) + yearOffset;
            const finalMonth = String(normalizedMonth).padStart(2, "0");
            return `/goals/${scrollType}/${finalYear}-${finalMonth}-01`;
        }

        if (scrollType === "monthly") {
            const d = new Date(Number(year), Number(date) - 1, 1);
            d.setMonth(d.getMonth() + direction);
            const newYear = d.getFullYear();
            const newMonth = String(d.getMonth() + 1).padStart(2, "0");
            return `/goals/${scrollType}/${newYear}-${newMonth}-01`;
        }
        return "/";
    }

    const dateDisplay = () =>{
        if( period === "quarterly") {
            const month = Number(date?.split("-")[0]);
            const quarter = Math.ceil(month / 3);
            return `Q${quarter}`;
        }
        if( period === "monthly") {
            const month = Number(date?.split("-")[0]);
            return months[month - 1];
        }
        return "";
    }

    return (
            <div className={`${style.dateSelector}`}>
                <div className={style.scrollSelector}>
                    <Link className={style.chevron} href={linkBuilder(-1, period)}><FontAwesomeIcon icon={faChevronLeft} /></Link>
                        <span className={style.dateDisplay} >{`${dateDisplay()} ${year}`}</span>
                    <Link className={style.chevron} href={linkBuilder(1, period)}><FontAwesomeIcon icon={faChevronRight} /></Link>
                </div>
            </div>
    )
}