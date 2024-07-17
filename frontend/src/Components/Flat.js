import React, { useEffect, useState } from 'react';
import '../Styles/Flat.css';
import FlatImage from './FlatImage';

const Flat = ({ flat, takeMoney, setSelectedFlatId }) => {
    const [pix, setPix] = useState((window.innerWidth - 5) / 183);

    const calculateTimeLeft = (endTime) => {
      const startTime = new Date(endTime);
      const eightHoursLater = new Date(startTime.getTime() + 1 * 60 * 1000);
      const currentTime = new Date();
      const timeLeft = (eightHoursLater - currentTime) / 1000; // Seconds left
      return Math.max(0, timeLeft);
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(flat.time));

    useEffect(() => {
      const timer = setInterval(() => {
        const updatedTimeLeft = calculateTimeLeft(flat.time);
        setTimeLeft(updatedTimeLeft);
        if (updatedTimeLeft <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [flat.time]);

    return (
        <div className='flat' onClick={() => setSelectedFlatId(flat.id)}>
            <FlatImage className='block'
                active={false}
                men={flat.men}
                back={flat.back}
                chair={flat.chair}
                table={flat.table}
                lamp={flat.lamp}
                locker={flat.locker}
                tv={flat.tv}
                pix={pix}>
            </FlatImage>
            {flat.price !== 0 ? (<button className='button'
                onClick={(e) => {
                    e.stopPropagation(); // Остановить всплывание события
                    if (timeLeft <= 0) {
                        takeMoney(flat);
                    }
                }}
                disabled={timeLeft > 0}>
                {timeLeft > 0 ? `Забрать ${flat.price} через ${Math.floor(timeLeft / 60)}m ${Math.floor(timeLeft % 60)}s` : `Забрать ${flat.price}`}
            </button>): (<p className='button'>
                Не приносит доход
            </p>)}
        </div>
    );
};

export default Flat;
