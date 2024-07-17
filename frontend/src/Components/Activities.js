import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/Activities.css';

const Activities = ({ myChannels, setMyChannels, user, setMoney, setMen }) => {
    const [channels, setChannels] = useState([]);
    const [refCount, setRefCount] = useState(0);
    const [isModalSubOpen, setIsModalSubOpen] = useState(false);
    const [isModalRefsOpen, setIsModalRefsOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);

    useEffect(() => {
      setRefCount(user.current.refcount)
    }, []);

    const openModalSub = () => {
        setIsModalSubOpen(true);
    };
      
    const closeModalSub = () => {
        setIsModalSubOpen(false);
    };

    const openModalRefs = () => {
        setIsModalRefsOpen(true);
    };
      
    const closeModalRefs = () => {
        setIsModalRefsOpen(false);
    };
  
    useEffect(() => {
      console.log("getChannels");
      GetChannels();
    }, []);

    const OnCheck = async (astivity) => {
        try {
            const response = await axios.post('https://d-art.space/backend/checksubscription', {id: user.current.id, name: astivity.name});
            let modalInfo1 = response.data;
            if (modalInfo1.type == "money" || modalInfo1.type == "man"){
              if(modalInfo1.money !== null){
                  user.current.money += modalInfo1.money
                  setMoney(curMoney => curMoney + modalInfo1.money)
              }
              if(modalInfo1.men !== null){
                  user.current.men = [...user.current.men, modalInfo1.man]
                  setMen(curMen => [...curMen, modalInfo1.man]);
              }
              setMyChannels(curChannels => [...curChannels, astivity.channelid])
              setModalInfo(modalInfo1);
              openModalSub();
            }
          } catch (error) {
            console.error('Ошибка при загрузке каналов:', error);
          }
    }
    
    const CheckRefs = async () => {
        try {
            const response = await axios.post('https://d-art.space/backend/checkref', {id: user.current.id});
            const modalInfo1 = response.data;
            if(modalInfo1 !== null){
                user.current.men = [...user.current.men, ...modalInfo1.man]
                setMen(curMen => [...curMen, modalInfo1.man]);
            }
            setModalInfo(modalInfo1);
            openModalRefs();
          } catch (error) {
            console.error('Ошибка при загрузке каналов:', error);
          }
    }
    
    const GetChannels = async () => {
      try {
        const response = await axios.post('https://d-art.space/backend/getsubscription', {});
        const data = response.data;
        setChannels(data);
      } catch (error) {
        console.error('Ошибка при загрузке каналов:', error);
      }
    };
    return (
      <div>
        {isModalSubOpen && (
        <ModalSub
        closeModal={closeModalSub}
        modalInfo={modalInfo}
        />)}
        {isModalRefsOpen && (
        <ModalRefs
        closeModal={closeModalRefs}
        modalInfo={modalInfo}
        />)}
        <h1>Задания</h1>
        <ul>
            <AddFriendActivitie
            CheckRefs={CheckRefs}
            user={user}
            refCount={refCount}
            >
            </AddFriendActivitie>
          {channels && channels.map(channel => (
            <ServerActivity 
              key={channel.id} 
              activity={channel} 
              OnCheck={OnCheck} 
              myChannels={myChannels}
            />
          ))}
        </ul>
      </div>
    );  
  };

const AddFriendActivitie = ({ CheckRefs, user, refCount }) => {
    const handleClick = (url, text) => {
        // Замените `encodeURIComponent` на вашу логику кодирования, если она отличается
        const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        window.open(telegramUrl, '_blank');
      };

    return (
        <li className="item">
          <p>Пигласите друзей!(Приглашено {refCount})</p>
          <div className="actions">
          <button onClick={() => handleClick(`https://t.me/flat_yo_bot/flat_yo?startapp=${user.current.id}`, 
            'Покупай и продавай квартиры в FLats Yo!')}>
            Пригласить друга</button>
          <button onClick={() => CheckRefs()}>Проверить</button>
          </div>
        </li>
      );
};

const ServerActivity = ({ activity, OnCheck, myChannels }) => {
  const handleClick = (url) => {
      window.open(url, '_blank');
  };

  return (
      <li className={`item ${activity.checked ? 'checked' : ''}`}>
          <p>{activity.name}</p>
          {myChannels && myChannels.some(myChannel => myChannel === activity.channelid) ? (
              <div className="completed">Выполнено</div>
          ) : (
              <div className="actions">
                  <button onClick={() => handleClick(activity.url)}>Перейти</button>
                  <button onClick={() => OnCheck(activity)}>Проверить</button>
              </div>
          )}
      </li>
  );
};

const ModalSub = ({ closeModal, modalInfo }) => {
    return (
      <div className="modal-overlay">
        {modalInfo.man !== null && <div className="modal-content">
        <img className="modal-image" src={`https://d-art.space/backend/people_images/${modalInfo.man.skin}`}></img>
          <h2>{modalInfo.man.type}</h2>
          <p>{modalInfo.man.description}</p>
          <button onClick={closeModal} className="modal-button">Yo!</button>
        </div>}
        {modalInfo.money !== null && <div className="modal-content">
            <img src={`https://d-art.space/backend/interface_images/coin.png`} className="modal-image" />
            {modalInfo.money}
          <button onClick={closeModal} className="modal-button">Yo!</button>
        </div>}
      </div>
    );
};

const ModalRefs = ({ closeModal, modalInfo }) => {
    return (
      <div className="modal-overlay">
        {modalInfo === null ? 
        <p>В последнее время вы не приглащали друзей(</p>
        :<div className="modal-content">
            x{modalInfo.lenght}<img className="modal-image" src={`https://d-art.space/backend/people_images/${modalInfo[0].skin}`}></img>
          <h2>{modalInfo[0].type}</h2>
          <p>{modalInfo[0].description}</p>
          <button onClick={closeModal} className="modal-button">Yo!</button>
        </div>}
      </div>
    );
};

export default Activities