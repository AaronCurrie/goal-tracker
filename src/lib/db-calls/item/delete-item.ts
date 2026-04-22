type args = {
    label: string;
    id: string;
}

export async function deleteItem({label, id}: args) {
    try {
        const res = await fetch(`/api/${label.toLowerCase()}/${id}/delete`, {
            method: "DELETE",
        });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.error("Error response from server:", res.status);
                throw new Error(`Failed to delete ${label}. Please try again.`);
            }
            const item = body.activity ?? body.category ?? body;
            return item;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while deleting the ${label}. Please try again.`);
    }
}