import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flat from './Flat';
import FlatImage from './FlatImage';
import '../Styles/Flats.css';

const Flats = ({pix, furniture, setFurniture, men, setMen, flats, setFlats, fetchFlat, fetchUser, user}) => {
    const [selectedFlatId, setSelectedFlatId] = useState('0');
    const [curFlat, setCurFlat] = useState({men: null,back: null,chair: null,table: null,lamp: null,locker: null,tv: null})

    const backFlat = () => {
        setSelectedFlatId('0');
        fetchUser(user.current.id, "-1");
    }

    useEffect(() => {
        if (selectedFlatId == '0') {
            setCurFlat({men: null,back: null,chair: null,table: null,lamp: null,locker: null,tv: null})
            console.log(flats)
        } else {
            const flatIndex = flats.findIndex(flat => flat.id === selectedFlatId);
            const flat = flats[flatIndex];
            console.log(flat);
            setCurFlat({...flat});
        }
      }, [selectedFlatId]);

    const removeFromInventory = (itemId) => {
        const itemIndex = furniture.findIndex(it => it.id === itemId);
        const item = furniture[itemIndex];
        console.log(item);
        if (!item) {
            console.error("Item not found in inventory");
            return;
        }

        const existingItem = curFlat[item.type];

        setCurFlat(prevFlat => {
            return {
                ...prevFlat,
                [item.type]: item  
            };
        });

        setFurniture(prevInventory => {
            let newInventory = prevInventory.filter((_, index) => index !== itemIndex); 
            if (existingItem) {
                newInventory = [...newInventory, existingItem];
            }
            return newInventory;
        });
    };


    const removeFromFlat = (itemType) => {
        const item = {...curFlat[itemType]};

        if (!item) {
            console.error("No item of type " + itemType + " found in this flat.");
            return;
        }

        setCurFlat(prevFlat => {
            return {
                ...prevFlat,
                [itemType]: null
            };
        });

        setFurniture(prevInventory => {
            let idS = prevInventory.length;
            while (prevInventory.some(item => item.idS === idS)) {
                idS++;
            }
            item.idS = idS; 
            return [...prevInventory, item];
        });
    };

    const manFromInventory = (manId) => {
        const manIndex = men.findIndex(man => man.id === manId);
        if (manIndex === -1) {
            console.error("Man not found in inventory");
            return;
        }
        const man = {...men[manIndex]};
        man.xxx = Math.floor(Math.random() * 100 + 4);

        console.log("1 ", flats);
    
        setCurFlat(prevFlat => {
            if (Array.isArray(prevFlat.men)) {
                console.log(manIndex);
                console.log(prevFlat);
                console.log(prevFlat.men);
                let newFlat = prevFlat;
                newFlat.men.push(man);
                return newFlat;
            } else {
                let newFlat = prevFlat;
                newFlat.men = [man]
                console.log(flats);
                return newFlat;  // Установка пустого массива, если данные некорректны
            }
        });

        console.log("2 ", flats);
    
        setMen(prevMen => prevMen.filter((_, index) => index !== manIndex)); 

        console.log("3 ", flats);
    };
    
    const manFromFlat = (manId) => {
        const manIndex = curFlat.men.findIndex(man => man.id === manId);
        if (manIndex === -1) {
            console.error("Man not found in this flat");
            return;
        }
        const man = {...curFlat.men[manIndex]};
    
        setMen(prevMen => {
            let idS = prevMen.length;
            while (prevMen.some(item => item.idS === idS)) {
                idS++;
            }
            man.idS = idS; 
            if (Array.isArray(prevMen)) {
                let newMen = prevMen;
                newMen.push(man);
                return newMen;
            } else {
                console.log([man]);
                return [man];  // Установка пустого массива, если данные некорректны
            }
        });
    
        setCurFlat(prevFlat => ({
            ...prevFlat,
            men: prevFlat.men.filter((_, index) => index !== manIndex)
        }));
    };

    const updateFlat = async () => {
        console.log("fetchFlat");
        try {
          const response = await axios.post('https://d-art.space/backend/updateflat', {
            id: user.current.id,
            flatid: curFlat.id,
            house: curFlat.house,
            district: curFlat.district,
            chair: curFlat.chair,
            table: curFlat.table,
            locker: curFlat.locker,
            tv: curFlat.tv,
            lamp: curFlat.lamp,
            men: curFlat.men,
            back: curFlat .back,
          });
          const data = response.data;
          fetchFlat(data.id)
          setSelectedFlatId("0")
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
    }

    const takeMoney = async (flat) => {
        console.log(flat);
        const startTime = new Date(flat.time);
        const eightHoursLater = new Date(startTime.getTime() + 60 * 1000);
        const currentTime = new Date();
        if (currentTime >= eightHoursLater) {
          console.log(user.current.money);
          user.current.money += flat.price
          const updatedFlats = flats.map(flat1 => {
            if (flat1.id === flat.id) {
                return { ...flat1, time: currentTime.toString() }; // Создаем новый объект с обновлённым именем
            }
            return flat1;
        });
        setFlats(updatedFlats);
        try {
          const response = await axios.post('https://d-art.space/backend/takemoney', {
              id: user.current.id,
              flat: flat.id, 
          });
          }catch (error) {
          console.error('Ошибка при загрузке изображений:', error);
        }
        }else{
          alert("1 минута еще не прошла!");
        }
        fetchUser(user.current.id, "-1");
      }
    
    return (
        <div>
            {selectedFlatId === "0" ? (
                <div>
                    {flats && flats.map(flat => (
                        <Flat
                            key={flat.id}
                            takeMoney={takeMoney}
                            setSelectedFlatId={setSelectedFlatId}
                            flat={flat}>
                        </Flat>
                    ))}
                </div>
            ) : (
                <div>
                <button onClick={() => backFlat()}>
                    Назад
                </button>
                <button onClick={() => updateFlat()}>
                    Применить
                </button>
                <FlatImage
                    active={true}
                    removeFromFlat={removeFromFlat}
                    manFromFlat={manFromFlat}
                    men={curFlat.men}
                    back={curFlat.back}
                    chair={curFlat.chair}
                    table={curFlat.table}
                    lamp={curFlat.lamp}
                    locker={curFlat.locker}
                    tv={curFlat.tv}
                    pix={pix}>
                </FlatImage>
                <Inventory
                    removeFromInventory={removeFromInventory}
                    manFromInventory={manFromInventory}
                    furniture={furniture}
                    men={men}>
                </Inventory>
            </div>
            )}
        </div>
    );
};

const Inventory = ({ removeFromInventory, furniture, men, manFromInventory }) => {
    return (
        <div>
            <p>
                Люди
            </p>
            {men && men.map(man => (
                <button key={man.idS} onClick={() => manFromInventory(man.id)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '10px',
                        marginHeight: '10px',
                    }}>
                    <h1>тип: {man.type}</h1>
                    <p>описание: {man.description}</p>
                </button>
            ))}
            <p>
                Мебель
            </p>
            {furniture && furniture.map(thing => (
                <button key={thing.idS} onClick={() => removeFromInventory(thing.id)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '10px',
                        marginHeight: '10px',
                    }}>
                    <h1>название: {thing.name}</h1>
                    <p>коллекция: {thing.collection}</p>
                    <p>описание: {thing.description}</p>
                </button>
            ))}
        </div>
    );
};


export default Flats;