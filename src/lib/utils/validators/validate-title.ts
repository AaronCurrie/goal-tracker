
type args = {
    title: string;
    titleRef: React.RefObject<HTMLInputElement | null>;
}

export async function validateTitle({title, titleRef}: args) {
    if (!title || typeof title !== "string") {
        if (titleRef?.current) {
            titleRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            titleRef.current.focus();
        }
        return "Title is required";
    } else {
        return null;
    }
}