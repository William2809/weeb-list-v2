// import React, { useEffect } from 'react'
// import { useContext } from 'react';
// import GogoanimeContext from '../../context/anime/gogoanime/GogoanimeContext';
// import testImg from '../../assets/coverImage/lycoris.jpg';
// import { getLatest } from '../../context/anime/gogoanime/GogoanimeAction';

// function LatestRelease() {
//     const { anime, dispatch } = useContext(GogoanimeContext);
//     useEffect(() => {
//         getAnime();
//     }, [])

//     const getAnime = async () => {
//         dispatch({ type: 'SET_LOADING' });
//         const anime = await getLatest();
//         dispatch({ type: 'GET_LATEST', payload: anime });
//     }

//     return (
//         <div>
//             <div className="mt-4 flex gap-4 flex-wrap justify-around">
//                 <div className="w-[136px] h-[272px] bg-base-200 rounded-lg">
//                     <img src={testImg} alt="" className="w-full h-[204px] rounded-t-lg" />
//                     <p className="font-semibold text-white text-xs text-center my-1 px-1">
//                         Summer Time Rendering asdfs
//                     </p>
//                     <div className="flex font-semibold text-white text-xs gap-1 justify-center">
//                         <div className="px-1 bg-secondary rounded-[4px]">
//                             Eps 9/13
//                         </div>

//                         <div className="px-1 bg-secondary rounded-[4px]">
//                             Sub
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LatestRelease
export { }