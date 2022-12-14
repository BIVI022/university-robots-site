import React, { FC, PropsWithChildren, useState } from 'react';
import styles from './BurgerPanel.module.scss';

interface BurgerProps extends PropsWithChildren {
    className?: string;
}

const Burger: FC<BurgerProps> = ({ children, className = '' }) => {
    const [open, setOpen] = useState(false);

    const toggleBurger = () => setOpen((state) => !state);

    return (
        <div
            className={`${styles.panel} ${
                open ? styles.panel_open : ''
            } ${className}`}
        >
            <div className={styles.panel__burger} onClick={toggleBurger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.panel__content}>{children}</div>
        </div>
    );
};

export default Burger;
