import { FC } from 'react';
import Button, { ButtonProps, BUTTON_TYPES } from './Button';

const SuccessButton: FC<Omit<ButtonProps, 'type'>> = (props) => (
    <Button {...props} type={BUTTON_TYPES.SUCCESS} />
);

export default SuccessButton;
