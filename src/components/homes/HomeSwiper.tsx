import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Swiper as SwiperType, Navigation } from 'swiper';
import { Autoplay } from 'swiper';
import animes from '../../assets/slider-home.json';
import { MdCalendarToday, MdLiveTv, MdOutlineAccessTime, MdPlayCircleOutline } from 'react-icons/md';

import "swiper/css";

SwiperCore.use([Autoplay]);

function HomeSwiper() {
    const swiperRef = useRef<SwiperType>();

    console.log(animes);
    return (
        <div>
            <Swiper
                className="mySwiper"
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                autoplay={{ delay: 3000 }}
                speed={500}
                loop
                slidesPerView={1}

            >
                {animes.map((anime, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[240px] sm:h-[300px] lg:[400px] w-screen">
                            <div className=" " >
                                <div className="absolute h-full w-full -z-10 bg-gradient-to-r from-[#000003db] via-[#0000035c] to-transparent" style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.7446165966386555) 32%, rgba(0,212,255,0) 100%);" }}></div>
                                <img src={anime.image} alt="image" className=" absolute h-full w-full -z-20" />
                            </div>
                            <div className="flex h-full items-center p-4 ">
                                <div>
                                    <div className="text-xs mb-2">#{index + 1} spotlight</div>
                                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{anime.title}</h1>
                                    <div className="w-[200px] mb-2">
                                        <div className="w-full flex items-center gap-1 text-white text-sm">
                                            <MdLiveTv /> <span>{anime.type}</span>
                                        </div>
                                        <div className="w-full flex items-center gap-1 text-white text-sm">
                                            <MdOutlineAccessTime /> <span>{anime.Duration}</span>
                                        </div>
                                        <div className="w-full flex items-center gap-1 text-white text-sm">
                                            <MdCalendarToday /> <span>2022</span>
                                        </div>
                                    </div>
                                    <a href={`/anime/${anime.animeId}`}>
                                        <div className="flex gap-1 w-[120px] items-center justify-center p-1 bg-secondary rounded-lg text-white text-sm hover:bg-secondary-focus">
                                            <span><MdPlayCircleOutline size="24px" /></span> Watch Now
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <div>
                <button onClick={() => swiperRef.current?.slidePrev()}>Prev</button>
                <button onClick={() => swiperRef.current?.slideNext()}>Next</button>
            </div> */}
        </div>
    )
}

export default HomeSwiper