'use client';
import { Goal, GoalNote } from "@/lib/types/goals";
import { useState } from "react";
import { deleteGoal } from "@/lib/db-calls/goals/delete-goal";
import { completeGoal } from "@/lib/db-calls/goals/complete-goal";
import { useRouter } from "next/navigation";
import GoalDetails from "@/components/goal-details/goal-details";
import EditGoalForm from "@/components/form/edit-goal-form/edit-goal-form";
import PageHeader from "@/components/page-header/page-header";
import CompleteAnimation from "@/components/animation/complete-animation/complete";

export default function SingleGoalDisplay({goal, notes}: {goal: Goal, notes: GoalNote[]}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [goalState, setGoalState] = useState<Goal>(goal);
  const [editing, setEditing] = useState(false);
  const [noteState, setNoteState] = useState<GoalNote[]>(notes);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  async function onDelete() {
    if (!confirm("Delete this goal?")) return;
    setLoading(true);
    try {
      await deleteGoal(goal.id);
    } finally {
      setLoading(false);
      router.push(`/goals/${goal.goal_period}/${goal.period_start}`);
    }
  }

  async function onComplete() {
    setLoading(true);
    try {
      await completeGoal(goal.id, goalState.is_completed ? "undo" : "complete");
      setGoalState((prev) => ({ ...prev, is_completed: !prev.is_completed }));
      if(!goalState.is_completed) {
        setShowAnimation(true);
      }
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <PageHeader editing={editing} goalState={goalState} title={goalState.title} returnUrl={`/goals/${goalState.goal_period}/${goalState.period_start}`} setEditing={setEditing} />
      {editing ? 
        <EditGoalForm goal={goalState} setGoal={setGoalState} cancel={() => setEditing(false)} /> 
        : 
        <GoalDetails notes={noteState} setNoteState={setNoteState} goalState={goalState} onComplete={onComplete} onDelete={onDelete} />}
      {showAnimation && <CompleteAnimation goal={goalState} onClose={() => setShowAnimation(false)} />}
    </>
  );
}