import { useState, useEffect, useRef } from 'react'
import gotoubun from '../../../assets/gotoubun.jpg';
import chainsawman from '../../../assets/chainsawman.jpg';
import kage from '../../../assets/the-eminence-in-shadow.png';
import spyxfamily from '../../../assets/spyxfamily.jpg';

import CarouselItem from './CarouselItem';
import CarouselControls from './CarouselControls';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval: any = useRef();

    const startSlidetimer = () => {
        stopSlideTimer()
        slideInterval.current = setInterval(() => {
            setCurrentSlide(currentSlide => (currentSlide < slides.length - 1 ? currentSlide + 1 : 0));

        }, 5000);
    }

    const stopSlideTimer = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    }

    useEffect(() => {
        startSlidetimer();

        return () => stopSlideTimer();
    }, [])

    const prev = () => {
        startSlidetimer();
        const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        setCurrentSlide(index);
    }
    const next = () => {
        startSlidetimer();
        const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    }

    const slides = [
        gotoubun, chainsawman, kage, spyxfamily
    ]

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="carousel relative m-0 overflow-hidden max-w-4xl ">
                <div className={`carousel-inner whitespace-nowrap translate-x-[-${currentSlide * 100}%] transition-transform ease-linear duration-300`}>
                    {slides.map((slide, index) => (
                        <CarouselItem slide={slide} key={index} stopSlide={stopSlideTimer} startSlide={startSlidetimer} />
                    ))}
                </div>
                <CarouselControls prev={prev} next={next} />
            </div>
        </div>
    )
}

export default Carousel