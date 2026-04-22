import styles from "../notes.module.css";
import Input from "@/components/form/input-components/input/input";
import IconButton from "@/components/button/icon-button";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GoalNote } from "@/lib/types/goals";
import { addNote } from "@/lib/db-calls/notes/add-note";

type Props = {
    goalId: string;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AddNewNote({ goalId, setNoteState, setError }: Props) {
    const [newNote, setNewNote] = useState("");
    const [validation, setValidation] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);

    const handleAddNote = async () => {
        if (newNote.trim() === "") {
            setValidation({ ...validation, newNote: "This field is required" });
            return;
        }
        setLoading(true)
        setError(null);
        let note: GoalNote;
        try {
            note = await addNote({ goalId, content: newNote });
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            return;

        }
        setNoteState((prev) => [note, ...prev]);
        setNewNote("");
        setLoading(false);
    }

    useEffect(() => {
        if(newNote) {
            setValidation({ ...validation, newNote: "" });
        }
    }, [newNote])

    return (
        <div className={styles.row}>
            {loading ? <p>Loading...</p> : <Input label={`Add note`} value={newNote} setState={setNewNote} error={validation.newNote} />}
            <IconButton icon={faPlus} button={{ alt: "Add", style: "blueCircle" }} onClick={handleAddNote} cornerButton={false} />
        </div>
    )
}