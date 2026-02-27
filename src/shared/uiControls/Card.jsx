import React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

function Card({
    title,
    children,
    actions,
}){
    return (
        <MuiCard
          sx={{
            maxWidth: 400,
            margin: '50px auto',
            padding: 2,
            boxShadow: 3,
          }}
        >
            {title && (
                <Typography variant='h5' gutterBottom>
                    {title}
                </Typography>
            )}

            <CardContent>
                {children}
            </CardContent>

            <CardActions>
                {actions}
            </CardActions>
        </MuiCard>
    );
}

export default Card;