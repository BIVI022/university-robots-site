import Container from '../Container';
import Navigation from '../Navigation';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Navigation className={styles.header__navbar} />
            </Container>
        </header>
    );
};

export default Header;
