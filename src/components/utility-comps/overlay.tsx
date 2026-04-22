import React from 'react';
import styles from "./utility-comps.module.css"

interface OverlayProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ children, onClick }) => {

    return (
        <div className={styles.overlay} onClick={onClick}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};