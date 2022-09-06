import React from 'react'
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import SideBar from '../components/SideBar';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Setting() {
    const themeValues = [
        "mytheme",
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    useEffect(() => {
        themeChange(false);
    });



    const onLogout = () => {
        navigate('/');
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <div className="">

            <div>
                <select name="text-primary" data-choose-theme>
                    <option className="text-primary" value="mytheme">Default Value</option>
                    {themeValues.map((value) => (
                        <option className="text-primary" key={value.toLowerCase()} value={value.toLowerCase()}>{value.toLowerCase()}</option>
                    ))}
                </select>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => onLogout()}>Log Out</button>
            </div>
        </div>
    )
}

export default Setting