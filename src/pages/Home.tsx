import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../app/store';
import { logout, reset } from '../features/auth/authSlice';

import LatestRelease from '../components/animes/LatestRelease';

function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { user } = useSelector((state: RootState) => state.auth);

    const [menu1, setMenu1] = useState(true);
    const [menu2, setMenu2] = useState(false);
    const [menu3, setMenu3] = useState(false);
    const [menu4, setMenu4] = useState(false);

    const tabActive = (menu: number) => {

        if (menu === 1 && menu1) {
            return true;
        }
        if (menu === 2 && menu2) {
            return true;
        }
        if (menu === 3 && menu3) {
            return true;
        }
        if (menu === 4 && menu4) {
            return true;
        }

        return false;
    }


    const currTab = (menu: number) => {
        if (menu === 1) {
            setMenu1(true);
            setMenu2(false);
            setMenu3(false);
            setMenu4(false);
        }
        else if (menu === 2) {
            setMenu1(false);
            setMenu2(true);
            setMenu3(false);
            setMenu4(false);
        }
        else if (menu === 3) {
            setMenu1(false);
            setMenu2(false);
            setMenu3(true);
            setMenu4(false);
        }
        else if (menu === 4) {
            setMenu1(false);
            setMenu2(false);
            setMenu3(false);
            setMenu4(true);
        }

    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/sign-in');
    }

    return (
        <div className="w-full px-5">
            {/* Top banner */}
            <div className="w-full flex">
                <div className='w-full bg-neutral h-[200px] mt-3 rounded-xl'>

                </div>
            </div>
            {/* content */}
            <div className='pt-4'>
                {/* menu */}
                <div className="flex justify-around items-center">
                    <div onClick={() => currTab(1)} className={`flex justify-center items-center rounded-lg w-[110px] h-[32px]  text-white font-semibold text-[14px] ${tabActive(1) ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                        Latest Release
                    </div>
                    <div onClick={() => currTab(2)} className={`flex justify-center items-center rounded-lg w-[110px] h-[32px]  text-white font-semibold text-[14px] ${tabActive(2) ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                        Popular
                    </div>
                    <div onClick={() => currTab(3)} className={`flex justify-center items-center rounded-lg w-[110px] h-[32px]  text-white font-semibold text-[14px] ${tabActive(3) ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                        Movie
                    </div>
                    <div onClick={() => currTab(4)} className={`flex justify-center items-center rounded-lg w-[110px] h-[32px]  text-white font-semibold text-[14px] ${tabActive(4) ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                        Movie
                    </div>
                </div>
            </div>
            {/* movie list */}
            {
                menu1 && <LatestRelease />
            }


        </div>
    )
}

export default Home