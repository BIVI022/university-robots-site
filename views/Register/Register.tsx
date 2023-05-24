import { FormEventHandler, ReactElement, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import AuthenticationLayout from '@/common/layouts/AuthenticationLayout';
import AuthenticationFormGroup from '@/common/layouts/AuthenticationLayout/AuthenticationFormGroup';
import SuccessButton from '@/common/buttons/SuccessButton';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { FormGroupError } from '@/common/FormGroup';
import { useRegisterMutation } from '@/store/endpoints/auth';
import styles from './Register.module.scss';
import { toast } from 'react-toastify';

const Login: NextPageWithLayout = () => {
    const router = useRouter();

    const [register, { isLoading }] = useRegisterMutation();

    const [email, setEmail] = useState('test@mail.ru');
    const [name, setName] = useState('Test');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');
    const [errors, setErrors] = useState<FormGroupError[]>([]);

    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const isValidData = validateData();
        if (!isValidData) {
            return;
        }
        try {
            const request = register({ email, password, name }).unwrap();
            toast.promise(request, {
                pending: 'Регистрируем...',
                success: 'Рагестрация завершена',
                error: 'Ошибка во время регистрации',
            });
            await request;
            router.push('/login');
        } catch (e: any) {
            const errors = e.data.errors;
            setErrors(errors);
        }
    };

    const validateData = () => {
        if (!email) {
            setErrors([
                {
                    value: 'email',
                    message: 'Email не может быть пустым',
                },
            ]);
            return false;
        }
        if (!name) {
            setErrors([
                {
                    value: 'password',
                    message: 'Пароль не может быть пустым',
                },
            ]);
            return false;
        }
        if (!password) {
            setErrors([
                {
                    value: 'password',
                    message: 'Пароль не может быть пустым',
                },
            ]);
            return false;
        }
        if (!confirmPassword) {
            setErrors([
                {
                    value: 'confirmPassword',
                    message: 'Подтверждение пароля не может быть пустым',
                },
            ]);
            return false;
        }
        if (confirmPassword !== password) {
            setErrors([
                {
                    value: 'confirmPassword',
                    message: 'Пароли не совпадают',
                },
            ]);
            return false;
        }

        return true;
    };

    return (
        <div className={styles.login}>
            <form method="#" onSubmit={onSubmit}>
                <AuthenticationFormGroup<string>
                    icon={<AiOutlineMail />}
                    inputId="email"
                    name="email"
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(value) => setEmail(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <AuthenticationFormGroup<string>
                    icon={<AiOutlineUser />}
                    inputId="name"
                    placeholder="Введите имя"
                    name="name"
                    value={name}
                    onChange={(value) => setName(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <AuthenticationFormGroup<string>
                    icon={<HiOutlineLockClosed />}
                    inputId="password"
                    placeholder="Введите пароль"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(value) => setPassword(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <AuthenticationFormGroup<string>
                    icon={<HiOutlineLockClosed />}
                    inputId="confirmPassword"
                    placeholder="Повторите пароль"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(value) => setConfirmPassword(value)}
                    errors={errors}
                    setErrors={setErrors}
                />
                <SuccessButton
                    className={styles.login__submit}
                    loading={isLoading}
                    onClick={onSubmit}
                >
                    Зарегистрироваться
                </SuccessButton>
            </form>
        </div>
    );
};

Login.getLayout = (page: ReactElement) => {
    return (
        <AuthenticationLayout
            label="Регистрация"
            description="Создайте свой аккаунт"
        >
            {page}
        </AuthenticationLayout>
    );
};

export default Login;
