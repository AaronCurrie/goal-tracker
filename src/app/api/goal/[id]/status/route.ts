import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { action?: "complete" | "active" | "fail"; status: "completed" | "active" | "failed" };

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body: Body = await req.json().catch(() => ({} as Body));

  let statusAction: string | undefined = "active";
  if (body.action === "complete") {
    statusAction = "completed";
  } else if (body.action === "active") {
    statusAction = "active";
  } else if (body.action === "fail") {
    statusAction = "failed";
  }

  if (statusAction === undefined) {
    return NextResponse.json({ error: "Provide action: 'complete' | 'active' | 'fail' or status: 'completed' | 'active' | 'failed'" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = {
    status: statusAction,
    completed_at: statusAction === "completed" ? new Date().toISOString() : null,
    failed_at: statusAction === "failed" ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .select("*")
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, goal: data });
}