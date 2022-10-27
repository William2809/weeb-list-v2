import React from 'react'

function CarouselControls({ prev, next }: any) {
    return (
        <div>
            <button className="bg-[rgba(0,0,0,0.2)] border-none inline-block absolute w-10 h-10 text-white left-0" onClick={prev}>Prev</button>
            <button className="bg-[rgba(0,0,0,0.2)] border-none inline-block absolute w-10 h-10 text-white right-0" onClick={next}>Next</button>
        </div>
    )
}

export default CarouselControls