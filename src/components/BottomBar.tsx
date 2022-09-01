import React from 'react'
import { MdHome, MdEvent, MdExplore, MdVideoLibrary, MdSystemUpdateAlt, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'

function BottomBar() {

    const homeIcon = () => { return <MdHome size="32px" className="mx-2.5" /> }
    const scheduleIcon = () => { return <MdEvent size="32px" className="mx-2.5" /> }
    const discoverIcon = () => { return <MdExplore size="32px" className="mx-2.5" /> }
    const watclistIcon = () => { return <MdVideoLibrary size="32px" className="mx-2.5" /> }
    const downloadIcon = () => { return <MdSystemUpdateAlt size="32px" className="mx-2.5" /> }
    const settingIcon = () => { return <MdSettings size="32px" className="mx-2.5" /> }

    const Components = [homeIcon(), scheduleIcon(), discoverIcon(), watclistIcon(), downloadIcon(), settingIcon()];

    //key word for navbar
    const menus = [
        { title: "Home", destination: "/home" },
        { title: "Schedule", destination: "/schedule" },
        { title: "Discover", destination: "/discover" },
        { title: "Watchlist", destination: "/watchlist" },
        { title: "Download", destination: "/download" },
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
        else if (index === 4 && (window.location.pathname === "/download")) {
            return true;
        }
        else if (index === 5 && (window.location.pathname === "/setting")) {
            return true;
        }
    }


    //measure width screen
    const { width } = useWindowDimensions();

    return (
        <div>
            {(width < 640) &&
                <div className=" fixed bottom-0 z-20 px-5 h-[88px] bg-base-300 w-full flex items-center">
                    <ul className="flex justify-between w-full">
                        {menus.map((menu, index) => (
                            <Link key={index} to={`${index !== (menus.length) ? menu.destination : ''}`}>
                                <li className={` font-semibold rounded-md flex items-center justify-center  cursor-pointer h-[60px] w-[72px] hover:bg-secondary hover:text-white ${activeNav(index) ? ("bg-secondary text-white") : "text-neutral-focus"}`}>
                                    <div className="flex flex-col justify-center items-center">
                                        {Components[index]}
                                        <span className="duration-200 text-xs pt-1">
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
}

export default BottomBar