import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.scss"
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post('/auth/register', {
                username: username,
                email: email,
                password: password,
                // or username, email, password in ES6
            });
            res.data && window.location.replace('/login');
        }
        catch (err) {
            setError(true);
        }       
    }

    return (
        <div className="register">
            <div className="wrapper">
            <span className="registerTitle">Register</span>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                    <input
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}                   
                    />
                <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <button>Register</button>
            </form>
                <button><Link to="/login">Login</Link></button>
               {error && <span className="warning">Something went wrong!</span>} 
        </div>
    </div>
    )
}