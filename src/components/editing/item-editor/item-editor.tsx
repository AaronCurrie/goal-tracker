import { useEffect, useState } from 'react';
import styles from '../pill-editing/pill-editor.module.css'
import IconButton from "@/components/button/icon-button";
import Input from "@/components/form/input-components/input/input";
import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Activity, Category } from '@/lib/types/goals';
import { editItem } from '@/lib/db-calls/item/edit-item';
import { deleteItem } from '@/lib/db-calls/item/delete-item';
import DeleteModal from '@/components/delete-modal/delete-modal';

type Props = {
    item: { id: string, name: string };
    label: string;
    setGroupState: React.Dispatch<React.SetStateAction<any[]>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ItemEditor({item, label, setGroupState, setError}: Props) {
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState<{[key: string]: string}>({});

    const [edited, setEdited] = useState(false);
    const [itemState, setItemState] = useState<string>(item.name);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const handleDelete = async (id: string) => {
        setLoading(true);
        setError(null);
        let deletedItem: Category | Activity;
        try {
            deletedItem = await deleteItem({ label, id });
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            return;
        }
        setGroupState((prev) => prev.filter((item) => item.id !== id));
        setLoading(false);
    }

    const handleEdit = async (id: string) => {
        if (!edited) return;
        if(!itemState) {
            setValidation({ ...validation, itemState: "This field is required" });
            return;
        }
        setError(null);
        setLoading(true);
        let updatedItem: Category | Activity;
        try {
            updatedItem = await editItem({ label, itemUpdate: itemState, id });
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            return;
        }
        setGroupState((prev) => prev.map((i) => i.id === id ? { ...i, name: updatedItem.name } : i));
        setEdited(false);
        setLoading(false);
    }

    useEffect(() => {
        if(itemState) {
            setValidation({ ...validation, itemState: "" });
        }
        setEdited(itemState !== item.name);
    }, [itemState])

    return (
        <div className={styles.row} key={item.id}>
            {loading ? <p>Loading...</p> : <Input value={itemState} label={item.name} setState={setItemState} error={validation.itemState} />}
            <IconButton icon={faFloppyDisk} disabled={!edited} button={{ alt: "Edit", style: "blue" }} onClick={() => handleEdit(item.id)} cornerButton={false} />
            <IconButton icon={faTrashCan} button={{ alt: "Edit", style: "red" }} onClick={() => setConfirmDelete(true)} cornerButton={false} />
            {confirmDelete && <DeleteModal label={label} message={`This will permanently delete the ${label} and all associated data. It cannot be undone.`} setConfirm={setConfirmDelete} deleteAction={() => handleDelete(item.id)} />}
        </div>
    );
}