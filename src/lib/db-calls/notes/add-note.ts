
type args = {
    goalId: string;
    content: string;
}

export const addNote = async ({ goalId, content }: args) => {
    try {
        const res = await fetch(`/api/goal/${goalId}/notes/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        })
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("Error response from server:", res.status);
            throw new Error(`Failed to add note. Please try again.`);
        }
        return body.note;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while adding the note. Please try again.`);
    }
}