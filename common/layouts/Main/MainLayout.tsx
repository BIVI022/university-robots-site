import React, { FC, PropsWithChildren } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './MainLayout.module.scss';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
