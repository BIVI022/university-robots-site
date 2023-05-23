import { FormEventHandler, ReactElement, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import AuthenticationLayout from '@/common/layouts/AuthenticationLayout';
import AuthenticationFormGroup from '@/common/layouts/AuthenticationLayout/AuthenticationFormGroup';
import SuccessButton from '@/common/buttons/SuccessButton';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useAppDispatch } from '@/store/store';
import { login } from '@/store/slices/auth';
import { useRouter } from 'next/router';
import { FormGroupError } from '@/common/FormGroup';
import styles from './Login.module.scss';

const Login: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormGroupError[]>([]);

    const onLogin: FormEventHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await dispatch(login({ email, password }));
        if (response.payload === true) {
            router.push('/admin');
        } else {
            // const message = (response as any).payload.error.data.message;
            // setErrors([
            //     {
            //         value: 'password',
            //         message,
            //     },
            // ]);
        }
        setLoading(false);
    };

    return (
        <div className={styles.login}>
            <form method="#" onSubmit={onLogin}>
                <AuthenticationFormGroup<string>
                    icon={<AiOutlineUser />}
                    inputId="email"
                    name="email"
                    placeholder="Введите email"
                    onChange={(value) => setEmail(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <AuthenticationFormGroup<string>
                    icon={<HiOutlineLockClosed />}
                    inputId="password"
                    placeholder="Введите пароль"
                    type="password"
                    name="password"
                    onChange={(value) => setPassword(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <SuccessButton
                    className={styles.login__submit}
                    loading={loading}
                    onClick={onLogin}
                >
                    Войти
                </SuccessButton>
            </form>
        </div>
    );
};

Login.getLayout = (page: ReactElement) => {
    return (
        <AuthenticationLayout
            label="Войти"
            description="Войдите в свой аккаунт"
        >
            {page}
        </AuthenticationLayout>
    );
};

export default Login;
