import { PropsWithChildren } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import styles from './AuthenticationLayout.module.scss';
import 'react-toastify/dist/ReactToastify.css';

interface AuthenticationLayoutProps extends PropsWithChildren {
    showGoBackBtn?: boolean;
    label?: string;
    description?: string;
}

const AuthenticationLayout = ({
    showGoBackBtn = true,
    label,
    description,
    children,
}: AuthenticationLayoutProps) => {
    return (
        <div className={styles.auth}>
            <div className={styles.auth__panel}>
                {showGoBackBtn && (
                    <Link href="/" className={styles.auth__goBackBtn}>
                        <FaLongArrowAltLeft />
                        <span>Вернуться на главную</span>
                    </Link>
                )}
                {label && <h1 className={styles.auth__label}>{label}</h1>}
                {description && (
                    <p className={styles.auth__description}>{description}</p>
                )}
                <div>{children}</div>
            </div>
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

export default AuthenticationLayout;
