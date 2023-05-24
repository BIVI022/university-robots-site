import { useState } from 'react';
import { NAV_ITEM_TYPES, NavItem as INavItem } from './Sidebar';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { User } from '@/types/api/auth';
import styles from './NavItem.module.scss';

const NavItem = (navItem: INavItem) => {
    switch (navItem.type) {
        case NAV_ITEM_TYPES.DROPDOWN:
            return <NavItemDropdown {...navItem} />;
        case NAV_ITEM_TYPES.LINK:
            return <NavItemLink {...(navItem as any)} />;
        default:
            return <div></div>;
    }
};

export interface NavItemDropdown {
    type: NAV_ITEM_TYPES.DROPDOWN;
    name: string;
    icon?: () => JSX.Element;
    children: INavItem[];
    className?: string;
    access?: (user: User) => boolean;
}

const NavItemDropdown = ({
    name,
    icon: Icon,
    children,
    className,
}: NavItemDropdown) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((state) => !state);

    return (
        <div
            className={classNames(
                styles.navItem,
                styles.navItem_dropdown,
                className,
                {
                    [styles.navItem_dropdown_open]: dropdownOpen,
                }
            )}
        >
            <div onClick={toggleDropdown} className={styles.navItem__title}>
                {Icon && (
                    <div className={styles.navItem__icon}>
                        <Icon />
                    </div>
                )}
                <span className={styles.navItem__name}>{name}</span>
                <span className={styles.navItem__arrow}></span>
            </div>
            {dropdownOpen ? (
                <div className={styles.navItem__options}>
                    <div className={styles.navItem__option}>
                        {children?.map((child) => (
                            <NavItem
                                className={classNames(
                                    styles.navItem_children,
                                    child.className
                                )}
                                key={child.name + child.type}
                                {...child}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export interface NavItemLink {
    type: NAV_ITEM_TYPES.LINK;
    name: string;
    to: string;
    exact?: boolean;
    icon?: () => JSX.Element;
    className?: string;
    access?: (user: User) => boolean;
    notification?: boolean;
}

const NavItemLink = ({
    exact,
    name,
    to,
    icon: Icon,
    className,
    notification,
}: NavItemLink) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === to : pathname.startsWith(to);

    return (
        <div
            className={classNames(styles.navItem, className, {
                [styles.navItem_notification]: notification,
            })}
        >
            <Link
                href={to}
                className={classNames(styles.navItem__title, {
                    [styles.navItem__title_active]: isActive,
                })}
            >
                {Icon && (
                    <div className={styles.navItem__icon}>
                        <Icon />
                    </div>
                )}
                <span className={styles.navItem__name}>{name}</span>
            </Link>
        </div>
    );
};

export default NavItem;
