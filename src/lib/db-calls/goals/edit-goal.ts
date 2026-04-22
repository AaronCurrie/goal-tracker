type args = {
    title: string;
    description?: string | null;
    category_id?: string;
    activity_id?: string;
    goal_period: "yearly" | "quarterly" | "monthly";
    period_start: string;
    id: string;
}

export async function editGoal({id, title, description, category_id, activity_id, goal_period, period_start}: args) {
    try {
        const res = await fetch(`/api/goal/${id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                title, 
                description, 
                category_id, 
                activity_id, 
                goal_period, 
                period_start 
            }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("Error response from server:", res.status);
            throw new Error("Failed to edit goal. Please try again.");
        } else {
            return body;
        }
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while editing the goal. Please try again.");
    }
}