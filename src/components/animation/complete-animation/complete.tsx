import { useEffect, useRef } from "react";
import styles from "./complete.module.css";
import confetti from "canvas-confetti";
import { Overlay } from "@/components/utility-comps/overlay";
import { Goal } from "@/lib/types/goals";
import Pill from "@/components/pill/pill";

export default function CompleteAnimation({goal, onClose }: { goal: Goal | null, onClose: () => void }) {
    const canvasRef1 = useRef<HTMLCanvasElement | any>(undefined);
    const canvasRef2 = useRef<HTMLCanvasElement | any>(undefined);

    useEffect(() => {
        if (!canvasRef1.current && !canvasRef2.current) return;

        const confettiLeft = confetti.create(canvasRef1.current, {
        resize: true,
        useWorker: true,
        });

        const confettiRight = confetti.create(canvasRef2.current, {
        resize: true,
        useWorker: true,
        });


        confettiLeft({
            origin : { x: 0.5, y: 0.6 },
            spread: 60,
            angle: 120,
            particleCount: 120
        });

        confettiRight({
            origin : { x: 0.5, y: 0.6 },
            spread: 60,
            angle: 60,
            particleCount: 120
        });
    }, []);

    return (
        <Overlay onClick={onClose}>
            <div className={styles.animationContainer} onClick={e => e.stopPropagation()}>
                <img src={"/character/mountain-celebrate-v2.png"} alt="Complete Animation" className={styles.image} />
                <div className={styles.completeCard}>
                    <h2 className={styles.title}>Goal Completed!</h2>
                    {goal && 
                    (<div className={styles.content}>
                        <div>
                            <Pill item={goal.category} colour={"green"} />
                            <Pill item={goal.activity} colour={"green"} />
                        </div>
                        <h3 className={styles.subtitle}>{goal.title}</h3>
                        {goal.completed_at && <p>Completed on: {new Date(goal.completed_at).toLocaleDateString()}</p>}
                    </div>)}
                    <h3>Nice work! Keep it up!</h3>
                </div>
            </div>
            <canvas
                ref={canvasRef1}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 9998,
                }}
            />
            <canvas
                ref={canvasRef2}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 9998,
                }}
            />
        </Overlay>
    )
}