import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import "../../styles/AuthStyles.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Login - Ecommerce App'}>
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/forgot-password');
                        }}
                        style={{
                            border: 'none',
                            background: 'none',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            marginBottom: '10px',
                            marginLeft: '280px',
                        }}
                    >
                        Forgot Password?
                    </button>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-outline-primary rounded">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
