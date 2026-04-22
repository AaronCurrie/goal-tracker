"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type GoalsDisplayMode = "grid" | "list";

export type GoalsFilters = {
  search: string;
  categoryId: string;
  activityId: string;
  status: "all" | "active" | "completed" | "failed";
  sort: "recent" | "oldest" | "a-z" | "z-a";
};

type GoalsViewContextValue = {
  displayMode: GoalsDisplayMode;
  setDisplayMode: React.Dispatch<React.SetStateAction<GoalsDisplayMode>>;
  toggleDisplayMode: () => void;

  filters: GoalsFilters;
  setFilters: React.Dispatch<React.SetStateAction<GoalsFilters>>;
  updateFilter: <K extends keyof GoalsFilters>(
    key: K,
    value: GoalsFilters[K]
  ) => void;
  resetFilters: () => void;
};

const defaultFilters: GoalsFilters = {
    status: "all",
    categoryId: "all",
    activityId: "all",
    sort: "recent",
    search: "",
};

const GoalsViewContext = createContext<GoalsViewContextValue | undefined>(
  undefined
);

type GoalsViewProviderProps = {
  children: ReactNode;
  initialDisplayMode?: GoalsDisplayMode;
  initialFilters?: Partial<GoalsFilters>;
};

export function GoalsViewProvider({
  children,
  initialDisplayMode = "grid",
  initialFilters = {}
}: GoalsViewProviderProps) {
  const [displayMode, setDisplayMode] =
    useState<GoalsDisplayMode>(initialDisplayMode);

  const [filters, setFilters] = useState<GoalsFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const value = useMemo<GoalsViewContextValue>(
    () => ({
      displayMode,
      setDisplayMode,
      toggleDisplayMode: () => {
        setDisplayMode((prev) => (prev === "grid" ? "list" : "grid"));
      },

      filters,
      setFilters,

      updateFilter: (key, value) => {
        setFilters((prev) => ({
          ...prev,
          [key]: value,
        }));
      },

      resetFilters: () => {
        setFilters(defaultFilters);
      },
    }),
    [displayMode, filters]
  );

  return (
    <GoalsViewContext.Provider value={value}>
      {children}
    </GoalsViewContext.Provider>
  );
}

export function useGoalsView() {
  const context = useContext(GoalsViewContext);

  if (!context) {
    throw new Error("useGoalsView must be used within a GoalsViewProvider");
  }

  return context;
}