type args = {
    label: string;
    newItem: string;
}

export async function addItem({label, newItem}: args) {
    try {
        const res = await fetch(`/api/${label.toLowerCase()}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newItem,
                }),
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.error("Error response from server:", res.status);
                throw new Error(`Failed to add ${label}. Please try again.`);
            }
            const item = body.activity ?? body.category ?? body;
            return item;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while adding the ${label}. Please try again.`);
    }
}