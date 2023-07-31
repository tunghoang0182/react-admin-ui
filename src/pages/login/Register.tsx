import "./login.scss"
import { LoginProps } from './Login';
import { useNavigate } from "react-router-dom"; 
import React, {useState, useEffect} from "react";

export const Register = (props: LoginProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState({username: '', email: ''}); // Change this line
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/users/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
    
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            // Registration is successful
            console.log('Registration successful!');
            // navigate('/login'); 
            setSuccess('Registered successfully! Redirecting to login page...'); 
        } else {
            // Handle error
            console.error(data);
            setError({username: data.username ? data.username[0] : '', email: data.email ? data.email[0] : ''});
        }
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 5000);
            return () => clearTimeout(timer); // This will clear the timeout if the component is unmounted before the timeout finishes
        }
    }, [success, navigate]);

    return(
        <div className="Register">
        <div className="auth-form-container">
        {success && <p>{success}</p>}
        {error.username && <p>{error.username}</p>} {/* Display the error message if there is one */}
        {error.email && <p>{error.email}</p>} {/* Display the error message for email if there is one */}
        <form className="register-form"  onSubmit={handelSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} name="email" id="email" placeholder="youremail@example.com" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="username">username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username"/>
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>
            <button type="submit" className="login-button">Register</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
        </div>
        </div>
    )
}


export default Register