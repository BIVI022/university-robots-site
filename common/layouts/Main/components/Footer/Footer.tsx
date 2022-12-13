import Container from '../Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from '../Navigation';
import {
    faLocationDot,
    faPhone,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.scss';
import { ReactElement } from 'react';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container className={styles.footer__container}>
                <div className={styles.footer__contacts}>
                    <div className={styles.footer__univerTitle}>
                        <img src="/images/univer-logo.png" alt="logo" />
                        <p>
                            Брестский государственный университет имени А. С.
                            Пушкина
                        </p>
                    </div>
                    <ContactItem
                        icon={<FontAwesomeIcon icon={faLocationDot} />}
                        text="Беларусь, Брест, бул. Космонавтов, 21, каб. 513,
                            224016"
                        className={styles.footer__address}
                    />
                    <a href="telto:21-65-17">
                        <ContactItem
                            icon={<FontAwesomeIcon icon={faPhone} />}
                            text="(375-162) 21-65-17"
                        />
                    </a>
                    <a href="mailto:stem@brsu.by">
                        <ContactItem
                            icon={<FontAwesomeIcon icon={faEnvelope} />}
                            text="stem@brsu.by"
                        />
                    </a>
                </div>
                <div>
                    <Navigation className={styles.footer__nav} />
                </div>
            </Container>
        </footer>
    );
};

interface ContactItemProps {
    icon: ReactElement;
    text: string;
    className?: string;
}

const ContactItem = ({ icon, text, className = '' }: ContactItemProps) => (
    <div className={`${styles.contactItem} ${className}`}>
        <div className={styles.contactItem__icon}>{icon}</div>
        <p>{text}</p>
    </div>
);

export default Footer;
