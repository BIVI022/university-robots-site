import { CSSProperties, FC, MouseEvent, PropsWithChildren } from 'react';
import classNames from 'classnames';
import LoadingSpinner from '@/common/LoadingSpinner';
import styles from './Button.module.scss';

export enum BUTTON_TYPES {
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
}

export type ButtonProps = PropsWithChildren<{
    type: BUTTON_TYPES;
    style?: CSSProperties;
    loading?: boolean;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => any;
    className?: string;
    disabledStyle?: boolean;
    htmlProps?: {
        type?: 'submit' | 'reset';
        title?: string;
    };
}>;

const Button: FC<ButtonProps> = ({
    onClick,
    type,
    style,
    children,
    disabledStyle = true,
    className = '',
    loading = false,
    disabled = false,
    htmlProps,
}) => {
    const isDisabled = disabled;

    const onClickHandler =
        onClick &&
        ((e: MouseEvent<HTMLButtonElement>) => {
            if (isDisabled || loading) {
                return;
            }
            onClick(e);
        });

    const buttonClassName = classNames(
        styles.button,
        styles[`button_${type}`],
        {
            [styles.button_loading]: loading,
            [styles.button_nodisable]: !disabledStyle,
        },
        className
    );
    return (
        <button
            disabled={isDisabled}
            className={buttonClassName}
            onClick={onClickHandler}
            style={style}
            type={htmlProps?.type}
            title={htmlProps?.title}
        >
            {loading && (
                <LoadingSpinner className={styles.button__loadingSpinner} />
            )}
            <div className={styles.button__children}>{children}</div>
        </button>
    );
};

export default Button;
