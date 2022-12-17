import React, { useState } from 'react'
import { MdMenu, MdHome, MdEvent, MdExplore, MdVideoLibrary, MdSettings, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { logout, reset } from '../features/auth/authSlice';
import useWindowDimensions from '../hooks/useWindowDimensions';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

function SideBar({ children }: any) {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { user } = useSelector((state: RootState) => state.auth);
    const { height, width } = useWindowDimensions();

    //function for navbar icon
    const homeIcon = () => { return <MdHome size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }
    const scheduleIcon = () => { return <MdEvent size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }
    const discoverIcon = () => { return <MdExplore size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }
    const watclistIcon = () => { return <MdVideoLibrary size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }
    const settingIcon = () => { return <MdSettings size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }
    const logoutIcon = () => { return <MdLogout size={height < 500 ? "28px" : "32px"} className="mx-2.5" /> }

    const Components = [homeIcon(), scheduleIcon(), discoverIcon(), watclistIcon(), settingIcon(), logoutIcon()];
    //key word for navbar
    const menus = [
        { title: "Home", destination: "/home" },
        { title: "Schedule", destination: "/schedule" },
        { title: "Discover", destination: "/discover" },
        { title: "Watchlist", destination: "/watchlist" },
        { title: "Setting", destination: "/setting", gap: true },
        { title: "Logout", },
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

    //log out user
    const onLogout = () => {
        navigate('/');
        dispatch(logout());
        dispatch(reset());
    }
    { (width <= 1310 && open) && setOpen(!open) }

    return (
        <div className={`flex overflow-clip scrollbar-thin ${user ? "" : "hidden"} `}>
            {
                (width >= 640 && height >= 500) &&
                (<div className={`${open ? "w-[332px]" : "w-[92px]"} duration-200 h-screen bg-base-300 pt-7 px-5 sticky top-0`}>
                    <div className='flex gap-x-2 items-center'>
                        <MdMenu size="32px" className={`mx-2.5 cursor-pointer duration-300 absolute ${open && "rotate-[270deg]"}`} onClick={() => setOpen(!open)} />
                        <div className={`flex items-center ml-14 origin-left duration-200 ${!open && "scale-0"}`}>
                            <svg width="54" height="30" viewBox="0 0 98 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.831 8.47856C23.2611 8.47856 23.6585 8.70862 23.8736 9.0821L32.1843 23.5139C32.6478 24.3188 33.8063 24.3186 34.2696 23.5137L37.7602 17.4488C37.9753 17.0752 37.9752 16.6148 37.7599 16.2413C34.758 11.0318 31.7561 5.81821 28.7541 0.604512C28.5391 0.231088 28.1418 0.00100576 27.7118 0.000909315C18.8771 -0.00107227 10.0406 0.000761019 1.20571 0.00103902C0.278896 0.00106818 -0.300329 1.00721 0.163134 1.81207C10.0238 18.9361 19.8844 36.0622 29.743 53.1863C30.2064 53.9911 31.3649 53.9911 31.8282 53.1863L39.5043 39.8533C39.9677 39.0484 41.1262 39.0484 41.5896 39.8533L49.2656 53.1863C49.729 53.9912 50.8875 53.9912 51.3509 53.1863L80.9331 1.81206C81.3966 1.00721 80.8174 0.00107313 79.8906 0.00107313H72.9073C72.4772 0.00107313 72.0797 0.231182 71.8647 0.604719L51.3533 36.2313C50.8899 37.0362 49.7314 37.0362 49.268 36.2313L45.7775 30.1685C45.5625 29.7949 45.5625 29.3347 45.7775 28.9612L61.4083 1.81198C61.8717 1.00713 61.2924 0.00107313 60.3657 0.00107313H53.3845C52.9545 0.00107313 52.5571 0.231091 52.342 0.604514C45.5027 12.4787 38.6675 24.355 31.8305 36.2314C31.3672 37.0363 30.2087 37.0363 29.7453 36.2315L14.8075 10.2895C14.344 9.48468 14.9233 8.47856 15.8501 8.47856H22.831Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M89.8077 0.00142641C89.3776 0.00142641 88.9801 0.231536 88.7651 0.605075L58.4922 53.1869C58.0289 53.9917 58.608 54.9977 59.5348 54.9978L93.2658 55C93.6965 55 94.0944 54.7693 94.3093 54.395L97.8377 48.2476C98.2997 47.4427 97.7204 46.4381 96.7943 46.4381H74.2251C73.2983 46.4381 72.7191 45.432 73.1825 44.6271L97.8337 1.81235C98.2971 1.0075 97.7178 0.00142641 96.7911 0.00142641H89.8077Z" fill="#44C1E9" />
                                <path d="M45.7775 45.9083L71.868 0.600982C72.0831 0.229604 72.479 0.00107313 72.9073 0.00107313H79.9558C80.881 0.00107313 81.4593 1.00532 80.9969 1.8089L51.4027 53.2351C50.9397 54.0397 49.7814 54.0388 49.3196 53.2335L45.7158 46.9484C45.5015 46.5748 45.5616 46.281 45.7775 45.9083Z" fill="#44C1E9" />
                            </svg>
                            <div className="font-mont text-[32px] ml-3 font-bold flex gap-2">
                                <h2 className="text-white ">Weeb</h2>
                                <div className="text-primary">List</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100vh-76px)] pt-8 flex flex-col justify-between">
                        <ul className="flex flex-col">
                            {menus.map((menu, index) => (
                                (index < 4) &&
                                (<Link key={index} to={`${index !== (menus.length - 1) ? menu.destination : ''}`}>
                                    <li className={` font-semibold text-xl rounded-md flex items-center gap-x-5  cursor-pointer h-[52px] hover:bg-secondary hover:text-white ${menu.gap ? "mt-3 bottom-0" : "mt-3"} ${activeNav(index) ? ("bg-secondary text-white") : "text-neutral-focus"}`} onClick={(index === (menus.length - 1) ? onLogout : undefined)}>
                                        <div className="">
                                            {Components[index]}
                                        </div>
                                        <span className={`${!open && 'hidden'} origin-left duration-200`}>
                                            {menu.title}
                                        </span>
                                    </li>
                                </Link>)
                            ))}
                        </ul>
                        <ul className="flex flex-col pb-8">
                            {menus.map((menu, index) => (
                                (index >= 4) &&
                                (<Link key={index} to={`${index !== (menus.length - 1) ? menu.destination : ''}`}>
                                    <li className={` font-semibold text-xl rounded-md flex items-center gap-x-5  cursor-pointer h-[52px] hover:bg-secondary hover:text-white ${menu.gap ? "mt-3 bottom-0" : "mt-3"} ${activeNav(index) ? ("bg-secondary text-white") : "text-neutral-focus"}`} onClick={(index === (menus.length - 1) ? onLogout : undefined)}>
                                        <div className="">
                                            {Components[index]}
                                        </div>
                                        <span className={`${!open && 'hidden'} origin-left duration-200`}>
                                            {menu.title}
                                        </span>
                                    </li>
                                </Link>)
                            ))}
                        </ul>
                    </div>
                </div >)
            }
            {
                (height < 500 && width >= 640) &&
                (<div className="h-screen bg-base-300 px-2 pt-3 sticky top-0 ">
                    <ul className="flex flex-col h-screen ">
                        {menus.map((menu, index) => (
                            (index < 5) &&
                            (<Link key={index} to={`${index !== (menus.length - 1) ? menu.destination : ''}`}>
                                <li className={` font-semibold text-xl rounded-md flex items-center gap-x-5  cursor-pointer h-[40px] hover:bg-secondary hover:text-white my-2 ${activeNav(index) ? ("bg-secondary text-white") : "text-neutral-focus"}`} onClick={(index === (menus.length - 1) ? onLogout : undefined)}>
                                    <div className="">
                                        {Components[index]}
                                    </div>
                                </li>
                            </Link>)
                        ))}
                    </ul>
                </div >)
            }
            <div className={`flex-grow w-[0px]`}>
                <TopBar></TopBar>

                {children}

                <BottomBar></BottomBar>
            </div>
        </div>
    )
}

export default SideBar