import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../Styles/App.css';
import TodoList from './TodoList';
import Navbar from './Navbar';
import Counter from './Counter';
import DailyRewards from './DailyReward';

function App() {
  const user = useRef();

  const [refCount, setRefCount] = useState(0);
  const [myChannels, setMyChannels] = useState([]);
  const [money, setMoney] = useState(0);
  const [days, setDays] = useState([]);
  const [dayOpen, setDayOpen] = useState(true);
  const [curDay, setCurDay] = useState(0)

  const [furniture, setFurniture] = useState([]);
  const [men, setMen] = useState([]);
  const [flats, setFlats] = useState([]);

  const [districts, setDistricts] = useState([]);
  const [activeList, setActiveList] = useState(1);
  const [pix, setPix] = useState(window.innerWidth / 183);

  const fetchFlat = async (id) => {
    console.log("fetchFlat");
    try {
      const response = await axios.post('https://d-art.space/backend/flat', {
        flat: id,
      });
      const data = response.data;
  
      if (Array.isArray(data.men)) {
        for(let i = 0; i < data.men.length; i++) {
          data.men[i].xxx = Math.floor(Math.random() * 100 + 4);
        }
      }
  
      setFlats(prevItems => {
        // Находим индекс существующей квартиры в списке
        const existingIndex = prevItems.findIndex(item => item.id === data.id);
  
        if (existingIndex !== -1) {
          // Если квартира найдена, заменяем её новыми данными
          const updatedFlats = [...prevItems];
          updatedFlats[existingIndex] = data;
          return updatedFlats;
        } else {
          // Если квартиры нет, добавляем её в список
          return [...prevItems, data];
        }
      });
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
  
  const fetchUser = async (userId, refID) => {
    console.log("fetchUser")
    try {
        const response = await axios.post('https://d-art.space/backend/enter', {
            id: userId, 
            refid: refID,
        });
        const data = response.data;
        user.current = data;
        setMoney(user.current.money);
        setMen(() => {
          for (let i = 0; i < user.current.men.length; i++) {
            user.current.men[i].idS = i
          }
          return(user.current.men);
        });
        setFurniture(user.current.furniture);
        setRefCount(user.current.refcount);
        setMyChannels(user.current.channels);
        setDays(user.current.chal);
        setCurDay(DaysLeft(user.current.time))
        for(let i = 0; i < user.current.flats.length; i ++) {
          fetchFlat(user.current.flats[i]);
        }
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
  }

  const fetchDistricts = async () => {
    console.log("fetchDistricts")
    try {
        const response = await axios.post('https://d-art.space/backend/districts', {});
        const data = response.data;
        let districtsRaw = data.districts;
        let tri = 0;
        for(let i = 0; i < districtsRaw.length; i ++) {
          districtsRaw[i].x = (20 + tri * 51) * pix;
          districtsRaw[i].y = Math.floor(i/3) * 50 * pix;
          districtsRaw[i].width = 41 * pix;  // ширина спрайта в пикселях
          districtsRaw[i].height = 75 * pix; // высота спрайта в пикселях
          if (tri === 2) {
            tri = 0
          } else {
              tri ++
          }
        }
        setDistricts(districtsRaw);
        console.log(JSON.stringify(districtsRaw))
  
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
  }

  useEffect(() => {
    console.log("start");
  
    let startParam = `${window.Telegram.WebApp.initDataUnsafe?.start_param}`;
    let userId = `${window.Telegram.WebApp.initDataUnsafe?.user?.id}`;
  
    if (startParam === null || startParam === "" || startParam === 'undefined'){
      startParam = "-1";
    }
      
    if (userId === null || userId === "" || userId === 'undefined'){
      userId = "1";
    }
    fetchUser(userId, startParam);
    fetchDistricts();
  }, []);

  const DaysLeft = (endTime) => {
    const startTime = new Date(endTime);
    const currentTime = new Date();
    const difference = currentTime - startTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  };

  const onClose = (index) => {
    setDayOpen(false);
  }

  const DayReady = async() => {
    console.log("DayReady")
    try {
        const response = await axios.post('https://d-art.space/backend/dayready', {
            id: user.current.id, 
            refid: user.current.refid,
        });
        const data = response.data;
        const type = data.type;
        switch (type) {
          case "money":
            user.current.money += data.money;
            setMoney(user.current);
            break;
          case "furniture":
            user.current.flats = [...user.current.flats, data.flat];
            setFlats(user.current.flats);
            break;
          case "man":
            user.current.man = [...user.current.man, data.man];
            setMen(user.current.man);
            break;
          default:
            console.log("no type")
        }
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
  }

  return (
    <div className="App">
      {dayOpen && <DailyRewards
      days={days}
      curDay={curDay}
      onClose={onClose}
      DayReady={DayReady}
      ></DailyRewards>}
      <Counter 
      money={money}
      />
      <TodoList 
      activeList={activeList}
      money={money}
      setMoney={setMoney}
      furniture={furniture}
      setFurniture={setFurniture}
      men={men}
      setMen={setMen}
      flats={flats}
      setFlats={setFlats}
      districts={districts}
      setDistricts={setDistricts}
      pix={pix}
      setPix={setPix}
      fetchFlat={fetchFlat}
      fetchUser={fetchUser}
      myChannels={myChannels}
      setMyChannels={setMyChannels}
      refCount={refCount}
      user={user}
      />
      <Navbar 
      setActiveList={setActiveList}

      />
    </div>
  );
}

export default App;
