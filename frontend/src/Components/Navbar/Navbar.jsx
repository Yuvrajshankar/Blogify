import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Search } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('/auth/already', { withCredentials: true });
                // console.log(response.data);
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };

        checkLoggedIn();
    }, []);

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/logout", { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <header>
            <div className="logo">
                <Link to='/' style={{ textDecoration: "none", color: "white" }}>
                    <span>Blogify.</span>
                </Link>
            </div>

            <div className="header__search">
                <input type="text" className="header__searchInput" placeholder='Search for Blog...' />
                <Search className='header__searchIcon' />
            </div>

            <div className="options">
                {user ? (
                    <>
                        <Link to="/create" style={{ textDecoration: "none", color: "White" }}>
                            <CreateIcon className='icon write' />
                            <h3 className="write ok">Write blog</h3>
                        </Link>
                        <LogoutIcon className='icon logout' onClick={logout} />
                        <h3 className="login ok logout__text" onClick={logout}>Log out</h3>
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <div className="profile__img">
                                <img src={user.profileImage} alt="profile" />
                            </div>
                        </Link>
                    </>
                ) : (
                    <Link to="/login" style={{ textDecoration: "none", color: "White" }}>
                        <h3 className="login">Log in</h3>
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Navbar;