import { GoalNote } from "@/lib/types/goals";
import styles from "../notes.module.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/button/icon-button";

type Props = {
    note: GoalNote;
    setEditNote: (note: GoalNote | null) => void;
}

export default function Note({ note, setEditNote }: Props) {
    return (
        <div className={styles.noteContent}>
            <span className={styles.metaLabel}>{new Date(note.created_at).toLocaleString('en-GB', 
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })}</span>
            <div className={styles.noteRow}>
                <p>{note.content}</p>
            </div>
            <IconButton icon={faPenToSquare} button={{ alt: "Expand", style: "default" }} onClick={() => setEditNote(note)} cornerButton={true} />
        </div>
    );
}