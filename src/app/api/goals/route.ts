import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { 
  title?: string; 
  description?: string | null;
  category_id?: string;
  activity_id?: string;
  goal_period?: string;
  period_start?: string;
};

type GoalPeriod = "yearly" | "quarterly" | "monthly";

function isGoalPeriod(value: unknown): value is GoalPeriod {
  return value === "yearly" || value === "quarterly" || value === "monthly";
}

function isISODate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function POST(req: Request) {

  const body: Body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  const description =
    body.description === null ? null :
    typeof body.description === "string" ? body.description.trim() :
    undefined;
  const category_id = typeof body.category_id === "string" ? body.category_id : undefined;
  const activity_id = typeof body.activity_id === "string" ? body.activity_id : undefined;
  const goal_period = typeof body.goal_period === "string" ? body.goal_period : undefined;
  const period_start = typeof body.period_start === "string" ? body.period_start : undefined;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  if (!isGoalPeriod(goal_period)) {
    return NextResponse.json(
      { error: "Period must correspond to one of the available options." },
      { status: 400 }
    );
  }
  if (!isISODate(period_start)) {
    return NextResponse.json(
      { error: "Period start must be in the format YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const supabase = await supabaseServer();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const user = userRes.user;

  const normalizedCategoryId =
    typeof category_id === "string" && category_id.trim() === "" ? null : category_id;

  const normalizedActivityId =
    typeof activity_id === "string" && activity_id.trim() === "" ? null : activity_id;

  const { data, error } = await supabase
    .from("goals")
    .insert({
      user_id: user.id,
      title,
      goal_period,
      period_start,
      category_id: normalizedCategoryId,
      activity_id: normalizedActivityId,
      description: description || null,
    })
    .select(
      `
        id,
        title,
        goal_period,
        period_start,
        category_id,
        activity_id,
        status,
        completed_at,
        created_at,
        description
      `
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ goal: data }, { status: 201 });
}