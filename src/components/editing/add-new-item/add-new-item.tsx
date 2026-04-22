import Input from "@/components/form/input-components/input/input";
import styles from "../pill-editing/pill-editor.module.css";
import IconButton from "@/components/button/icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Activity, Category } from "@/lib/types/goals";
import { addItem } from "@/lib/db-calls/item/add-item";


type Props = {
    label: string;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setGroupState: React.Dispatch<React.SetStateAction<Category[] | Activity[]>>;
}

export default function AddNewItem({ label, setError, setGroupState }: Props) {
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState<{[ key: string ]: string}>({});

    const [newItem, setNewItem] = useState<string>("");

    const handleAdd = async () => {
        if(!newItem) {
            setValidation({ ...validation, newItem: "This field is required" });
            return;
        }
        setLoading(true);
        let item: Category | Activity;
        try {
            item = await addItem({ label, newItem });

        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            return;
        }
        setNewItem("");
        setGroupState((prev) => [item, ...prev]);
        setLoading(false);
    }

    useEffect(() => {
        if(newItem) {
            setValidation({ ...validation, newItem: "" });
        }
    }, [newItem])

    return (
        <div className={styles.row}>
            {loading ? <p>Loading...</p> : <Input label={`Add ${label}`} value={newItem} setState={setNewItem} error={validation.newItem} />}
            <IconButton icon={faPlus} button={{ alt: "Add", style: "blue" }} onClick={handleAdd} cornerButton={false} />
        </div>
    )
}