import GoalDisplay from "@/layouts/goalDisplay/goalDisplay";
import { getAllGoalsForUser } from "@/lib/db-calls/goals/get-all-goals-for-user";

export default async function GoalsPage() {
  const period = "yearly";
const year = new Date().toISOString().split('T')[0];
  console.log(period, year, 'PARAMS');
  const goals = await getAllGoalsForUser();
  return (
      <GoalDisplay date={{ year, period }} goals={goals ?? []}/>
  );
}