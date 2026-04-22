export type Goal = {
  id: string;
  title: string;
  description?: string | null;
  status: "active" | "completed" | "failed";
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category: any;
  activity: any;
  created_at: string;
  completed_at: string | null;
  failed_at: string | null;
};

export type GoalFilters = {
  status: "all" | "completed" | "incomplete";
  categoryId: string | "all";
  activityId: string | "all";
  sort: "recent" | "title" | "period";
  search: string;
};

export type Category = {
  id: string;
  name: string;
}

export type Activity = {
  id: string;
  name: string;
}

export type GoalNote = {
  id: string;
  content: string;
  created_at: string;
}