
function CarouselItem({ slide, stopSlide, startSlide }: any) {
    return (
        <div className="inline-block w-full" onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <img src={slide} alt="" />
        </div>
    )
}

export default CarouselItem