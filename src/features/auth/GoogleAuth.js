//External imports
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { googleSignIn } from './authSlice';
import { useDispatch } from 'react-redux';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
    });

const GoogleAuth = () => {
    const { width } = useWindowDimensions();

    const widthSize = () => {
        if (width <= 475) {
            return "320px";
        }
        else if (width <= 1024) {
            return "400px";
        }
        else {
            return "520px";
        }
    };
    const dispatch = useDispatch();

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client';
        const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        loadScript(src)
            .then(() => {
                /*global google*/
                google.accounts.id.initialize({
                    client_id: id,
                    callback: handleCredentialResponse,
                });
                google.accounts.id.renderButton(
                    document.getElementById("buttonDiv"),
                    { shape: "", theme: "", size: "large", width: widthSize(), text: "signup_with" }
                );
                google.accounts.id.prompt();

            })
            .catch(console.error);

        return () => {
            const scriptTag = document.querySelector(`script[src="${src}"]`);
            if (scriptTag) document.body.removeChild(scriptTag);
        };
    }, []);

    function handleCredentialResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential);
        const decoded = jwt_decode(response.credential);

        // console.log(decoded);
        const userData = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
        };

        // console.log(userData);
        dispatch(googleSignIn(userData));
    }

    return (
        <div id="buttonDiv" className=""></div>
    );
};


const Google = {
    GoogleAuth,
};

export default Google;