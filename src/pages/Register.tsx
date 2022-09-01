import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import Google from "../features/auth/GoogleAuth";

function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const [passwordType, setPasswordType] = useState("password");
    const [errorMessage, setErrorMessage] = useState("");

    const { username, email, password, passwordConfirmation } = formData;

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isError) {
            setErrorMessage(message);
        }

        if (isSuccess || user) {
            navigate('/home');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        }
        else {
            setPasswordType("password");
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setErrorMessage("Password and Password Confirmation do not match");
        }
        else {
            setErrorMessage("");
            const userData = {
                username,
                email,
                password,
            }

            dispatch(register(userData));
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-100 ">
            <div className="font-poppins flex lg:flex-row flex-col lg:justify-between xl:w-[1216px] lg:w-[950px] w-[400px] items-center" >
                <div className="flex items-center ">
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

                            <div className="font-mont lg:text-[64px] text-5xl  font-bold flex gap-2">
                                <h2 className="text-white ">Sign</h2>
                                <div className="text-primary">Up</div>
                            </div>
                        </div>

                        <div className="pt-5 text-center">
                            <p className="text-white lg:text-base text-sm lg:font-medium font-normal">Already have an account?
                                <Link to={'/sign-in'} className="text-primary text- underline"> Sign In here</Link>
                                .</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[520px] w-[400px] lg:mt-0 mt-6">
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className="lg:mb-4 mb-2">
                                <p className="text-neutral font-semibold mb-1 text-base">Username</p>
                                <input type="text" name="username" id="username" value={username} onChange={onChange} placeholder="Choose a username" className="input input-bordered rounded-xl bg-neutral-focus w-full placeholder:font-medium lg:h-14 h-10" required />
                            </div>
                            <div className="lg:mb-4 mb-2">
                                <p className="text-neutral font-semibold mb-1 text-base">Email</p>
                                <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder="Enter your email" className="input input-bordered rounded-xl bg-neutral-focus w-full placeholder:font-medium lg:h-14 h-10" required />
                            </div>
                            <div className="lg:mb-4 mb-2">
                                <p className="text-neutral font-semibold mb-1 text-base">password</p>
                                <div className="relative flex items-center">
                                    <input type={passwordType} name="password" id="password" value={password} onChange={onChange} placeholder="Enter your password" className="input input-bordered rounded-xl bg-neutral-focus w-full placeholder:font-medium lg:h-14 h-10" required />
                                    {
                                        <span onClick={togglePassword}>
                                            {passwordType === "password" ? <MdVisibilityOff className=" absolute transform -translate-y-1/2 right-5" size={18} /> : <MdVisibility className="absolute transform -translate-y-1/2 right-5" size={18} />}
                                        </span>
                                    }
                                </div>
                            </div>
                            <div>
                                <p className="text-neutral font-semibold mb-1 text-base">Password Confirmation</p>
                                <div className="relative flex items-center">
                                    <input type={passwordType} name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={onChange} placeholder="Re-Enter your password" className="input input-bordered rounded-xl bg-neutral-focus w-full placeholder:font-medium lg:h-14 h-10" required />
                                    {
                                        <span onClick={togglePassword}>
                                            {passwordType === "password" ? <MdVisibilityOff className=" absolute transform -translate-y-1/2 right-5" size={18} /> : <MdVisibility className="absolute transform -translate-y-1/2 right-5" size={18} />}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>

                        {errorMessage ? <div className="alert alert-error mt-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className=" stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errorMessage}</span>
                            </div>
                        </div> : null}

                        <div className="flex flex-col gap-2.5 mt-8 lg:mt-10">
                            <button type="submit" className="rounded-xl bg-primary hover:bg-primary-focus w-full lg:h-14 h-10 font-semibold text-white text-base">Sign Up</button>
                            <div className="flex justify-between items-center text-neutral font-semibold">
                                <svg className='stroke-neutral' width="232" height="1" viewBox="0 0 232 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="0.5" x2="232" y2="0.5" />
                                </svg>

                                <p>
                                    Or
                                </p>
                                <svg className='stroke-neutral' width="232" height="1" viewBox="0 0 232 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="0.5" x2="232" y2="0.5" />
                                </svg>
                            </div>
                            <div className='rounded-xl bg-white flex justify-center items-center hover:bg-neutral-focus hover:text-white w-full lg:h-14 h-10 font-medium text-neutral-focus text-base gap-2'>
                                {!user &&
                                    <Google.GoogleAuth></Google.GoogleAuth>
                                }
                            </div>

                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Register;