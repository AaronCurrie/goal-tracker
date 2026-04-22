import styles from "./model.module.css"

import IconButton from "../button/icon-button";
import { Overlay } from "../utility-comps/overlay";

import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onClose: () => void;
    children?: React.ReactNode;
    style?: string
    overlayClose?: boolean;
}

export default function Model({ onClose, children, style, overlayClose = true }: Props) {

    return (
        <Overlay onClick={overlayClose ? onClose : undefined}>
            <div className={`${styles.modelContainer} ${styles[style || "default"]}`}>
                <IconButton
                    icon={faX}
                    button={{ alt: "Close", style: "default" }}
                    onClick={onClose}
                />
                {children}
            </div>
        </Overlay>
    )
}