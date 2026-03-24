"use client";

import styles from "./add-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AddButton({ query }: { query: string }) {

  return (
      <Link href={`/goals/new/?${query}`} className={styles.add}>
        <FontAwesomeIcon size={'2x'} icon={faPlus} />
      </Link>
  );
}