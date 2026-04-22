export async function deleteGoal(goalId: string) {
  try {
    const res = await fetch(`/api/goal/${goalId}/delete/`, { method: "DELETE" });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Error response from server:", res.status);
      throw new Error("Failed to delete goal. Please try again.");
    }
    return body;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the goal. Please try again.");
  }
}