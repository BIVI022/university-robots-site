interface NavigationProps {
    className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
    return (
        <nav className={className}>
            <div className="navbar__item">Главная</div>
            <div className="navbar__item">О нас</div>
            <div className="navbar__item">Контакты</div>
            <div className="navbar__item">Курсы</div>
        </nav>
    );
};

export default Navigation;
