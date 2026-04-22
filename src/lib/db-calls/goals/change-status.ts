export async function changeGoalStatus(goalId: string, action: "complete" | "active" | "fail") {
  try {
    const res = await fetch(`/api/goal/${goalId}/status/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Error response from server:", res.status, body);
      throw new Error("Failed to change goal status. Please try again.");
    } else {
      return body;
    }
  } catch (error:any) {
    console.error(error);
    throw new Error("An error occurred while changing the goal status. Please try again.");
  }
}
