type args = {
    label: string;
    itemUpdate: string;
    id: string;
}

export async function editItem({label, itemUpdate, id}: args) {
    try {
        const res = await fetch(`/api/${label.toLowerCase()}/${id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: itemUpdate,
            }),
        });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.error("Error response from server:", res.status);
                throw new Error(`Failed to edit ${label}. Please try again.`);
            }
            const item = body.activity ?? body.category ?? body;
            return item;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while editing the ${label}. Please try again.`);
    }
}