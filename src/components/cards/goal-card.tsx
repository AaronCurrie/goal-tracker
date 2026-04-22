import { useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./card.module.css";
import { changeGoalStatus } from "@/lib/db-calls/goals/change-status";
import { Goal } from "@/lib/types/goals";
import Pill from "../pill/pill";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ErrorModal from "../error/error-modal/error-modal";
import CompleteAnimation from "../animation/complete-animation/complete";
import { Overlay } from "../utility-comps/overlay";
import LoadingSpinner from "../loading/loading-spinner";

interface GoalCardProps {
    goalData: Goal;
    setGoalState: React.Dispatch<React.SetStateAction<Goal[]>>;
    grid: boolean;
}

export default function GoalCard({ goalData, setGoalState, grid }: GoalCardProps) {
    const [status, setStatus] = useState<string>(goalData.status);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    
    const handleComplete = async () => {
        setLoading(true);
        setError(null);
        try {
            await changeGoalStatus(goalData.id, "complete");
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            return;
        }
        setGoalState((prev) =>
            prev.map((g) =>
            g.id === goalData.id ? { ...g, status: g.status === "completed" ? "active" : "completed" } : g
            )
        );
        setLoading(false);
        setShowAnimation(true);
    }

    useEffect(() => {
        setStatus(goalData.status);
    }, [goalData.status])

    return (
        <div id={goalData.id} className={`${styles.card} ${status === "completed" ? styles.green : status === "failed" ? styles.red : ""}`} >
                <Link href={`/goals/details/${goalData.id}`} className={`${styles.content}`}>
                    <h3 className={grid ? styles.fontSmall : styles.fontLarge}>
                        {goalData.title}
                    </h3>
                    {!grid && (
                        <div className={styles.pills}>
                            <Pill colour={status === "completed" ? "green" : status === "failed" ? "red" : "default"} item={goalData.category} />
                            <Pill colour={status === "completed" ? "green" : status === "failed" ? "red" : "default"} item={goalData.activity} />
                        </div>
                    )}
                    {/* <p>{goalData.goal_period} {translateDateToDisplay(goalData.goal_period, goalData.period_start)}</p> */}
                </Link>
                {status !== "completed" && status !== "failed" && <div className={styles.complete}>
                    {grid? (
                        <button className={`${styles.button} ${styles.green}`} onClick={handleComplete} disabled={loading}>
                            {loading ? "..." : <FontAwesomeIcon size='1x' icon={faCheck} />}
                        </button>
                    ) : <Button button={{text: loading? "..." : "Complete", style: "complete"}} onClick={handleComplete} disabled={loading}/>}
                </div>}
                {showAnimation && <CompleteAnimation goal={goalData} onClose={() => setShowAnimation(false)} />}
                {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
                {loading && <Overlay><LoadingSpinner/></Overlay>}
        </div>
    )
}