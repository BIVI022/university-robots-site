import { FC, PropsWithChildren } from 'react';
import AnimatedAppend from '../../common/AnimatedAppend';
import InfoButton from '../../common/Buttons/InfoButton';
import Container from '../../common/layouts/Main/components/Container';
import styles from './Main.module.scss';

const Main = () => {
    const courses: CourseProps[] = [
        {
            title: 'Основы Java программирования',
            minAge: 13,
            description:
                'Курс познакомит слушателей с объектно-ориентированным программированием на примере одного из самых популярных языков — Java. Мы также рассмотрим общие вопросы, относящиеся к процессу программирования, принципам обработки информации компьютером, представлению данных в программе.',
            colorTheme: 'rgb(40 138 52)',
            image: 'https://tehnikaarenda.ru/wp-content/uploads/2/4/4/244df1c1394b54db297bee912151ae89.jpeg',
        },
        {
            title: 'Робототехника Arduino',
            minAge: 13,
            description:
                'Arduino чрезвычайно удобен для создания прототипов электронных устройств и поэтому пользуется популярностью среди любителей, студентов и вполне серьезных изобретателей по всему миру. Программы пишутся на популярном языке программирования С++, основные элементы которого ваши дети изучат буквально за несколько часов.',
            colorTheme: '#228ab7',
            image: '/images/arduino.png',
        },
        {
            title: 'Робототехника Lego EV3',
            minAge: 10,
            description:
                'Платформа позволяет ученикам создавать, программировать и тестировать свои решения, используя реальные технологии из мира робототехники. С её помощью легко и просто совершенствовать знания в области информатики, физики, технологии и математики, при этом развивая критически выжные для XXI века навыки и умения.',
            colorTheme: 'rgb(232 167 24)',
            image: 'https://medinat.by/wp-content/uploads/2015/12/LEGO-Mindstorms-Education-EV3.jpg',
        },
        {
            title: 'Основы программирования на Python',
            minAge: 13,
            description:
                'Вместе с учениками будем решать самые важные задачи в программировании! Алгоритмы сортировки и поиска, типы данных и основные языковые конструкции, работа с массивами, списками и стеком, а также решение увлекательных логистических задач при помощи программирования!',
            colorTheme: 'rgb(200 36 39)',
            image: 'https://ylianova.ru/800/600/https/www.sevenstarwebsolutions.com/wp-content/uploads/2019/07/Python-Web-Development.png',
        },
        {
            title: 'Web-разработка',
            minAge: 12,
            description:
                'Создавать сайты, приложения, трехмерные презентации, игры и даже социальные сети — всему этому вы научитесь на данным курсе. Вы узнаете, как оформлять сайт, познакомитесь с языком программирования JavaScript, научитесь использовать библиотеки JQuery и Bootstrap, необходимые для создания web-приложений, освоите продвинутые технологии и многое другое.',
            colorTheme: 'rgb(40 98 56)',
            image: 'https://codenplay.io/img/web-landing/web-dev-image.jpg',
        },
        {
            title: 'Разработка игр (SCRATCH)',
            minAge: 8,
            description:
                'Курс по разработке на Scratch познакомит вашего ребенка с основами программирования в уникальном творческом формате, а результатом станет его первый — собственный! — анимированный фильм, которым вы обязательно будете гордиться.',
            colorTheme: 'rgb(232 167 24)',
            image: 'https://cdn-ru.bitrix24.ru/b13611818/landing/f47/f4787fe03107355e9b3736c349be7ee2/SKRATCH_1x.png',
        },
    ];

    const scrollToCoursesSection = () => {
        const coursesSection = document.querySelector<HTMLDivElement>(
            `.${styles.courses}`
        );
        if (coursesSection) {
            window.scrollTo({
                top: coursesSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={styles.main}>
            <Container className={styles.welcome}>
                <div
                    className={`${styles.bgCloud} ${styles.bgCloud_above}`}
                ></div>
                <div
                    className={`${styles.bgCloud} ${styles.bgCloud_middle}`}
                ></div>
                <div
                    className={`${styles.bgCloud} ${styles.bgCloud_below}`}
                ></div>
                <div>
                    <h1 className={styles.welcome__title}>Робототехника</h1>
                    <div className={styles.welcome__subtitle}>
                        Создавай сайты, игры, проектируй роботов - всему этому
                        вы научитесь на данном факультете. Вы узнаете, как
                        оформлять сайт, создавать, программировать и тестировать
                        свои решения, используя реальные технологии из мира
                        робототехники. Изучая самые востребованные языки
                        программирование, вместе с учениками решаем наиважнейшие
                        задачи в программировании!
                    </div>
                    <InfoButton
                        onClick={scrollToCoursesSection}
                        className={styles.welcome__learnMoreBtn}
                    >
                        Узнать больше
                    </InfoButton>
                </div>
                <div className={styles.welcome__image}>
                    <img src="/images/welcome-bg.png" alt="robot" />
                </div>
            </Container>
            <Section title="О нас" className={styles.about}>
                <div>Здесь будут фотографии(если они есть :D)</div>
            </Section>
            <Section title="Курсы" className={styles.courses}>
                <div className={styles.courses__list}>
                    {courses.map((course, i) => (
                        <AnimatedAppend
                            key={course.title}
                            animationClasses={{
                                onMount:
                                    i % 2 === 0
                                        ? styles.animationLeft
                                        : styles.animationRight,
                                onIntersection: styles.animationShow,
                            }}
                        >
                            <Course {...course} />
                        </AnimatedAppend>
                    ))}
                </div>
            </Section>
        </div>
    );
};

interface SectionProps extends PropsWithChildren {
    title: string;
    className?: string;
}

const Section: FC<SectionProps> = ({ title, children, className = '' }) => (
    <Container className={`${styles.section} ${className}`}>
        <h2 className={styles.section__title}>{title}</h2>
        <div>{children}</div>
    </Container>
);

interface CourseProps {
    title: string;
    minAge: number;
    description: string;
    image: string;
    colorTheme: string;
}

const Course = ({
    title,
    minAge,
    description,
    colorTheme,
    image,
}: CourseProps) => (
    <div className={styles.course}>
        <div className={styles.course__info}>
            <div style={{ color: colorTheme }} className={styles.course__title}>
                {title}
            </div>
            <div
                style={{ color: colorTheme }}
                className={styles.course__minAge}
            >
                С {minAge} лет
            </div>
            <div className={styles.course__description}>{description}</div>
            <InfoButton
                className={styles.course__openBtn}
                onClick={() => alert('In develop')}
            >
                Перейти к курсу
            </InfoButton>
        </div>
        <div className={styles.course__image}>
            <img src={image} />
        </div>
        <InfoButton
            className={`${styles.course__openBtn} ${styles.course__openBtn_below}`}
            onClick={() => alert('In develop')}
        >
            Перейти к курсу
        </InfoButton>
    </div>
);

export default Main;
