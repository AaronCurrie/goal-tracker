import { GoalsFilters } from "../contexts/goals-view-context";
import { Goal } from "../types/goals";

export default function filterGoals(goals: Goal[], filters: GoalsFilters) {
    const filteredGaols = goals.filter((goal) => {
        if(filters.search && !goal.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.status !== "all" && goal.status !== filters.status) return false;
        if (filters.categoryId !== "all" && goal?.category?.id !== filters.categoryId) return false;
        if (filters.activityId !== "all" && goal?.activity?.id !== filters.activityId) return false;
        return true;
    })
    return filteredGaols;
}