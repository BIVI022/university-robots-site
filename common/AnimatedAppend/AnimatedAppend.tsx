import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import styles from './AnimatedAppend.module.scss';

interface AnimationClasses {
    onMount: string;
    onIntersection: string;
}

export const withAnimatedAppend = (
    element: HTMLElement,
    {
        animationClasses = {
            onMount: styles.animated,
            onIntersection: styles.animated_show,
        },
        delay,
    }: {
        animationClasses?: AnimationClasses;
        delay?: number;
    }
) => {
    element.classList.add(animationClasses.onMount);

    const observer = new IntersectionObserver(
        (entry) => {
            entry.forEach((change) => {
                if (change.isIntersecting) {
                    if (delay) {
                        setTimeout(() => {
                            change.target.classList.add(
                                animationClasses.onIntersection
                            );
                        }, delay);
                        return;
                    }
                    change.target.classList.add(
                        animationClasses.onIntersection
                    );
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    observer.observe(element);
};

interface AnimatedAppendProps extends PropsWithChildren {
    animationClasses?: AnimationClasses;
    delay?: number;
    className?: string;
}

const AnimatedAppend: FC<AnimatedAppendProps> = ({
    children,
    animationClasses,
    delay = 0,
    className = '',
}) => {
    const node = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!node.current) {
            return;
        }
        withAnimatedAppend(node.current, {
            animationClasses,
            delay,
        });
    }, []);

    return (
        <div className={className} ref={node}>
            {children}
        </div>
    );
};

export default AnimatedAppend;
