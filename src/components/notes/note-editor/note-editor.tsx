import Button from "@/components/button/button";
import Model from "@/components/model/model";
import styles from "../notes.module.css";
import { GoalNote } from "@/lib/types/goals";
import { useEffect, useState } from "react";
import { editNote } from "@/lib/db-calls/notes/edit-note";
import { deleteNote } from "@/lib/db-calls/notes/delete-note";
import DeleteModal from "@/components/delete-modal/delete-modal";

type Props = {
    editingNote: GoalNote;
    setEditNote: (note: GoalNote | null) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteEditor({ editingNote, setEditNote, setError, setNoteState }: Props) {
    const [validation, setValidation] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const handleEditNote = async (id: string, content: string) => {
        if(content.trim() === "") {
            setValidation({ ...validation, editingNote: "This field is required" });
            return;
        }
        setLoading(true);
        setError(null);
        let updatedNote: GoalNote;
        try {
            updatedNote = await editNote({ id, content });
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            return;
        }
        setNoteState((prev) => prev.map((note) => note.id === id ? updatedNote : note));
        setEditNote(null);
        setLoading(false);
    }

    const handleDelete = async (id: string) => {
            setError(null);
            setLoading(true);
            let deletedNoteId: string;
            try {
                deletedNoteId = await deleteNote({ id });
            } catch (error:any) {
                setLoading(false);
                setError(error.message);
                return;
            }
            setNoteState((prev) => prev.filter((note) => note.id !== id));
            setEditNote(null);
            setLoading(false);
        }

    useEffect(() => {
        if(editingNote?.content) {
            setValidation({ ...validation, editingNote: "" });
        }
    }, [editingNote?.content])

    return (
        <>            
        <Model onClose={() => setEditNote(null)}>
            <div className={`${styles.editNoteContainer}`} onClick={(e) => e.stopPropagation()}>                       
                <textarea className={`${styles.textarea} ${validation.editingNote ? styles.error : ""}`} value={editingNote.content} onChange={(e) => setEditNote({ ...editingNote, content: e.target.value })} />
                    {validation.editingNote && <p className={styles.error}>{validation.editingNote}</p>}
                <Button button={{ text: loading ? "..." : "Update", style: "edit" }} onClick={() => handleEditNote(editingNote.id, editingNote.content)} disabled={loading} />
                <Button button={{ text: loading ? "..." : "Delete Note", style: "delete" }} onClick={() => setConfirmDelete(true)} disabled={loading} />
            </div>
        </Model>
        {confirmDelete && <DeleteModal label="note" message="This will permanently delete the note, It cannot be undone." setConfirm={setConfirmDelete} deleteAction={() => handleDelete(editingNote.id)} />}
        </>
    )
}