'use client'
import { Activity, Category } from "@/lib/types/goals";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import { addGoal } from "@/lib/db-calls/goals/add-goal";
import { validateTitle } from "@/lib/utils/validators/validate-title";
import style from "../forms.module.css";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/button/button";
import ErrorModal from "@/components/error/error-modal/error-modal";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../input-components/scroll-selector/scroll-selector";
import PeriodSelectorInput from "../input-components/period-selector/period-selector";
import { Overlay } from "@/components/utility-comps/overlay";
import LoadingSpinner from "@/components/loading/loading-spinner";

type Props = {
    datesMeta: { date: string, period: string },
}

export default function AddGoalForm({datesMeta} : Props) {
    const router = useRouter();
    const { categories, activities } = useGoalsData();
    const titleRef = useRef<HTMLInputElement | null>(null);
    
    const [categoryState, setCategoryState] = useState<Category[]>(categories);
    const [activityState, setActivityState] = useState<Activity[]>(activities);
    
    const [periodType, setPeriodType] = useState<"yearly" | "quarterly" | "monthly">(datesMeta.period as "yearly" | "quarterly" | "monthly");
    const [title, setTitle] = useState<string>("");
    const [periodStart, setPeriodStart] = useState<string>(`${datesMeta.date}`);
    const [category, setCategory] = useState<string | null>(null);
    const [activity, setActivity] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("");

    const [validation, setValidation] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const titleError = await validateTitle({ title, titleRef });
        if (titleError) {
            setValidation((prev) => ({ ...prev, title: titleError }));
            return;
        }
        setLoading(true);
        try {
            await addGoal({ 
                title, 
                description: description || null, 
                category_id: category || undefined, 
                activity_id: activity || undefined, 
                goal_period: periodType, 
                period_start: periodStart 
            });
        } catch (err: any) {
            setError(err.message || "An error occurred while adding the goal.");
            setLoading(false);
            return;
        } 
        setLoading(false);
        router.push(`/goals/${datesMeta.period.toLowerCase()}/${datesMeta.date}`);
    }

    useEffect(() => {
        if (title) {
            setValidation((prev) => {
                const { title, ...rest } = prev;
                return rest;
            });
        }
    }, [title])

    return (
        <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
            <Input ref={titleRef} label="Title" setState={setTitle} value={title} error={validation.title} />
            <PeriodSelectorInput period={periodType} setPeriodType={setPeriodType} />
            <ScrollSelector typeValue={periodType} originalPeriodStart={datesMeta.date} periodStart={periodStart} setPeriodStart={setPeriodStart} />
            <PillSelector label="Category" group={categoryState} selected={category} setGroupState={setCategoryState} setState={setCategory}/>
            <PillSelector label="Activity" group={activityState} selected={activity} setGroupState={setActivityState} setState={setActivity}/>
            <textarea
                id="goal-desc"
                className={style.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does success look like?"
                rows={4}
            />
            <Button onClick={()=>{}} button={{ text: loading? '...' : 'Save', style: "edit" }} disabled={loading} type='submit'/>
            {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
        </form>
        {loading && <Overlay><LoadingSpinner /></Overlay>}
        </div>
    )
}