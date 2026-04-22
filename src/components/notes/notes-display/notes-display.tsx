import { GoalNote } from "@/lib/types/goals";
import { useState } from "react";
import styles from "../notes.module.css";
import NoteEditor from "../note-editor/note-editor";
import AddNewNote from "../add-new-note/add-new-note";
import ErrorModal from "@/components/error/error-modal/error-modal";
import Note from "../note/note";

type Props = {
    notes: GoalNote[];
    goalId: string;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteDisplay({ notes, goalId, setNoteState }: Props) { 
    const [error, setError] = useState<string | null>(null);
    const [editNote, setEditNote] = useState<GoalNote | null>(null);

    return (
        <div className={styles.notesContainer}>
            <span className={styles.metaLabel}>Notes</span>
            <AddNewNote goalId={goalId} setNoteState={setNoteState} setError={setError} />
            {notes.map((note, index) => {
                return <Note key={index} note={note} setEditNote={setEditNote} />
            })}
            {editNote && <NoteEditor editingNote={editNote} setEditNote={setEditNote} setError={setError} setNoteState={setNoteState} />}
            {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
        </div>
    );
}