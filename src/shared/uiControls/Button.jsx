import React from 'react';
import MuiButton from '@mui/material/Button';

function Button({
    children,
    onClick,
    type = 'button',
    variant = 'contained',
    color = 'primary'
}){
    return (
        <MuiButton
            type={type}
            onClick={onClick}
            variant={variant}
            color={color}
        >
            {children}
        </MuiButton>
    );
};

export default Button;