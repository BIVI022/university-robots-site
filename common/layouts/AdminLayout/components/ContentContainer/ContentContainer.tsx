import { CSSProperties, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './ContentContainer.module.scss';

const ContentContainer = ({
    children,
    className,
    style,
}: PropsWithChildren<{
    className?: string;
    style?: CSSProperties;
}>) => (
    <div style={style} className={classNames(styles.container, className)}>
        {children}
    </div>
);

export default ContentContainer;
