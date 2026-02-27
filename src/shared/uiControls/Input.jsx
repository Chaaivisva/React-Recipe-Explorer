import React from 'react';
import TextField from '@mui/material/TextField';

function Input({
    type= 'text',
    placeholder = '',
    value,
    onChange,
    label,
    ...rest
}){
    return(
        <TextField
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            label={label}
            {...rest}
        />

    );
};

export default Input;