import { supabaseServer } from "@/lib/supabase/server";
import { cache } from "react";

export const getAllGoalsForUser = cache(async () => {
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
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
});