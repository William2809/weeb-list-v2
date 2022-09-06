import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import aot from '../assets/coverImage/aot4.jpg';
import callofthenight from '../assets/coverImage/callofthenight.jpg';
import chainsawman from '../assets/coverImage/chainsawman.jpg';
import cote from '../assets/coverImage/cote.jpg';
import demonslayer from '../assets/coverImage/demonslayer.jpg';
import ditf from '../assets/coverImage/ditf.jpg';
import dressupdarling from '../assets/coverImage/dressupdarling.jpg';
import eightysix from '../assets/coverImage/eightysix.jpg';
import horimiya from '../assets/coverImage/horimiya.jpg';
import jujutsu from '../assets/coverImage/jujutsu.jpg';
import kaguuya from '../assets/coverImage/kaguuya.jpg';
import kiminonawa from '../assets/coverImage/kiminonawa.jpg';
import lycoris from '../assets/coverImage/lycoris.jpg';
import muhsoku from '../assets/coverImage/mushoku.jpg';
import naruto from '../assets/coverImage/naruto.jpg';
import sao from '../assets/coverImage/sao.jpg';
import spyxfamily from '../assets/coverImage/spyxfamily.jpg';
import summertime from '../assets/coverImage/summertime.jpg';
import tensura from '../assets/coverImage/tensura.jpg';
import violet from '../assets/coverImage/violet.jpg';
import '../welcome.css';
import { MdArrowForward } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { reset } from '../features/auth/authSlice';
import useWindowDimensions from '../hooks/useWindowDimensions';


function Welcome() {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { user, isSuccess, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/home');
        }

        dispatch(reset());
    }, [isSuccess, user, message, navigate, dispatch]);

    const { width } = useWindowDimensions();

    return (
        <div className="flex justify-center overflow-hidden h-[100vh] relative">

            <div className="absolute h-full w-full top-0 right-0 z-10 flex justify-center items-center overflow-hidden" id="overlayContainer">

                {/* Overlay */}
                <div>
                    <div className="w-screen h-[520px] bg-opacity-95 flex justify-center items-center getStarted">
                        <div>
                            <div className="flex items-center">
                                <div>
                                    <svg width="98" height="55" viewBox="0 0 98 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22.831 8.47856C23.2611 8.47856 23.6585 8.70862 23.8736 9.0821L32.1843 23.5139C32.6478 24.3188 33.8063 24.3186 34.2696 23.5137L37.7602 17.4488C37.9753 17.0752 37.9752 16.6148 37.7599 16.2413C34.758 11.0318 31.7561 5.81821 28.7541 0.604512C28.5391 0.231088 28.1418 0.00100576 27.7118 0.000909315C18.8771 -0.00107227 10.0406 0.000761019 1.20571 0.00103902C0.278896 0.00106818 -0.300329 1.00721 0.163134 1.81207C10.0238 18.9361 19.8844 36.0622 29.743 53.1863C30.2064 53.9911 31.3649 53.9911 31.8282 53.1863L39.5043 39.8533C39.9677 39.0484 41.1262 39.0484 41.5896 39.8533L49.2656 53.1863C49.729 53.9912 50.8875 53.9912 51.3509 53.1863L80.9331 1.81206C81.3966 1.00721 80.8174 0.00107313 79.8906 0.00107313H72.9073C72.4772 0.00107313 72.0797 0.231182 71.8647 0.604719L51.3533 36.2313C50.8899 37.0362 49.7314 37.0362 49.268 36.2313L45.7775 30.1685C45.5625 29.7949 45.5625 29.3347 45.7775 28.9612L61.4083 1.81198C61.8717 1.00713 61.2924 0.00107313 60.3657 0.00107313H53.3845C52.9545 0.00107313 52.5571 0.231091 52.342 0.604514C45.5027 12.4787 38.6675 24.355 31.8305 36.2314C31.3672 37.0363 30.2087 37.0363 29.7453 36.2315L14.8075 10.2895C14.344 9.48468 14.9233 8.47856 15.8501 8.47856H22.831Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M89.8077 0.00142641C89.3776 0.00142641 88.9801 0.231536 88.7651 0.605075L58.4922 53.1869C58.0289 53.9917 58.608 54.9977 59.5348 54.9978L93.2658 55C93.6965 55 94.0944 54.7693 94.3093 54.395L97.8377 48.2476C98.2997 47.4427 97.7204 46.4381 96.7943 46.4381H74.2251C73.2983 46.4381 72.7191 45.432 73.1825 44.6271L97.8337 1.81235C98.2971 1.0075 97.7178 0.00142641 96.7911 0.00142641H89.8077Z" fill="#44C1E9" />
                                        <path d="M45.7775 45.9083L71.868 0.600982C72.0831 0.229604 72.479 0.00107313 72.9073 0.00107313H79.9558C80.881 0.00107313 81.4593 1.00532 80.9969 1.8089L51.4027 53.2351C50.9397 54.0397 49.7814 54.0388 49.3196 53.2335L45.7158 46.9484C45.5015 46.5748 45.5616 46.281 45.7775 45.9083Z" fill="#44C1E9" />
                                    </svg>
                                </div>

                                <div className="px-3.5">
                                    <svg width="8" height="65" viewBox="0 0 8 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.5" width="8" height="64" fill="#B5CDF5" />
                                    </svg>
                                </div>

                                <div className="font-mont text-[36px] xs:text-[40px] lg:text-[64px]  font-bold flex gap-2">
                                    <h2 className="text-white ">Weeb</h2>
                                    <div className="text-primary">List</div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-mont text-white text-1xl font-bold">The Best place to find <a className="text-primary">Anime</a></p>
                            </div>
                            <div className="flex justify-center mt-5">
                                <Link to="/sign-in">
                                    <button className="flex items-center btn-secondary rounded-xl font-semibold  text-white text-[24px] xs:text-[32px] px-4 xs:px-6 xs:py-2">Get Started <MdArrowForward size={`${width < 500 ? "40px" : "48px"}`} className='pl-2' /> </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center xl:mr-6" id="largeLayout">
                <div>
                    <div className="flex items-center">
                        <div>
                            <svg width="98" height="55" viewBox="0 0 98 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.831 8.47856C23.2611 8.47856 23.6585 8.70862 23.8736 9.0821L32.1843 23.5139C32.6478 24.3188 33.8063 24.3186 34.2696 23.5137L37.7602 17.4488C37.9753 17.0752 37.9752 16.6148 37.7599 16.2413C34.758 11.0318 31.7561 5.81821 28.7541 0.604512C28.5391 0.231088 28.1418 0.00100576 27.7118 0.000909315C18.8771 -0.00107227 10.0406 0.000761019 1.20571 0.00103902C0.278896 0.00106818 -0.300329 1.00721 0.163134 1.81207C10.0238 18.9361 19.8844 36.0622 29.743 53.1863C30.2064 53.9911 31.3649 53.9911 31.8282 53.1863L39.5043 39.8533C39.9677 39.0484 41.1262 39.0484 41.5896 39.8533L49.2656 53.1863C49.729 53.9912 50.8875 53.9912 51.3509 53.1863L80.9331 1.81206C81.3966 1.00721 80.8174 0.00107313 79.8906 0.00107313H72.9073C72.4772 0.00107313 72.0797 0.231182 71.8647 0.604719L51.3533 36.2313C50.8899 37.0362 49.7314 37.0362 49.268 36.2313L45.7775 30.1685C45.5625 29.7949 45.5625 29.3347 45.7775 28.9612L61.4083 1.81198C61.8717 1.00713 61.2924 0.00107313 60.3657 0.00107313H53.3845C52.9545 0.00107313 52.5571 0.231091 52.342 0.604514C45.5027 12.4787 38.6675 24.355 31.8305 36.2314C31.3672 37.0363 30.2087 37.0363 29.7453 36.2315L14.8075 10.2895C14.344 9.48468 14.9233 8.47856 15.8501 8.47856H22.831Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M89.8077 0.00142641C89.3776 0.00142641 88.9801 0.231536 88.7651 0.605075L58.4922 53.1869C58.0289 53.9917 58.608 54.9977 59.5348 54.9978L93.2658 55C93.6965 55 94.0944 54.7693 94.3093 54.395L97.8377 48.2476C98.2997 47.4427 97.7204 46.4381 96.7943 46.4381H74.2251C73.2983 46.4381 72.7191 45.432 73.1825 44.6271L97.8337 1.81235C98.2971 1.0075 97.7178 0.00142641 96.7911 0.00142641H89.8077Z" fill="#44C1E9" />
                                <path d="M45.7775 45.9083L71.868 0.600982C72.0831 0.229604 72.479 0.00107313 72.9073 0.00107313H79.9558C80.881 0.00107313 81.4593 1.00532 80.9969 1.8089L51.4027 53.2351C50.9397 54.0397 49.7814 54.0388 49.3196 53.2335L45.7158 46.9484C45.5015 46.5748 45.5616 46.281 45.7775 45.9083Z" fill="#44C1E9" />
                            </svg>
                        </div>

                        <div className="px-3.5">
                            <svg width="8" height="65" viewBox="0 0 8 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="8" height="64" fill="#B5CDF5" />
                            </svg>
                        </div>

                        <div className="font-mont text-[56px] lg:text-[56px]  font-bold flex gap-2">
                            <h2 className="text-white ">Weeb</h2>
                            <div className="text-primary">List</div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-mont text-white text-1xl font-bold">The Best place to find <a className="text-primary">Anime</a></p>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Link to="/sign-in">
                            <button className="flex items-center btn-secondary rounded-xl font-semibold  text-white text-[32px] px-6 py-2">Get Started <MdArrowForward size="48px" className='pl-2' /> </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex mx-4">
                    {/* <Link to="/sign-up">Get Started!</Link> */}
                    <section className="wSection">
                        <div className="slider">
                            <div className="slider-track">
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />


                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />

                            </div>
                        </div>
                    </section>
                    <section className="wSection">
                        <div className="slider">
                            <div className="slider-trackRev">
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />


                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />

                            </div>
                        </div>
                    </section>
                    <section className="wSection">
                        <div className="slider">
                            <div className="slider-track">
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />

                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                            </div>
                        </div>
                    </section>
                    <section className="wSection" id="xs">
                        <div className="slider">
                            <div className="slider-trackRev">
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />

                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                            </div>
                        </div>
                    </section>
                    <section className="wSection" id="sm">
                        <div className="slider">
                            <div className="slider-track">
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />

                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                            </div>
                        </div>
                    </section>

                    <section className="wSection" id="md">
                        <div className="slider">
                            <div className="slider-track">
                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />

                                <img className="wImg" src={sao} alt="pict" />
                                <img className="wImg" src={kiminonawa} alt="pict" />
                                <img className="wImg" src={naruto} alt="pict" />
                                <img className="wImg" src={ditf} alt="pict" />
                                <img className="wImg" src={aot} alt="pict" />
                                <img className="wImg" src={spyxfamily} alt="pict" />
                                <img className="wImg" src={callofthenight} alt="pict" />
                                <img className="wImg" src={dressupdarling} alt="pict" />
                                <img className="wImg" src={cote} alt="pict" />
                                <img className="wImg" src={violet} alt="pict" />
                                <img className="wImg" src={muhsoku} alt="pict" />
                                <img className="wImg" src={eightysix} alt="pict" />
                                <img className="wImg" src={summertime} alt="pict" />
                                <img className="wImg" src={demonslayer} alt="pict" />
                                <img className="wImg" src={kaguuya} alt="pict" />
                                <img className="wImg" src={lycoris} alt="pict" />
                                <img className="wImg" src={horimiya} alt="pict" />
                                <img className="wImg" src={tensura} alt="pict" />
                                <img className="wImg" src={jujutsu} alt="pict" />
                                <img className="wImg" src={chainsawman} alt="pict" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Welcome