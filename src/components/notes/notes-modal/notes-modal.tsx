import Model from "@/components/model/model";
import { Overlay } from "@/components/utility-comps/overlay";
import { GoalNote } from "@/lib/types/goals";
import styles from "../notes.module.css";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/button/icon-button";
import Input from "@/components/form/input-components/input/input";

type Props = {
    notes: GoalNote[];
    closeModal: () => void;
    newNote: string;
    setNewNote: (note: string) => void;
    handleAddNote: () => void;
    validation: {[ key: string ]: string;}
    handleDelete: (id: string) => void;
}

export default function NotesModal({notes, closeModal, newNote, setNewNote, handleAddNote, validation, handleDelete}: Props) {

    return (
            <Model onClose={closeModal}>
                <div className={styles.notes} onClick={(e) => e.stopPropagation()}>
                    <span className={styles.metaLabel}>Notes</span>
                    <div className={styles.row}>
                        <Input label={`Add note`} value={newNote} setState={setNewNote} error={validation?.newNote} />
                        <IconButton icon={faPlus} button={{ alt: "Add", style: "blueCircle" }} onClick={handleAddNote} cornerButton={false} />
                    </div>
                    {notes.map((note, index) => {
                            return (
                                <div key={index} className={styles.row}>
                                    <div className={styles.noteContent}>
                                        <span className={styles.metaLabel}>{new Date(note.created_at).toLocaleString()}</span>
                                        <p>{note.content}</p>
                                    </div>
                                    <IconButton icon={faTrashCan} button={{ alt: "Edit", style: "red" }} onClick={() => handleDelete(note.id)} cornerButton={false} />
                                </div>
                            )
                    })}
                </div>
            </Model>
    )
}