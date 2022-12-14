import React from 'react'
import { MdHome, MdEvent, MdExplore, MdVideoLibrary, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function BottomBar() {

    const { user } = useSelector((state: RootState) => state.auth);


    const homeIcon = () => { return <MdHome size="32px" className="mx-2.5" /> }
    const scheduleIcon = () => { return <MdEvent size="32px" className="mx-2.5" /> }
    const discoverIcon = () => { return <MdExplore size="32px" className="mx-2.5" /> }
    const watclistIcon = () => { return <MdVideoLibrary size="32px" className="mx-2.5" /> }
    const settingIcon = () => { return <MdSettings size="32px" className="mx-2.5" /> }

    const Components = [homeIcon(), scheduleIcon(), discoverIcon(), watclistIcon(), settingIcon()];

    //key word for navbar
    const menus = [
        { title: "Home", destination: "/home" },
        { title: "Schedule", destination: "/schedule" },
        { title: "Discover", destination: "/discover" },
        { title: "Watchlist", destination: "/watchlist" },
        { title: "Setting", destination: "/setting" },
    ]

    // change nav color in active page
    const activeNav = (index: number) => {
        if (index === 0 && (window.location.pathname === "/home")) {
            return true;
        }
        else if (index === 1 && (window.location.pathname === "/schedule")) {
            return true;
        }
        else if (index === 2 && (window.location.pathname === "/discover")) {
            return true;
        }
        else if (index === 3 && (window.location.pathname === "/watchlist")) {
            return true;
        }
        else if (index === 4 && (window.location.pathname === "/setting")) {
            return true;
        }
        return false;
    }


    //measure width screen
    const { width, height } = useWindowDimensions();
    if (user) {
        return (
            <div>
                {(width < 640 && height > 450) &&
                    <div className=" fixed bottom-0 z-20 px-2 h-[64px] bg-base-300 w-full flex flex-col justify-center items-center">
                        <ul className="flex justify-between w-full">
                            {menus.map((menu, index) => (
                                <Link key={index} to={`${index !== (menus.length) ? menu.destination : ''}`}>
                                    <li className={` font-semibold rounded-md flex items-center justify-center  cursor-pointer h-[60px] w-[72px] hover:text-primary ${activeNav(index) ? (" text-primary") : "text-neutral-focus"}`}>
                                        <div className="flex flex-col justify-center items-center">
                                            {Components[index]}
                                            <span className="duration-200 text-xs font-normal pt-1">
                                                {menu.title}
                                            </span>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default BottomBar