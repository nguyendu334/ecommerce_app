import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Badge } from 'antd';
import { useAuth } from '../../context/auth';
import SearchInput from './../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        toast.success('Logged out successfully');
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand">
                            🛒 Ecommerce App
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    to={'/'}
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Category
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/categories`}>
                                            All Category
                                        </Link>
                                    </li>
                                    {categories?.map((category) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${category.slug}`}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${
                                                        auth?.user?.role === 1 ? 'admin' : 'user'
                                                    }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Badge count={cart?.length}>
                                    <NavLink to="/cart" className="nav-link">
                                        <img
                                            src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
                                            alt="cart"
                                            style={{ height: '30px' }}
                                        />
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
