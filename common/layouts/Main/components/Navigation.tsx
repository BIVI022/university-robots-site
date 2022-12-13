interface NavigationProps {
    className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
    return (
        <nav className={className}>
            <div>Главная</div>
            <div>О нас</div>
            <div>Контакты</div>
            <div>Курсы</div>
        </nav>
    );
};

export default Navigation;
