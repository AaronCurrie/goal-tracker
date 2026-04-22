'use client'
import { useEffect, useMemo, useState } from "react";
import { Goal } from "@/lib/types/goals";
import styles from "./goalDisplay.module.css"

import GoalCard from "@/components/cards/goal-card"
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";
import AddButton from "@/components/button/add-button/add-button";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import IconButton from "@/components/button/icon-button";
import { faFilter, faList, faTableCells, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useGoalsView } from "@/lib/contexts/goals-view-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type Goals = Goal[];

interface CardDisplayProps {
  goals: Goals;
  date: { year: string, period: string };
}

export default function GoalDisplay({goals, date}: CardDisplayProps) {
    const { displayMode, setDisplayMode, filters, setFilters, resetFilters } = useGoalsView();
    const { categories, activities } = useGoalsData();
    const [goalState, setGoalState] = useState<Goals>(goals);
    const [goalCounts, setGoalCounts] = useState({ total: goals.length, completed: goals.filter(g => g.status === "completed").length, failed: goals.filter(g => g.status === "failed").length });
    const [expandFilter, setExpandFilter] = useState<boolean>(false);

    const datesMeta = useMemo(() => {
        return { year: date.year, period: date.period };
    }, [date.year, date.period]);

    const visibleGoals = useMemo(() => filterGoals(goalState, filters), [goalState, filters]);

    useEffect(() => {
        setGoalCounts({ total: visibleGoals.length, completed: visibleGoals.filter(g => g.status === "completed").length, failed: visibleGoals.filter(g => g.status === "failed").length });
    }, [visibleGoals]);

    return (
        <section className={styles.container}>
            <div className={styles.progressContainer}>
                <p className={styles.progressInfo}>Completed: {goalCounts.completed} / {goalCounts.total}</p>
                <div className={styles.progressBarContainer}>
                    <span className={styles.progressBar} style={{ width: `${goalCounts.total === 0 ? 0 : (goalCounts.completed / goalCounts.total) * 100}%` }}></span>
                    <span className={styles.failedProgress} style={{ width: `${goalCounts.total === 0 ? 0 : (goalCounts.failed / goalCounts.total) * 100}%` }}></span>
                </div>
            </div>
            <div className={styles.header}>
                <IconButton size={'2x'} icon={displayMode === "grid" ? faList : faTableCells} button={{ alt: "Toggle Grid", style: "default" }} onClick={() => setDisplayMode(displayMode === "grid" ? "list" : "grid")} cornerButton={false} />
                    <div className={styles.filterPillContainer}>
                    {filters.search && <div className={styles.filterPill}>{filters.search}<FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTimes} onClick={() => setFilters({ ...filters, search: '' })} /></div>}
                    {filters.status !== 'all' && <div className={styles.filterPill}>{filters.status}<FontAwesomeIcon icon={faTimes} onClick={() => setFilters({ ...filters, status: 'all' })} /></div>}
                    {filters.activityId !== 'all' && <div className={styles.filterPill}>{activities.find(a => a.id === filters.activityId)?.name}<FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTimes} onClick={() => setFilters({ ...filters, activityId: 'all' })} /></div>}
                    {filters.categoryId !== 'all' && <div className={styles.filterPill}>{categories.find(c => c.id === filters.categoryId)?.name}<FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTimes} onClick={() => setFilters({ ...filters, categoryId: 'all' })} /></div>}
                    </div>
                <IconButton icon={faFilter} size='2x' button={{style: expandFilter ? "blue" : "default", alt: "Filters"}} onClick={() => setExpandFilter(!expandFilter)} cornerButton={false} />
            </div>

                {expandFilter && <Filter filters={filters} onChange={(next) => setFilters(next)} onReset={resetFilters} categories={categories} activities={activities} />}
                <div className={`${styles.cardDisplay} ${displayMode === "grid" ? styles.smallGrid : ''}`}>
                    {visibleGoals.map((goal) => {
                        return <GoalCard grid={displayMode === "grid"} key={goal.id} goalData={goal} setGoalState={setGoalState} />
                    })}
                    <AddButton query={`date=${datesMeta.year}&period=${datesMeta.period}`} />
                </div>
        </section>
    )
}