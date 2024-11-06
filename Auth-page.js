import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleToggle = () => setIsLogin(!isLogin);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            alert('Login Successful!');
        } catch (error) {
            alert('Login Failed!');
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) return alert('Passwords do not match!');
        try {
            const response = await axios.post('http://localhost:3001/signup', { username, password, email });
            alert('Signup Successful!');
        } catch (error) {
            alert('Signup Failed!');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            {!isLogin && (
                <>
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </>
            )}
            <button onClick={isLogin ? handleLogin : handleSignup}>
                {isLogin ? 'Login' : 'Signup'}
            </button>
            <button onClick={handleToggle}>
                {isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AuthPage;
