import { useEffect, useState } from 'react'
import { MdMenu, MdSearch, MdClose, MdTune, MdArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { getAnime, reset } from '../features/gogoanime/gogoSearchSlice';


function TopBar() {


    const { user } = useSelector((state: RootState) => state.auth);
    const { animeSearch, isLoading, isSuccess } = useSelector((state: RootState) => state.gogosearch);

    // console.log(user);
    const { width } = useWindowDimensions();
    const [openNav, setOpenNav] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);


    const [search, setSearch] = useState('');
    const [searchTab, setSearchTab] = useState(false);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        setSearchTab(false);
        setOpenNav(false);
        setOpenSearch(false);
        setActiveSearch(false);
        setOpenDropDown(false);
    }, [])

    const searchTitle = async (e: any) => {

        setSearch(() => (
            e.target.name = e.target.value
        ));
        console.log(e.target.value.length);
        // if (e.target.value.length >= 2) {


        const title = e.target.value.replace(/ /g, '+').toLowerCase();
        const url = {
            title: title,
            page: 1,
        }
        if (title.length >= 2) {
            dispatch(getAnime(url));
        }
        // }

        // const searchResult = getAnime(url);
    }
    useEffect(() => {
        if (search.length < 2 && isSuccess) {
            dispatch(reset());
        }
    }, [search, isSuccess])


    if (user) {
        return (
            <div className="flex">
                {
                    (width < 640) ?
                        (
                            <div className="flex items-center justify-between px-5 w-screen bg-base-300 h-14">
                                {/* logo */}
                                {!openSearch && <div className={`flex items-center origin-left`}>
                                    <svg width="40" height="22" viewBox="0 0 98 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22.831 8.47856C23.2611 8.47856 23.6585 8.70862 23.8736 9.0821L32.1843 23.5139C32.6478 24.3188 33.8063 24.3186 34.2696 23.5137L37.7602 17.4488C37.9753 17.0752 37.9752 16.6148 37.7599 16.2413C34.758 11.0318 31.7561 5.81821 28.7541 0.604512C28.5391 0.231088 28.1418 0.00100576 27.7118 0.000909315C18.8771 -0.00107227 10.0406 0.000761019 1.20571 0.00103902C0.278896 0.00106818 -0.300329 1.00721 0.163134 1.81207C10.0238 18.9361 19.8844 36.0622 29.743 53.1863C30.2064 53.9911 31.3649 53.9911 31.8282 53.1863L39.5043 39.8533C39.9677 39.0484 41.1262 39.0484 41.5896 39.8533L49.2656 53.1863C49.729 53.9912 50.8875 53.9912 51.3509 53.1863L80.9331 1.81206C81.3966 1.00721 80.8174 0.00107313 79.8906 0.00107313H72.9073C72.4772 0.00107313 72.0797 0.231182 71.8647 0.604719L51.3533 36.2313C50.8899 37.0362 49.7314 37.0362 49.268 36.2313L45.7775 30.1685C45.5625 29.7949 45.5625 29.3347 45.7775 28.9612L61.4083 1.81198C61.8717 1.00713 61.2924 0.00107313 60.3657 0.00107313H53.3845C52.9545 0.00107313 52.5571 0.231091 52.342 0.604514C45.5027 12.4787 38.6675 24.355 31.8305 36.2314C31.3672 37.0363 30.2087 37.0363 29.7453 36.2315L14.8075 10.2895C14.344 9.48468 14.9233 8.47856 15.8501 8.47856H22.831Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M89.8077 0.00142641C89.3776 0.00142641 88.9801 0.231536 88.7651 0.605075L58.4922 53.1869C58.0289 53.9917 58.608 54.9977 59.5348 54.9978L93.2658 55C93.6965 55 94.0944 54.7693 94.3093 54.395L97.8377 48.2476C98.2997 47.4427 97.7204 46.4381 96.7943 46.4381H74.2251C73.2983 46.4381 72.7191 45.432 73.1825 44.6271L97.8337 1.81235C98.2971 1.0075 97.7178 0.00142641 96.7911 0.00142641H89.8077Z" fill="#44C1E9" />
                                        <path d="M45.7775 45.9083L71.868 0.600982C72.0831 0.229604 72.479 0.00107313 72.9073 0.00107313H79.9558C80.881 0.00107313 81.4593 1.00532 80.9969 1.8089L51.4027 53.2351C50.9397 54.0397 49.7814 54.0388 49.3196 53.2335L45.7158 46.9484C45.5015 46.5748 45.5616 46.281 45.7775 45.9083Z" fill="#44C1E9" />
                                    </svg>
                                    <div className="font-mont text-[24px] ml-3 font-bold flex gap-2">
                                        <h2 className="text-white ">Weeb</h2>
                                        <div className="text-primary">List</div>
                                    </div>
                                </div>}

                                {/* search bar */}
                                {openSearch &&
                                    <div className="relative flex items-center h-8 w-full">
                                        <MdSearch className={`w-5 h-5 absolute ml-3 pointer-events-none ${activeSearch ? "text-neutral" : "text-neutral-focus"}`} />
                                        <input
                                            type="text"
                                            placeholder="Search ..."
                                            className="bg-base-200 opSearch input  flex items-center w-full h-full max-w-xs pl-10 border-none focus:border-none focus:outline-none text-neutral font-semibold placeholder:text-neutral-focus "
                                            onFocus={(e) => {
                                                setActiveSearch(!activeSearch);
                                                setSearchTab(true);
                                            }}

                                            onBlur={(e) => {
                                                setActiveSearch(!activeSearch);
                                                console.log("here");
                                            }}
                                            onChange={searchTitle}
                                            value={search}
                                            autoFocus />
                                        {searchTab ?
                                            <div className="absolute w-full top-[50px] z-40 px-2 bg-neutral-focus rounded-md text-xs"
                                            >
                                                {isLoading ? <div className="p-2 text-white">Loading...</div> : ""}
                                                {!isLoading && animeSearch.results && animeSearch.results.slice(0, 6).map((item: any) => (
                                                    <a href={`/anime/${item.id}`} key={item.id} className="" onClick={() => {
                                                        setSearch('');
                                                        dispatch(reset());
                                                        setOpenSearch(!openSearch);
                                                        setSearchTab(!searchTab);
                                                    }}>
                                                        <div className="text-neutral px-2 py-1 my-2 flex hover:bg-primary rounded-md" onClick={() => { setActiveSearch(true) }}>
                                                            <div>
                                                                <img src={item.image} alt="" className="w-[42px] rounded-sm" />
                                                            </div>
                                                            <div className="pl-3 pt-2">
                                                                <div className="font-semibold text-white">
                                                                    {item.title}
                                                                </div>
                                                                <div>
                                                                    {item.releaseDate}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                                {!isLoading && animeSearch.results?.length > 6 &&
                                                    <Link to="/discover">
                                                        <div className="text-primary">
                                                            More Results &#62;&#62;
                                                        </div>
                                                    </Link>
                                                }
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                                }

                                {!openSearch ?
                                    <div className="cursor-pointer" onClick={() => (setOpenSearch(!openSearch))}>
                                        <MdSearch size="28px" className="ml-3 pointer-events-none" />
                                    </div>
                                    :
                                    <div className="cursor-pointer" onClick={() => (setOpenSearch(!openSearch))}>
                                        <MdClose size="28px" className="ml-3 pointer-events-none" />
                                    </div>
                                }


                            </div >
                        )
                        :
                        (
                            <div className="bg-base-300 h-[100px] flex-grow flex items-center ">
                                <div className={`flex w-full justify-center ${width > 860 ? "mr-[50px]" : ""}`}>
                                    <div className=" flex items-center h-11 lg:w-[438px] w-[280px]">
                                        <MdSearch className={`w-5 h-5 absolute ml-3 pointer-events-none ${activeSearch ? "text-neutral" : "text-neutral-focus"}`} />
                                        <input
                                            type="text"
                                            placeholder="Search ..."
                                            className="bg-base-200 opSearch input  flex items-center w-full h-full pl-10 border-none focus:border-none focus:outline-none text-neutral font-semibold placeholder:text-neutral-focus"
                                            onFocus={(e) => { setActiveSearch(!activeSearch) }}

                                            onBlur={(e) => { setActiveSearch(!activeSearch) }}
                                            onChange={searchTitle}
                                            value={search} />

                                    </div>
                                    <Link to={'/discover'} className="flex rounded-lg bg-base-200 px-3 py-2.5 ml-7 ">
                                        <MdTune className="text-neutral" size="24px" />
                                        <div className="pl-2">
                                            <p>Filter</p>
                                        </div>
                                    </Link>
                                </div>

                                {width > 860 &&
                                    (
                                        <div>
                                            <div className="h-[100px] mr-[80px]">
                                                <div className="w-[248px] h-[80px] bg-base-200 right-16 top-0 rounded-b-2xl">
                                                    <div className=" flex items-center text-center h-full mx-7">
                                                        <img src={user.picture} className="rounded-full h-12 w-12 mr-3" alt="" />
                                                        <div className="flex items-center justify-between w-full">
                                                            <div>
                                                                <p className="text-neutral font-medium">{user.name}</p>
                                                            </div>
                                                            <div className={`cursor-pointer ${openDropDown ? "rotate-180 duration-200" : "duration-200"}`} onClick={() => (setOpenDropDown(!openDropDown))}>
                                                                <MdArrowDropDown size="32px" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        )
                }


            </div>
        )

    }
    return (
        <div></div>
    )
}

export default TopBar


