'use client'
import { useEffect, useMemo, useState } from "react";
import { GoalFilters, Goal, Category, Activity } from "@/lib/types/goals";
import styles from "./goalDisplay.module.css"

import GoalCard from "@/components/cards/goal-card"
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";
import AddButton from "@/components/button/add-button/add-button";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import CompleteAnimation from "@/components/animation/complete-animation/complete";
import IconButton from "@/components/button/icon-button";
import { faFilter, faList, faTableCells } from "@fortawesome/free-solid-svg-icons";

const DEFAULT_FILTERS: GoalFilters = {
  status: "all",
  categoryId: "all",
  activityId: "all",
  sort: "recent",
  search: "",
};

type Goals = Goal[];

interface CardDisplayProps {
  goals: Goals;
  date: { year: string, period: string };
}

export default function GoalDisplay({goals, date}: CardDisplayProps) {
    const { categories, activities } = useGoalsData();
    const [goalState, setGoalState] = useState<Goals>(goals);
    const [goalCounts, setGoalCounts] = useState({ total: goals.length, completed: goals.filter(g => g.is_completed).length });
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [grid, setGrid] = useState<boolean>(false);
    const [expandFilter, setExpandFilter] = useState<boolean>(false);
    
    const [filters, setFilters] = useState<GoalFilters>(DEFAULT_FILTERS);

    const datesMeta = useMemo(() => {
        return { year: date.year, period: date.period };
    }, [date.year, date.period]);

    const visibleGoals = useMemo(() => filterGoals(goalState, filters), [goalState, filters]);

    useEffect(() => {
        setGoalCounts({ total: visibleGoals.length, completed: visibleGoals.filter(g => g.is_completed).length });
    }, [visibleGoals]);

    return (
        <section className={styles.container}>
            <div className={styles.progressContainer}>
                <span className={styles.progressBar} style={{ width: `${goalCounts.total === 0 ? 0 : (goalCounts.completed / goalCounts.total) * 100}%` }}></span>
            </div>
            <div className={styles.header}>
                <IconButton size={'2x'} icon={grid ? faList : faTableCells} button={{ alt: "Toggle Grid", style: "default" }} onClick={() => setGrid(!grid)} cornerButton={false} />
                <p>Completed: {goalCounts.completed} / {goalCounts.total}</p>
                <IconButton icon={faFilter} size='2x' button={{style: expandFilter ? "blue" : "default", alt: "Filters"}} onClick={() => setExpandFilter(!expandFilter)} cornerButton={false} />
            </div>

            {expandFilter && <Filter filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} categories={categories} activities={activities} />}
            <div className={`${styles.cardDisplay} ${grid ? styles.smallGrid : ''}`}>
                {visibleGoals.map((goal) => {
                    return <GoalCard grid={grid} key={goal.id} goalData={goal} setGoalState={setGoalState} setShowAnimation={setShowAnimation} />
                })}
                <AddButton query={`date=${datesMeta.year}&period=${datesMeta.period}`} />
            </div>
            {showAnimation && <CompleteAnimation goal={null} onClose={() => setShowAnimation(false)} />}
        </section>
    )
}