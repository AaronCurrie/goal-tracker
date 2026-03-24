import styles from "./goal-details.module.css";
import Button from "../button/button";
import { Goal, GoalNote } from "@/lib/types/goals";
import Pill from "../pill/pill";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";
import NoteDisplay from "../notes/notes-display/notes-display";

type Props = {
  goalState: Goal;
  onComplete: () => void;
  onDelete: () => void;
  notes: GoalNote[];
  setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
};

export default function GoalDetails({ goalState, onComplete, onDelete, notes, setNoteState }: Props) {
  const date = translateDateToDisplay(goalState.goal_period, goalState.period_start);
  
  return (
      <div className={`${styles.panel}`}>
        <div className={styles.content}>
        <div className={styles.metaGrid}>
            <div className={styles.metaRow}><span className={styles.metaLabel}>Period:</span><span className={styles.metaValue}>{goalState.goal_period.toUpperCase()}</span></div>
            <div className={styles.metaRow}><span className={styles.metaLabel}>Date:</span><span className={styles.metaValue}>{date}</span></div>
        </div>
        {goalState.description && (
          <div className={styles.metaGrid}>
            <p>{goalState.description}</p>
          </div>
        )}
          <NoteDisplay notes={notes} setNoteState={setNoteState} goalId={goalState.id} />
          <div className={styles.buttons}>
            <Button
              button={
                goalState.is_completed
                  ? { text: "Undo Complete", style: "undo" }
                  : { text: "Complete", style: "complete" }
              }
              onClick={onComplete}
            />
            <Button button={{ text: "Delete", style: "delete" }} onClick={onDelete} />
          </div>
        </div>


      </div>
  );
}