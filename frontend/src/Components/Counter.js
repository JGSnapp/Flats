import React from 'react';
import '../Styles/Counter.css';

function Counter({ money }) {
  return (
    <div className="counter">
      <div className="coin-image"></div> {/* Добавляем элемент для изображения монеты */}
      <div>{money}</div>
    </div>
  );
}

export default Counter;