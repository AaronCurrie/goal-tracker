import styles from "./button.module.css"

type Props = {
    button: {
        text: string;
        style: "default" | "black" | "red" | "blue" | "white" | "blueCircle" | "blackCircle" | "redCircle" | "complete" | "edit" | "delete" | "undo";
    }
    disabled?: boolean;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({disabled = false, button, onClick, type = "button"}: Props) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`${styles.button} ${styles[button.style]}`}
            onClick={onClick}
            >
            {button.text}
        </button>
    )
}