import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './services/authService';
import Input from '../shared/uiControls/Input';
import Button from '../shared/uiControls/Button';
import CustomCard from '../shared/uiControls/Card';

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        const success = register(username, email, password);
        if(success){
            navigate('/login');
            alert('Registration successful! Please login.');

        } else {
            alert('Registration failed. Please try again.');
        }
    };

    return(
        <CustomCard
            title='Register'
            actions={
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                >   
                    Register
                </Button>
            } 
        >
            <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />  
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <Input  
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
        </CustomCard>
    );
}

export default Register;