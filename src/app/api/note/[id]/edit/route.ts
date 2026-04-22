import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { content: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const body: Body = await req.json().catch(() => ({}));
    const content = typeof body.content === "string" ? body.content.trim() : undefined;

  if (!content) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = { content };

  const { data, error } = await supabase
    .from("goal_notes")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return new Response(JSON.stringify({ note: data }), { status: 201 });
}