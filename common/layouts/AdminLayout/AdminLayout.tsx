import { FC, PropsWithChildren, ReactElement } from 'react';
import { useGetCurrentUserQuery } from '@/store/endpoints/auth';
import { useRouter } from 'next/router';
import Header from './components/Header';
import { useTypedSelector } from '../../../store/store';
import Container from './components/Container';
import Sidebar from './components/Sidebar';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '@/pages/_app';
import { ToastContainer } from 'react-toastify';
import styles from './AdminLayout.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { USER_ROLES } from '@/types/api/auth';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const { isLoading } = useGetCurrentUserQuery();
    const user = useTypedSelector((state) => state.auth.user);

    if (isLoading) {
        return <FirstTimeLoadingView />;
    }

    if (!user || user.role !== USER_ROLES.ADMIN) {
        router.push('/login');
        return <FirstTimeLoadingView />;
    }

    return (
        <div className={styles.adminLayout}>
            <Header />
            <Container className={styles.adminLayout__content}>
                <Sidebar />
                <div>{children}</div>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

const LogoLoadingSpinner = () => (
    <div className={styles.logoLoadingSpinner}>
        <img src="/images/brgu-logo.png" alt="logo" />
    </div>
);

const FirstTimeLoadingView = () => (
    <div className={styles.firstTimeLoadingView}>
        <LogoLoadingSpinner />
    </div>
);

export const dynamicWithLoadingView = (
    componentImportCb: () => Promise<any>
) => {
    const component: NextPageWithLayout = dynamic(componentImportCb, {
        loading: () => (
            <div className={styles.suspenseView}>
                <LogoLoadingSpinner />
            </div>
        ),
    });
    component.getLayout = (page: ReactElement) => {
        return <AdminLayout>{page}</AdminLayout>;
    };
    return component;
};

export default AdminLayout;
