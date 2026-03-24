import { faCircleArrowLeft, faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import stlyes from "./page-header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import IconButton from "../button/icon-button";
import Pill from "../pill/pill";

type Props = {
    title: string;
    returnUrl: string;
    editing: boolean;
    setEditing?: (editing: boolean) => void;
    goalState?: any;
}

export default function PageHeader({ title, returnUrl, editing, setEditing, goalState }: Props) {
    return (
        <div className={`${stlyes.container} ${goalState?.is_completed ? stlyes.complete : ""}`}>
            <div className={`${stlyes.header}`} >
                {(editing && setEditing) ? <IconButton size={'2x'} icon={faCircleArrowLeft} button={{ alt: "Edit", style: "default" }} onClick={() => setEditing(!editing)} cornerButton={false} /> : <Link href={returnUrl}><FontAwesomeIcon size='2x' icon={faCircleArrowLeft} /></Link>}
                <h1 className={stlyes.title}>{title}</h1>
                {(setEditing && !editing) ? <IconButton size={'2x'} icon={editing? faCircleXmark : faPenToSquare} button={{ alt: "Edit", style: "default" }} onClick={() => setEditing(!editing)} cornerButton={false} /> : <span className={stlyes.spacer}></span>}
            </div>

            {!editing && goalState && (
                <div className={`${stlyes.topRow}`}>
                    <Pill item={goalState.is_completed ? {id: "completed", name:"Completed"} : {id: "incomplete", name:"Incomplete"}} colour={goalState.is_completed ? "green" : "default"}/>
                    <Pill item={goalState.category} colour={goalState.is_completed ? "green" : "default"} />
                    <Pill item={goalState.activity} colour={goalState.is_completed ? "green" : "default"} />
                </div>
            )}
            {goalState?.is_completed && <div className={stlyes.completeDate}><span>Completed on</span><span className={stlyes.metaValue}>{new Date(goalState.completed_at!).toLocaleString()}</span></div>}
        </div>
    )
}