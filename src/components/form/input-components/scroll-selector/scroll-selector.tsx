import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import style from "./scroll-selector.module.css";
import { useEffect, useState } from "react";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";

type Props = {
    typeValue: "yearly" | "quarterly" | "monthly";
    setPeriodStart: React.Dispatch<React.SetStateAction<string>>;
    periodStart: string;
    originalPeriodStart: string;
}

export default function ScrollSelector({ originalPeriodStart, typeValue, setPeriodStart, periodStart}: Props) {
    const [dateDisplay, setDateDisplay] = useState<string>(translateDateToDisplay(typeValue, periodStart));

    const arrowClickHandler = (direction: number) => {
        if(typeValue === "yearly") {
            const newDate = periodStart.split("-")
            newDate[0] = String(Number(newDate[0]) + direction);
            const finalDate = newDate.join("-");
            setPeriodStart(finalDate);
            setDateDisplay(translateDateToDisplay(typeValue, finalDate));
        }
        if(typeValue === "monthly") {
            const newDate = periodStart.split("-");
            const monthIndex = Number(newDate[1]) - 1;
            const d = new Date(Number(newDate[0]), monthIndex, 1);
            d.setMonth(d.getMonth() + direction);

            const newYear = d.getFullYear();
            const newMonth = (d.getMonth() + 1).toString().padStart(2, '0');

            const finalDate = `${newYear}-${newMonth}-01`;
            setPeriodStart(finalDate);
            setDateDisplay(translateDateToDisplay(typeValue, finalDate));
        }
        if(typeValue === "quarterly") {
            const newDate = periodStart.split("-");
            const currentQuarter = Math.floor((Number(newDate[1]) - 1) / 3) + 1;
            const d = new Date(Number(newDate[0]), (currentQuarter - 1) * 3, 1);
            d.setMonth(d.getMonth() + direction * 3);

            const newYear = d.getFullYear();
            const newQuarter = Math.floor(d.getMonth() / 3) + 1;

            const finalDate = `${newYear}-${(newQuarter - 1) * 3 + 1}-01`;
            setPeriodStart(finalDate);
            setDateDisplay(translateDateToDisplay(typeValue, finalDate));
        }
    }

    const dateReset = () => {
        if(typeValue === "yearly") {
            setDateDisplay(translateDateToDisplay(typeValue, `${originalPeriodStart}`));
            setPeriodStart(`${originalPeriodStart.split("-")[0]}-01-01`);
        }
        if(typeValue === "monthly") {
            setDateDisplay(translateDateToDisplay(typeValue, `${originalPeriodStart}`));
            setPeriodStart(`${originalPeriodStart}`);
        }
        if(typeValue === "quarterly") {
            const newDate = `${originalPeriodStart.split('-')[0]}-${String((Math.floor((Number(originalPeriodStart.split('-')[1]) - 1) / 3) * 3) + 1).padStart(2, '0')}-01`;
            setDateDisplay(translateDateToDisplay(typeValue, newDate));
            setPeriodStart(newDate);
        }
    }

    useEffect(() => {
        dateReset();
    }, [typeValue]);

    return (
        <div className={`${style.dateSelector}`}>
            <div className={style.scrollSelector}>
                <button type='button' className={style.chevron} onClick={()=> arrowClickHandler(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <span className={style.dateDisplay} >{`${dateDisplay}`}</span>
                <button type="button" className={style.chevron} onClick={()=> arrowClickHandler(1)}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div>
    )
}