import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/authService';
import Input from '../shared/uiControls/Input';
import Button from '../shared/uiControls/Button';
import CustomCard from '../shared/uiControls/Card';

function Login(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        const success = login(username, email, password);
        if (success) {
            navigate('/dashboard');
            return true;
        }else{
            alert('Invalid credentials. Please try again.');
        }
    };

    return (  
        <CustomCard
            title='Login'
            actions={
                <><Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button><Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/register')}
                >
                        Register
                    </Button></>
            }
        >   
            <Input
                label="Username"
                value={username}    
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

        </CustomCard>   

    );
}

export default Login;