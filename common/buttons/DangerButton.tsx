import { FC } from 'react';
import Button, { ButtonProps, BUTTON_TYPES } from './Button';

const DangerButton: FC<Omit<ButtonProps, 'type'>> = (props) => (
    <Button {...props} type={BUTTON_TYPES.DANGER} />
);

export default DangerButton;
