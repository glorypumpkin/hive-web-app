import { useState } from 'react';

export function GraphExtra({ setShowTooltip, setCompareActive, showTooltip, compareActive }) {
    const [isHovered, setIsHovered] = useState(false);

    const onTooltipButtonClick = () => {
        setShowTooltip(showTooltip => !showTooltip);
        // setShowDot(false);
    }

    const onCompareButtonClick = () => {
        setCompareActive(compareActive => !compareActive);
    }

    console.log('isHovered', isHovered)
    const hoveredMenu = () => (
        <div className=" absolute top-0 left-full overflow-hidden">
            <div
                id='hovered-menu'
                data-hovered={isHovered}
                className='flex gap-2 transition-all duration-500 ease-in-out -bg--primary-color rounded-r-3xl h-8 px-2'
            >
                <button className={`extra-buttons ${showTooltip ? '-bg--hover-color' : ''}`} onClick={onTooltipButtonClick}>Tooltip</button>
                {/* <button className=' bg-orange-200' onClick={onDotButtonClick}>Dot</button> */}
                <button className={`extra-buttons`}>Notes</button>
                <button className={`extra-buttons ${compareActive ? '-bg--hover-color' : ''}`} onClick={onCompareButtonClick}>Comparison</button>
            </div>
        </div>
    );

    return (
        <div className='flex flex-row gap-2 pl-3 items-center pt-1'
            id='graph-menu'
        >
            <div className={`relative ${isHovered ? 'rounded-l-3xl' : 'rounded-3xl'} items-center justify-center hover:-bg--hover-color flex`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {hoveredMenu()}
                <img src="/settings.svg" alt="" className='w-8 h-8' />
            </div>
        </div>
    )
}