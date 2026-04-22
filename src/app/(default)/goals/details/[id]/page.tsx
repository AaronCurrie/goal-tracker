import SingleGoalDisplay from "@/layouts/single-goal-display/single-goal-display";
import { getGoalForId } from "@/lib/db-calls/goals/get-goal-for-id";
import { getNoteForGoal } from "@/lib/db-calls/notes/get-notes-for-goal";

export default async function GoalPage({params}: { params: { id: string } }) {
    const { id } = await params;
    const goal = await getGoalForId(id);
    const notes = await getNoteForGoal(id);
  return (
      <SingleGoalDisplay goal={goal} notes={notes} />
  );
}