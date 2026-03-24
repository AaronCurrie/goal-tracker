'use client'
import { Activity, Category, Goal } from "@/lib/types/goals";
import style from "../forms.module.css";
import { useState } from "react";
import { useGoalsData } from "@/lib/contexts/goals-data-context";

import Button from "@/components/button/button";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../input-components/scroll-selector/scroll-selector";
import PeriodSelectorInput from "../input-components/period-selector/period-selector";


type Props = {
    goal: Goal;
    setGoal: React.Dispatch<React.SetStateAction<Goal>>;
    cancel: () => void;
}

export default function EditGoalForm({goal, cancel, setGoal} : Props) {
    const { categories, activities } = useGoalsData();

    const period = goal.goal_period.charAt(0).toUpperCase() + goal.goal_period.slice(1);
    const [categoryState, setCategoryState] = useState<Category[]>(categories);
    const [activityState, setActivityState] = useState<Activity[]>(activities);

    const [periodType, setPeriodType] = useState<"yearly" | "quarterly" | "monthly">(period.toLowerCase() as "yearly" | "quarterly" | "monthly");
    const [title, setTitle] = useState<string>(goal.title);
    const [periodStart, setPeriodStart] = useState<string>(goal.period_start);
    const [category, setCategory] = useState<string | null>(goal.category?.id ?? null);
    const [activity, setActivity] = useState<string | null>(goal.activity?.id ?? null);
    const [description, setDescription] = useState<string>(goal.description ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/goal/${goal.id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            title,
            goal_period: periodType.toLowerCase(),
            period_start: periodStart,
            category_id: category,
            activity_id: activity,
            description,
            }),
        });

        const body = await res.json().catch(() => ({}));

        if (!res.ok) {
            setLoading(false);
            setError(body?.error ?? "Failed to save");
            return;
        }
        const updatedCategory = categoryState.find((c) => c.id === category) ?? undefined;
        const updatedActivity = activityState.find((a) => a.id === activity) ?? undefined;
        const updatedGoal = {
            title : body.title,
            goal_period: body.goal_period,
            period_start: body.period_start,
            category: updatedCategory ? updatedCategory : null,
            activity: updatedActivity ? updatedActivity : null,
            description: body.description,
        } as Goal;
        setGoal(updatedGoal);
        setLoading(false);
        cancel();
    }
    console.log(periodStart, 'PERIODSTART');

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Input label="Title" setState={setTitle} value={title} />
            <PeriodSelectorInput period={periodType} setPeriodType={setPeriodType} />
            <ScrollSelector typeValue={periodType} originalPeriodStart={goal.period_start} periodStart={periodStart} setPeriodStart={setPeriodStart} />
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
            {loading? <p>Loading...</p> : <Button onClick={()=>{}} button={{ text: 'Save', style: "edit" }} />}
        </form>
    )
}