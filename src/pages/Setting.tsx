import React from 'react'
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import SideBar from '../components/SideBar';

function Setting() {
    const themeValues = [
        "mytheme",
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ];

    useEffect(() => {
        themeChange(false);
    });
    return (
        <div className="flex">

            <div>
                <select name="text-primary" data-choose-theme>
                    <option className="text-primary" value="mytheme">Default Value</option>
                    {themeValues.map((value) => (
                        <option className="text-primary" key={value.toLowerCase()} value={value.toLowerCase()}>{value.toLowerCase()}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Setting