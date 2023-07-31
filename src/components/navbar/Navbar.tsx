import "./navbar.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthWrapper';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {

        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include your token in the 'Authorization' header
                'Authorization': `Token ${token}`
            },
        });

        if (response.ok) {
            // Logout is successful
            console.log('Logged out successfully!');
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            // Handle error
            const data = await response.json();
            console.error(data);
        }
    };



    return (
        <div className="navbar">
            <div className="logo">
                <img src="solswitch.svg" alt="" />
                <span>{user.name}</span>
            </div>
            <div className="icons">
                <img src="/search.svg" alt="" className="icon" />
                <img src="/app.svg" alt="" className="icon" />
                <img src="/expand.svg" alt="" className="icon" />
                <div className="notification">
                    <img src="/notifications.svg" alt=""/>
                    <span>1</span>
                </div>
                <div className="user">
                    <img
                        src="eric.jpg"
                        alt=""
                    />
                </div>
                <img src="/settings.svg" alt="" className="icon" />
                <button type="submit" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar