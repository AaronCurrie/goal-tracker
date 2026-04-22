import Model from "@/components/model/model";
import { Overlay } from "@/components/utility-comps/overlay";
import Button from "../button/button";

type Props = {
    message: string;
    label: string;
    setConfirm: (value: boolean) => void;
    deleteAction: () => void;
}

export default function DeleteModal({ label, message, setConfirm, deleteAction }: Props) {
    return (
            <Model style='error' onClose={() => setConfirm(false)} overlayClose={false}>
                <div style={{ padding: "1rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <h2 style={{ color: "red" }}>Are you sure!</h2>
                    <p>{`Are you sure you want to delete this ${label}?`}</p>
                    {message && <p style={{ color: "red" }}>{message}</p>}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                        <Button button={{text: 'Confirm', style: 'delete'}} onClick={deleteAction}/>
                        <Button button={{text: 'Cancel', style: 'edit'}} onClick={() => setConfirm(false)}/>
                    </div>
                </div>
            </Model>
    )
}