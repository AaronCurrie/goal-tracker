import AddGoalForm from "@/components/form/add-goal-form/add-goal-form";
import PageHeader from "@/components/page-header/page-header";


export default async function AddGoalPage({searchParams}: { searchParams: { date: string, period: string } }) {
    const { period, date } = await searchParams;
  return (
    <>
      <PageHeader title="Add Goal" editing={false} returnUrl={`/goals/${period}/${date}`} />
      <AddGoalForm datesMeta={{ date, period }}/>
    </>
  );
}