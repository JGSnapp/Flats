import React from 'react';
import '../Styles/City.css';

const HouseInfo = ({house, buyFlat}) => {
    return(
      <div style={{
        position: 'relative',
        width: '100%',
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'gray',
      }}>
        <div
            className="button-invisible"
            style={{
              width: house.width + 'px',
              height: house.height + 'px',
              display: 'inline-block',
              marginRight: house.margin + 'px',
              backgroundImage: `url(https://d-art.space/backend/houses_images/${house.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div>
                <p>{house.name}</p>
                <p>Уровень ЖК: {house.tir}</p>
                <button onClick={() => buyFlat(house.id)}
                style={{
                  width: '100%',
                  height: '100px',
                  marginBottom: '20px',
                }}>
                купить квартиру за {house.price} р.
                </button>
              </div>
        </div>
      </div>
    )
  }
  
export default HouseInfo