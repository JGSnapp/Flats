import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Shop.css';

const Shop = ({setFurniture, setMoney, setMen, user, setFlats }) => {
    const [shop, setShop] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const randManCostRef = useRef(0)
    const randFurCostRef = useRef(0)
    const [randManCost, setRandManCost] = useState(0);
    const [randFurCost, setRandFurCost] = useState(0);
    const [auction, setAuction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        GetShop();
        loadMoreAuctions();
    }, []);

    const GetAuction = async (howMany, skip) => {
        try {
            const response = await axios.post('https://d-art.space/backend/getauction', {how: howMany, skip});
            const data = response.data;
            if (data && data.length > 0) {
                setAuction(prevAuction => [...prevAuction, ...data]);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const loadMoreAuctions = () => {
        if (!loading) {
            setLoading(true);
            GetAuction(10, skip)
                .then(() => {
                    setSkip(prevSkip => prevSkip + 10);
                    setLoading(false);
                });
        }
    };

    const GetShop = async () => {
        try {
            console.log("getshop");
            const response = await axios.post('https://d-art.space/backend/getmarket', {});
            const data = response.data;
            if (Array.isArray(data.furniture)) {  // Проверка, что это массив
                setShop(data.furniture);
            } else {
                setShop([]);  // Установка пустого массива, если данные некорректны
            }
            randManCostRef.current = data.manprice;
            randFurCostRef.current = data.furprice;
            console.log(randManCostRef.current);
            console.log(randFurCostRef.current);
            setRandManCost(randManCostRef.current);
            setRandFurCost(randFurCostRef.current);
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
        }
    };
    

    useEffect(() => {
        console.log("shopStart");
        GetShop();
        loadMoreAuctions();
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setIsModalOpen(false);
    };

    // Прослушивание события прокрутки для загрузки новых данных
    useEffect(() => {
        console.log("iiiii");
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadMoreAuctions();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const BuyAuction = async (flat) => {
        try {
            const response = await axios.post('https://d-art.space/backend/buyauction', {flatid: flat.id, id: user.current.id});
            setFlats(prevItems => [...prevItems, flat]);
            setModalInfo({title: flat.house, district: flat.district});
            user.current.money -= flat.price;
            setMoney(user.current.money);
            openModal();
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
        }  
    };

    const BuyFurniture = async (fur) =>{
        try {
            console.log({furid: fur.id, id: user.current.id});
            const response = await axios.post('https://d-art.space/backend/buyindex', {furid: fur.id, id: user.current.id});
            setFurniture(prevItems => {
                if (Array.isArray(prevItems)) {
                    let idS = prevItems.length;
                    while (prevItems.some(item => item.idS === idS)) {
                        idS++;
                    }
                    fur.idS = idS;
                    return [...prevItems, fur];
                } else {
                    fur.idS = 0
                    return [fur];
                }
            });
            setModalInfo({title: fur.name, imageURL: fur.skin, description: fur.description});
            user.current.money -= fur.price;
            setMoney(user.current.money);
            openModal();
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
        }
    };

    const BuyRandom = async () =>{
        try {
            const response = await axios.post('https://d-art.space/backend/buyfur', { id: user.current.id });
            const data = response.data;
            setFurniture(prevItems => {
                if (Array.isArray(prevItems)) {
                    let idS = prevItems.length;
                    while (prevItems.some(item => item.idS === idS)) {
                        idS++;
                    }
                    data.idS = idS;
                    return [...prevItems, data];
                } else {
                    data.id = 0
                    return [data];
                }
            });
            setModalInfo({title: data.name, imageURL: data.skin, description: data.description});
            user.current.money -= randFurCostRef.current;
            setMoney(user.current.money);
            openModal();
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
        }   
    };

    const BuyMan = async () =>{
        try {
            const response = await axios.post('https://d-art.space/backend/buyguy', { id: user.current.id });
            const data = response.data;
            setMen(prevItems => {
                if (Array.isArray(prevItems)) {
                    let idS = prevItems.length;
                    while (prevItems.some(item => item.idS === idS)) {
                        idS++;
                    }
                    data.idS = idS;
                    return [...prevItems, data];
                } else {
                    data.id = 0
                    return [data];
                }
            })
            setModalInfo({title: data.type, imageURL: data.skin, description: data.description});
            user.current.money -= randManCostRef.current
            openModal();
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
        }
    };

    return (
        <div>
            {isModalOpen && (
            <Modal
            closeModal={closeModal}
            modalInfo={modalInfo}
            />)}
            <div className="todo-item">
            <div style={{
                backgroundImage: `url(https://d-art.space/backend/interface_images/random_guy.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            alt="" 
            className="todo-image" />
            <div className="todo-content">
                <h2 className="todo-title">Случайный человек</h2>
                <button onClick={() => {BuyMan()}} className="todo-button">Купить за {randManCost}</button>
            </div>
            </div>
            <div className="todo-item">
            <div style={{
                backgroundImage: `url(https://d-art.space/backend/interface_images/random_fur.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            alt="" 
            className="todo-image" />
            <div className="todo-content">
                <h2 className="todo-title">Случайный предмет мебели</h2>
                <button onClick={() => {BuyRandom()}} className="todo-button">Купить за {randFurCost}</button>
            </div>
            </div>
            <p>Доступная для покупки мебель</p>
            <div>
                {shop  && shop.map((todo, index) => (
                <Furniture
                index={index}
                todo={todo}
                BuyFurniture={BuyFurniture}>
                </Furniture>
                ))}
            </div>
            <p>Аукцион квартир</p>
            <div>
                {auction && auction.map((todo, index) => (
                <Flat
                index={index}
                todo={todo}
                BuyAuction={BuyAuction}>
                </Flat>
                ))}
            </div>
        </div>
      );
}

const Furniture = ({BuyFurniture, todo}) => {

    return (
        <div className="todo-item">
          <div style={{
            backgroundImage: `url(https://d-art.space/backend/furniture_images/${todo.skin})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          src={todo.imageUrl} 
          alt="" 
          className="todo-image" />
          <div className="todo-content">
            <h2 className="todo-title">{todo.name}</h2>
            <p className="todo-description">Описание: {todo.description}</p>
            <p className="todo-description">Коллекция:{todo.quality}</p>
            <button onClick={() => {BuyFurniture(todo)}} className="todo-button">Купить за {todo.price}</button>
          </div>
        </div>
      );
}

const Flat = ({BuyAuction, todo}) => {

    return (
        <div className="todo-item">
          <div className="todo-content">
            <p className="todo-description">Район: {todo.district}</p>
            <p className="todo-description">Дом: {todo.house}</p>
            <button onClick={() => {BuyAuction(todo)}} className="todo-button">Купить за {todo.price}</button>
          </div>
        </div>
      );
}

const Modal = ({ closeModal, modalInfo }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{modalInfo.title}</h2>
          {modalInfo.imageUrl && <img src={modalInfo.imageUrl} className="modal-image" />}
          {modalInfo.description && <p>{modalInfo.description}</p>}
          {modalInfo.house && <p>Приобретена квартира в {modalInfo.house} в {modalInfo.district}</p>}
          <button onClick={closeModal} className="modal-button">Yo!</button>
        </div>
      </div>
    );
};

export default Shop