import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = PropsWithChildren<{
    className?: string;
}>;

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={classNames(styles.container, className)}>
            {children}
        </div>
    );
};

export default Container;
