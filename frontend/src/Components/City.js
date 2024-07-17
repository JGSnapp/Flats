import React, { useState } from 'react';
import axios from 'axios';
import HouseInfo from './HouseInfo.js'
import '../Styles/City.css';

const App = ({districts, pix, user, setFlats, fetchUser}) => {
  const [houses, setHouses] = useState([])
  const [activeDistrict, setActiveDistrict] = useState({id: "--", name: "0"});

const changeDistrict = async (id) => {
  console.log("changeDistrict")
  if (id !== 0) {
    try {
      const response = await axios.post('https://d-art.space/backend/houses', {
          district: id,
      });
      const data = response.data;
      let housesRaw = data.houses;
      for(let i = 0; i < housesRaw.length; i ++) {
        housesRaw[i].margin = 30 * pix;
        housesRaw[i].width = 40 * pix;  // ширина спрайта в пикселях
        housesRaw[i].height = 80 * pix; // высота спрайта в пикселях
      }
      setHouses(housesRaw);
      console.log(JSON.stringify(housesRaw))
      
      }catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
    }
  }
  const itemIndex = districts.findIndex(it => it.id === id);
  const item = districts[itemIndex];
  setActiveDistrict(item)
}

const buyFlat = async (houseID) => {
    console.log("buyFlat")
    try {
      const response = await axios.post('https://d-art.space/backend/buyflat', {
          id: user.current.id,
          house: houseID,
          district: activeDistrict.id,
      });
      const data = response.data;
      setFlats(prevItems => [...prevItems, data]);
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
    fetchUser(user.current.id, "-1");
  }
  


  return (
    <div className="App"
    style={{  
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#0c0c72', /* Более тёмный синий для лучшего контраста */
      color:' #ffffff',
      display: 'flex',
      flexDirection: 'column',
      }}>
      {/* Панель с информацией пользователя */}

      {/* Основной контент приложения */}
      {activeDistrict.id ===  "--"? 
        <City
          districts={districts}
          changeDistrict={changeDistrict}>
        </City> 
        : 
        <District
          activeDistrict={activeDistrict}
          setActiveDistrict={setActiveDistrict}
          houses={houses}
          buyFlat={buyFlat}>
        </District>
      }

      {/* Кнопка для приглашения друга, видна только в главном меню */}
    </div>
  );
}

const City = ({ districts, changeDistrict }) => {
  return (
    <div className="City" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    }}>
      {districts && districts.map(district => (
        <button key={district.id}
          onClick={() => changeDistrict(district.id)}
          className="button-invisible"
          style={{
            position: 'absolute',
            width: district.width + 'px',
            height: district.height + 'px',
            top: district.y + 'px',
            left: district.x + 'px',
            backgroundImage: `url(https://d-art.space/backend/districts_images/district_${district.id}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          {/* No img tag needed anymore */}
        </button>
      ))}
    </div>
  );
}


const District = ({activeDistrict, setActiveDistrict, houses, buyFlat}) => {
  return(
    <div className="District">
      <button 
        onClick={() => setActiveDistrict({id: "--", name: "0"})}
        style={{
          width: '100%',
          height: '30px',
          position: 'absolute',
          top: 0,
          left: 0
        }}>
        Назад
      </button>
      <p>{activeDistrict.name}</p>
      <p>Название района: {activeDistrict.name}</p>
      <div className="HousesContainer"
      style={{
        position: 'relative',
        width: '100%',
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
      }}>
        {houses && houses.map((house, index) => (
          <HouseInfo
          key={index}
          house={house}
          buyFlat={buyFlat}>   
          </HouseInfo>
        ))}
      </div>
    </div>
  )
}

export default App;
