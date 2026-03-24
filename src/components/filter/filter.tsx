import { Activity, Category, Goal, GoalFilters } from "@/lib/types/goals";
import Button from "../button/button";
import styles from "./filter.module.css";
import IconButton from "../button/icon-button";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
  filters: GoalFilters;
  onChange: (next: GoalFilters) => void;
  onReset: () => void;
  categories: Category[];
  activities: Activity[];
};

export default function Filter({filters, onChange, onReset, categories, activities}: Props) {

        return (
            <div className={styles.filterContainer}>
                <div className={styles.filterBar}>
                    <input type="text" placeholder="Search..." className={styles.search} value={filters.search} onChange={(e) => onChange({...filters, search: e.target.value})} />
                </div>
                <div className={styles.filters}>
                <div className={styles.filterItem}>
                    <label htmlFor="status">Status:</label>
                    <select 
                        name="status"
                        id="status"
                        className={styles.select}
                        value={filters.status}
                        onChange={(e) => onChange({...filters, status: e.target.value as GoalFilters["status"]})}
                    >
                        <option value="all">All</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label htmlFor="category">Category:</label>
                    <select 
                        name="category"
                        id="category"
                        className={styles.select}
                        value={filters.categoryId}
                        onChange={(e) => onChange({...filters, categoryId: e.target.value as GoalFilters["categoryId"]})}
                    >
                        <option value="all">All</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label htmlFor="activity">Activity:</label>
                    <select 
                        name="activity"
                        id="activity"
                        className={styles.select}
                        value={filters.activityId}
                        onChange={(e) => onChange({...filters, activityId: e.target.value as GoalFilters["activityId"]})}
                    >
                        <option value="all">All</option>
                        {activities.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <Button button={{text: "Clear Filters", style: "edit"}} onClick={onReset}/>
                </div>
                </div>
            </div>
        )
}