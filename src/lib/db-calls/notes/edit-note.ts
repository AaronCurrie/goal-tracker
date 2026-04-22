type args = {
    id: string;
    content: string;
}

export const editNote = async ({ id, content }: args) => {
    try {
        const res = await fetch(`/api/note/${id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("Error response from server:", res.status);
            throw new Error(`Failed to edit note. Please try again.`);
        }
        return body.note;
    } catch (error:any) {
        console.error(error.message);
        throw new Error(`An error occurred while editing the note. Please try again.`);
    }
}