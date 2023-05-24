import { useMemo, useRef } from 'react';
import { USER_ROLES, User } from '@/types/api/auth';
import { useTypedSelector } from '@/store/store';
import NavItemComponent, { NavItemDropdown, NavItemLink } from './NavItem';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

export enum NAV_ITEM_TYPES {
    DROPDOWN,
    LINK,
}

const isNavItemDropdown = (navItem: NavItem): navItem is NavItemDropdown =>
    navItem.type === NAV_ITEM_TYPES.DROPDOWN;

export type NavItem = NavItemLink | NavItemDropdown;

const filterNavigation = (user: User, navItems: NavItem[]): NavItem[] => {
    const filteredNavs = navItems.filter((navItem) =>
        navItem.access ? navItem.access(user) : true
    );

    return filteredNavs.map((navItem) => {
        if (!isNavItemDropdown(navItem)) {
            return navItem;
        }

        return {
            ...navItem,
            children: filterNavigation(user, navItem.children!),
        };
    });
};

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
    const user = useTypedSelector((state) => state.auth.user)!;
    const sidebarNavItems: NavItem[] = [
        {
            type: NAV_ITEM_TYPES.DROPDOWN,
            name: 'Курсы',
            // icon: () => <DocumentsIcon />,
            access: (user) => user.role === USER_ROLES.ADMIN,
            children: [
                {
                    type: NAV_ITEM_TYPES.LINK,
                    name: 'Список курсов',
                    to: '/admin/courses',
                    exact: true,
                },
                {
                    type: NAV_ITEM_TYPES.LINK,
                    name: 'Создать курс',
                    to: '/admin/courses/create',
                    exact: true,
                },
            ],
        },
    ];

    const sidebarNode = useRef<HTMLDivElement>(null);

    const navItems = useMemo(() => {
        return filterNavigation(user, sidebarNavItems).map((item) => (
            <NavItemComponent key={item.name + item.type} {...item} />
        ));
    }, [sidebarNavItems]);

    const sidebarClassName = classNames(styles.sidebar);
    return (
        <div ref={sidebarNode} className={sidebarClassName}>
            {navItems}
        </div>
    );
};

export default Sidebar;
