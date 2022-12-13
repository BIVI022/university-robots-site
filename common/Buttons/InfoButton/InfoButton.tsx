import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import styles from './InfoButton.module.scss';

interface InfoButtonProps extends PropsWithChildren {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const InfoButton: FC<InfoButtonProps> = ({
    children,
    className = '',
    onClick = () => {},
}) => {
    return (
        <button
            className={`${styles.infoButton} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default InfoButton;
