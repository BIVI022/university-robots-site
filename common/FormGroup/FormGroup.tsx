import React, {
    forwardRef,
    HTMLInputTypeAttribute,
    CSSProperties,
    FocusEventHandler,
    ForwardedRef,
    Dispatch,
    SetStateAction,
} from 'react';
import classnames from 'classnames';
import styles from './FormGroup.module.scss';

interface FormControlCbParams<Value = any> {
    error?: string | JSX.Element;
    helpAreaComponent: JSX.Element;
    onChange: (val: Value) => void;
    classNames: {
        control?: string;
        input?: string;
    };
}

export interface FormGroupError {
    value: string;
    message: string | JSX.Element;
}

export interface FormGroupProps<Value = any> {
    value?: Value;
    type?: HTMLInputTypeAttribute;
    name?: string;
    onChange: (value: Value) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    label?: string | JSX.Element;
    inputId?: string;
    placeholder?: string;
    classNames?: {
        container?: string;
        input?: string;
        control?: string;
        label?: string;
        helpArea?: string;
    };
    disabled?: boolean;
    style?: CSSProperties;
    errors?: FormGroupError[];
    setErrors?: Dispatch<SetStateAction<FormGroupError[]>>;
    formControl?: (params: FormControlCbParams<Value>) => JSX.Element;
}

const FormGroup = <Value = any,>(
    {
        type = 'text',
        value,
        name,
        onChange,
        onBlur,
        label,
        inputId,
        formControl,
        placeholder = '',
        classNames = {},
        errors = [],
        setErrors,
        style,
        disabled = false,
    }: FormGroupProps<Value>,
    formGroupNode: ForwardedRef<HTMLDivElement>
) => {
    const error = errors.find((error) => error.value === name);
    const errorMessage = error?.message;

    const onInputChange = (value: any) => {
        setErrors &&
            errors?.some((error) => error.value === name) &&
            setErrors((state) => state.filter((err) => err.value !== name));
        onChange(
            value?.nativeEvent instanceof Event
                ? value.currentTarget.value
                : value
        );
    };

    const helpAreaClassName = classnames(
        styles.formGroup__helpArea,
        classNames.helpArea
    );
    const helpAreaComponent = (
        <div className={helpAreaClassName} help-area="true">
            {typeof errorMessage === 'string' ? errorMessage : errorMessage}
        </div>
    );

    const formGroupClassName = classnames(
        styles.formGroup,
        classNames.container,
        {
            [styles.formGroup_error]: Boolean(errorMessage),
        }
    );
    const formGroupControlClassName = classnames(
        styles.formGroup__control,
        classNames.control
    );
    return (
        <div ref={formGroupNode} className={formGroupClassName} style={style}>
            {typeof label === 'string' ? (
                <label className={classNames.label} htmlFor={inputId}>
                    {label}
                </label>
            ) : (
                label
            )}
            {formControl ? (
                formControl({
                    error: errorMessage,
                    helpAreaComponent,
                    onChange: onInputChange,
                    classNames: {
                        control: formGroupControlClassName,
                        input: classNames.input,
                    },
                })
            ) : (
                <div className={formGroupControlClassName}>
                    <input
                        disabled={disabled}
                        id={inputId}
                        name={name}
                        onBlur={onBlur}
                        type={type}
                        onChange={onInputChange}
                        value={value as any}
                        placeholder={placeholder}
                        className={classNames.input}
                    />
                    {helpAreaComponent}
                </div>
            )}
        </div>
    );
};

export default forwardRef(FormGroup) as typeof FormGroup;
