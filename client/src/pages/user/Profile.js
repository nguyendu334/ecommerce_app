import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Profile = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile updated successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    return (
        <Layout title={'Profile'}>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register">
                            <h1 className="title">User Profile</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        placeholder="Phone"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        placeholder="Address"
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
