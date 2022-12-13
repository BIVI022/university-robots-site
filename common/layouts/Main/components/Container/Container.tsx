import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './Container.module.scss';

interface ContainerProps extends PropsWithChildren {
    className?: string;
}

const Container: FC<ContainerProps> = ({
    children,
    className: customClassName = '',
}) => {
    const className = classNames(styles.container, customClassName);
    return <div className={className}>{children}</div>;
};

export default Container;
