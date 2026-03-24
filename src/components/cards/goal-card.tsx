import { useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./card.module.css";
import { completeGoal } from "@/lib/db-calls/goals/complete-goal";
import { Goal } from "@/lib/types/goals";
import Pill from "../pill/pill";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface GoalCardProps {
    goalData: Goal;
    setGoalState: React.Dispatch<React.SetStateAction<Goal[]>>;
    setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    grid: boolean;
}

export default function GoalCard({ goalData, setGoalState, setShowAnimation, grid }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.is_completed);

    useEffect(() => {
        setCompleted(goalData.is_completed);
    }, [goalData.is_completed])

    const handleComplete = async () => {
                try {
                    await completeGoal(goalData.id, "complete");
                    setGoalState((prev) =>
                        prev.map((g) =>
                        g.id === goalData.id ? { ...g, is_completed: !g.is_completed } : g
                        )
                    );
                } finally {
                    setShowAnimation(true);
            }
    }

    return (
        <div id={goalData.id} className={`${styles.card} ${completed ? styles.green : ""}`} >
                <Link href={`/goals/details/${goalData.id}`} className={`${styles.content}`}>
                    <h3 className={grid ? styles.fontSmall : styles.fontLarge}>
                        {goalData.title}
                    </h3>
                    {!grid && (
                        <div className={styles.pills}>
                            <Pill colour={completed ? "green" : "default"} item={goalData.category} />
                            <Pill colour={completed ? "green" : "default"} item={goalData.activity} />
                        </div>
                    )}

                </Link>
                {!completed && <div className={styles.complete}>
                    {grid? (
                        <button className={`${styles.button} ${styles.green}`} onClick={handleComplete}>
                            <FontAwesomeIcon size='1x' icon={faCheck} />
                        </button>
                    ) : <Button button={{text: "Complete", style: "complete"}} onClick={handleComplete} />}
                </div>}
        </div>
    )
}