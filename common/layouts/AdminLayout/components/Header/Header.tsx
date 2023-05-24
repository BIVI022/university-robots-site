import UserProfile from './UserProfile';
import Container from '../Container';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Container className={styles.header__content}>
                <Link href="/" className={styles.header__label}>
                    <div className={styles.header__logo}>
                        <img src="/images/brgu-logo.png" alt="logo" />
                    </div>
                    <span>Портал Центра актуальных профессий</span>
                </Link>
                <UserProfile className={styles.header__userProfile} />
            </Container>
        </header>
    );
};

export default Header;
