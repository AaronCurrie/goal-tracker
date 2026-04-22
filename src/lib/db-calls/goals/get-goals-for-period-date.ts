import { supabaseServer } from "../../supabase/server";

type Period = "yearly" | "quarterly" | "monthly";

function assertIsoDate(d: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    throw new Error("Invalid date, expected YYYY-MM-DD");
  }
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toPeriodStartAnchor(period: Period, navDate: string): string {
  assertIsoDate(navDate);
  const [yStr, mStr] = navDate.split("-");
  const m = Number(mStr);

  if (period === "yearly") {
    return `${yStr}-01-01`;
  }

  if (period === "monthly") {
    return `${yStr}-${mStr}-01`;
  }

  // quarterly
  const qStartMonth = Math.floor((m - 1) / 3) * 3 + 1; // 1,4,7,10
  return `${yStr}-${pad2(qStartMonth)}-01`;
}

export const getGoalsForPeriodAndDate = async (period: Period, date: string) => {
      const supabase = await supabaseServer();
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return [];

      const periodStart = toPeriodStartAnchor(period, date);;
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
    .eq("goal_period", period)
    .eq("period_start", periodStart)
    .order("created_at", { ascending: true });
    
      if (error) throw new Error(error.message);
      return data ?? [];
}