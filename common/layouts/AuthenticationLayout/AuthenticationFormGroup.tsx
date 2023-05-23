import FormGroup, { FormGroupProps } from '../../FormGroup';
import styles from './AuthenticationFormGroup.module.scss';

interface AuthenticationFormGroupProps<Value = any>
    extends FormGroupProps<Value> {
    icon: JSX.Element;
}

const AuthenticationFormGroup = <Value = any,>(
    props: AuthenticationFormGroupProps<Value>
) => {
    return (
        <FormGroup<Value>
            label={
                <label
                    htmlFor={props.inputId}
                    className={styles.preControlIcon}
                >
                    {props.icon}
                </label>
            }
            classNames={{
                input: styles.input,
                container: styles.container,
                control: styles.control,
            }}
            {...props}
        />
    );
};

export default AuthenticationFormGroup;
