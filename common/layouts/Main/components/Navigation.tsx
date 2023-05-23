import mainLayoutStyles from '../MainLayout.module.scss';
import mainViewStyles from '../../../../views/Main/Main.module.scss';
import Link from 'next/link';

interface NavigationProps {
    className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
    const scrollToContacts = () => {
        const appWrapperNode = document.querySelector<HTMLDivElement>(
            `.${mainLayoutStyles.wrapper}`
        );
        if (appWrapperNode) {
            window.scrollTo({
                top: appWrapperNode.offsetHeight,
                behavior: 'smooth',
            });
        }
    };

    const scrollToWelcomeSection = () => {
        const welcomeSection = document.querySelector<HTMLDivElement>(
            `.${mainViewStyles.welcome}`
        );
        if (welcomeSection) {
            window.scrollTo({
                top: welcomeSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    const scrollToAboutSection = () => {
        const aboutSection = document.querySelector<HTMLDivElement>(
            `.${mainViewStyles.about}`
        );
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    const scrollToCoursesSection = () => {
        const coursesSection = document.querySelector<HTMLDivElement>(
            `.${mainViewStyles.courses}`
        );
        if (coursesSection) {
            window.scrollTo({
                top: coursesSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className={className}>
            <div onClick={scrollToWelcomeSection}>Главная</div>
            <div onClick={scrollToAboutSection}>О нас</div>
            <div onClick={scrollToContacts}>Контакты</div>
            <div onClick={scrollToCoursesSection}>Курсы</div>
            <Link href="/login">Войти</Link>
        </nav>
    );
};

export default Navigation;
