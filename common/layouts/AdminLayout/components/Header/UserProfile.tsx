import { useAppDispatch, useTypedSelector } from '@/store/store';
import classNames from 'classnames';
import { RxExit } from 'react-icons/rx';
import { useState } from 'react';
import { logout } from '@/store/slices/auth';
import styles from './UserProfile.module.scss';
import { FaUser } from 'react-icons/fa';

interface UserProfileProps {
    className?: string;
}

const UserProfile = ({ className }: UserProfileProps) => {
    const dispatch = useAppDispatch();
    const user = useTypedSelector((state) => state.auth.user)!;

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <div className={classNames(styles.userProfile, className)}>
            <div
                onClick={() => setPopupOpen((state) => !state)}
                className={styles.userProfile__username}
            >
                <FaUser className={styles.userProfile__userIcon} />
                <span>{user.email}</span>
            </div>
            {popupOpen && (
                <div className={styles.userProfile__popup}>
                    <div
                        className={styles.userProfile__logoutBtn}
                        onClick={() => dispatch(logout())}
                    >
                        <RxExit />
                        {/* TODO i18next */}
                        <span>Выйти</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
