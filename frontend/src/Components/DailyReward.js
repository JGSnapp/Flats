import React from 'react';
import '../Styles/DailyReward.css';

function DailyReward({ days, onClose, DayReady, curDay }) {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {days && days.map((isCompleted, index) => (
          <div>
            {curDay === index ? <div
            key={index}
            className="day-button"
            style={{
              backgroundImage: `url(https://d-art.site/backend/interface_images/day_lost.png)`
            }}/>: <button
            key={index}
            className="day-button"
            onClick={() => DayReady(index)}
            style={{
              backgroundImage: `url(https://d-art.site/backend/interface_images/day_${!isCompleted ? index : 'yet'}.png)`
            }}/>}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="modal-button">Yo!</button>
    </div>
  );
}

export default DailyReward;
