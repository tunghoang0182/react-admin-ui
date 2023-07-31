import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // changed useHistory to useNavigate
import "./login.scss"
import { useAuth } from '../../auth/AuthWrapper';





export interface LoginProps {
    onFormSwitch?: (formName: string) => void;
  }

  export const Login = (props: LoginProps) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState(''); // Add this line
    const navigate = useNavigate();

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // Clear the error message before each attempt
        const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        // Login is successful
        console.log('Hello, login successful!');
        try {
            await login(username, data.token); // Use the token from the server
            localStorage.setItem('token', data.token);
            navigate('/'); 
        } catch (err) {
            // If login fails, set the error message
            setError((err as Error).message);
        }
    } else {
        // Handle error
        console.error(data);
        setError('Incorrect Account or Password'); // Set the error message
    }
};

    return(
        <div className="Login">
        <div className="auth-form-container">
            <h2>Login</h2>
            {error && <p>{error}</p>} {/* Display the error message if there is one */}
            <form className="login-form" onSubmit={handelSubmit}>
                <label htmlFor="username">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)}type="password" placeholder="******" id="password" name="password"/>
                <button type="submit" className="login-button">Log In</button>

            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
        </div>
    </div>
    )
}



export default Login
