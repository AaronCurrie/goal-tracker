import Model from "@/components/model/model";
import { Overlay } from "@/components/utility-comps/overlay";

type Props = {
    error: string;
    closeModal: () => void;
}

export default function ErrorModal({ error, closeModal }: Props) {
    return (
            <Model style='error' onClose={closeModal}>
                <div style={{ padding: "1rem" }}>
                    <h2 style={{ color: "red" }}>Something went wrong!</h2>
                    <p>{error}</p>
                </div>
            </Model>
    )
}