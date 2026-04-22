'use client'
import { Activity, Category, Goal } from "@/lib/types/goals";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import style from "../forms.module.css";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/button/button";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../input-components/scroll-selector/scroll-selector";
import PeriodSelectorInput from "../input-components/period-selector/period-selector";
import ErrorModal from "@/components/error/error-modal/error-modal";
import { validateTitle } from "@/lib/utils/validators/validate-title";
import { editGoal } from "@/lib/db-calls/goals/edit-goal";
import { deleteGoal } from "@/lib/db-calls/goals/delete-goal";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/delete-modal/delete-modal";
import { Overlay } from "@/components/utility-comps/overlay";
import LoadingSpinner from "@/components/loading/loading-spinner";


type Props = {
    goal: Goal;
    setGoal: React.Dispatch<React.SetStateAction<Goal>>;
    cancel: () => void;
}

export default function EditGoalForm({goal, cancel, setGoal} : Props) {
    const router = useRouter();
    const { categories, activities } = useGoalsData();
    const titleRef = useRef<HTMLInputElement | null>(null);

    const period = goal.goal_period.charAt(0).toUpperCase() + goal.goal_period.slice(1);
    const [categoryState, setCategoryState] = useState<Category[]>(categories);
    const [activityState, setActivityState] = useState<Activity[]>(activities);

    const [periodType, setPeriodType] = useState<"yearly" | "quarterly" | "monthly">(period.toLowerCase() as "yearly" | "quarterly" | "monthly");
    const [title, setTitle] = useState<string>(goal.title);
    const [periodStart, setPeriodStart] = useState<string>(goal.period_start);
    const [category, setCategory] = useState<string | null>(goal.category?.id ?? null);
    const [activity, setActivity] = useState<string | null>(goal.activity?.id ?? null);
    const [description, setDescription] = useState<string>(goal.description ?? "");

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
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
        let update;
        setLoading(true);
        try {
            update = await editGoal({ 
                id: goal.id,
                title, 
                description: description || null, 
                category_id: category || undefined, 
                activity_id: activity || undefined, 
                goal_period: periodType, 
                period_start: periodStart
            });
        } catch (err: any) {
            setError(err.message || "An error occurred while editing the goal.");
            setLoading(false);
            return;
        } 
        const updatedCategory = categoryState.find((c) => c.id === update.goal.category_id) ?? undefined;
        const updatedActivity = activityState.find((a) => a.id === update.goal.activity_id) ?? undefined;
        const updatedGoal = {
            id: update.goal.id,
            title : update.goal.title,
            goal_period: update.goal.goal_period,
            period_start: update.goal.period_start,
            category: updatedCategory ? updatedCategory : null,
            activity: updatedActivity ? updatedActivity : null,
            description: update.goal.description,
            status: update.goal.status,
            completed_at: update.goal.completed_at,
        } as Goal;
        setGoal(updatedGoal);
        setLoading(false);
        cancel();
    }

    async function onDelete() {
        setLoading(true);
        setError(null);
        try {
          await deleteGoal(goal.id);
        } catch (error) {
          setLoading(false);  
          setError((error as Error).message);
          return;
        }
        setLoading(false); 
        router.push(`/goals/${goal.goal_period}/${goal.period_start}`);
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
                <Button onClick={() => {}} button={{ text: loading? '...' : 'Save', style: "edit" }} disabled={loading} type='submit'/>
            </form>
            <Button onClick={() => setConfirmDelete(true)} button={{ text: 'Delete', style: "delete" }} disabled={loading} />
            {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
            {confirmDelete && <DeleteModal label="goal" message="This will permanently delete the goal and all associated notes, It cannot be undone." setConfirm={setConfirmDelete} deleteAction={onDelete} />}
            {loading && <Overlay><LoadingSpinner /></Overlay>}
        </div>
    )
}