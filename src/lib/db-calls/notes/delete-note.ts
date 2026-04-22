type args = {
    id: string;
}

export const deleteNote = async ({ id }: args) => {
    try {
        const res = await fetch(`/api/note/${id}/delete`, {
            method: "DELETE",
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error("Error response from server:", res.status);
            throw new Error(`Failed to delete note. Please try again.`);
        }
        return body.note;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while deleting the note. Please try again.`);
    }
}