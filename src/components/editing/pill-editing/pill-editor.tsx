import styles from "./pill-editor.module.css"
import Model from "@/components/model/model"
import { Overlay } from "@/components/utility-comps/overlay"
import { Activity, Category } from "@/lib/types/goals"
import { useState } from "react"
import ItemEditor from "../item-editor/item-editor"
import AddNewItem from "../add-new-item/add-new-item"
import ErrorModal from "@/components/error/error-modal/error-modal"

type PillEditingProps = {
    group: Category[] | Activity[],
    label: string,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    setGroupState: React.Dispatch<React.SetStateAction<Category[] | Activity[]>>
}

export default function PillEditor({ group, label, setEditing, setGroupState }: PillEditingProps) {
    const [error, setError] = useState<string | null>(null);

    return (
            <Model onClose={() => setEditing(false)}>
                <div className={styles.container}>
                    <AddNewItem label={label} setError={setError} setGroupState={setGroupState} />
                    {group.map((item) => {
                        return (
                            <ItemEditor key={item.id} item={item} label={label} setError={setError} setGroupState={setGroupState} />
                        )
                    })}
                </div>
                {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
            </Model>
    )
}