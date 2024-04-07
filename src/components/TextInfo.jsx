import { useState } from 'react';

export function TextInfo({ text }) {
    const [hovered, setHovered] = useState(false);

    const onMouseEnter = () => {
        setHovered(true);
    }

    const onMouseLeave = () => {
        setHovered(false);
    }

    return (
        <div className='relative'>
            <img src="/info.svg" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            <div className={`absolute bg-white/50 p-1 w-48 rounded-lg shadow-md z-10 ${hovered ? 'block' : 'hidden'} text-info`}>
                <p className='info-text'>{text}</p>
            </div>
        </div>
    )
}
