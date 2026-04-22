import { supabaseServer } from "@/lib/supabase/server";
import { cache } from "react";

export const getGoalForId = cache(async (id: string) => {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("goals")
        .select(`
            id,
            title,
            description,
            status,
            goal_period,
            period_start,
            created_at,
            completed_at,
            category:categories (
                id,
                name
            ),
            activity:activities (
                id,
                name
            )
        `)
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);
    return data;
});