import BurgerPanel from '../../../../BurgerPanel';
import Container from '../Container';
import Navigation from '../Navigation';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Navigation className={styles.header__navbar} />
                <BurgerPanel className={styles.header__burger}>
                    <Navigation className={styles.header__burgerNav} />
                </BurgerPanel>
            </Container>
        </header>
    );
};

export default Header;
