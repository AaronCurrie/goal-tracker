"use client";

import styles from "./complete-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

export default function CompleteButton({ onComplete, active }: { onComplete: ({action}: {action: "complete" | "active" | "fail"}) => void; active: boolean }) {

  return (
      <button className={`${styles.add} ${active ? styles.default : styles.green}`} onClick={() => onComplete({ action: active ? "active" : "complete" })}>
        <FontAwesomeIcon size={'2x'} icon={active ? faRotateLeft : faCheck} />
      </button>
  );
}