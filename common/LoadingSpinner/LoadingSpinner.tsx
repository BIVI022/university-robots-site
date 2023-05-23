import classNames from 'classnames';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
    <span className={classNames(styles.loadingSpinner, className)}></span>
);

export default LoadingSpinner;
