import React from 'react';
import '../Styles/TodoList.css';
import Flats from './Flats';
import City from './City';
import Activities from './Activities';
import Shop from './Shop';

function TodoList({ activeList, setMoney, furniture, setFurniture, men, setMen, flats, setFlats,
  districts, pix, fetchFlat, fetchUser, user, myChannels, setMyChannels, refCount
}) {
  return (
    <div className="todo-list">
      {activeList === 1 && <Flats
        pix={pix}
        furniture={furniture}
        setFurniture={setFurniture}
        men={men}
        setMen={setMen}
        flats={flats}
        setFlats={setFlats}
        fetchFlat={fetchFlat}
        fetchUser={fetchUser}
        user={user}
      ></Flats>}
      {activeList === 2 && <City
        fetchUser={fetchUser}
        districts={districts}
        pix={pix}
        user={user}
        setFlats={setFlats}
      ></City>}
      {activeList === 3 && <Activities
        refCount={refCount}
        myChannels={myChannels}
        setMyChannels={setMyChannels}
        setFlats={setFlats}
        fetchUser={fetchUser}
        user={user}
      ></Activities>}
      {activeList === 4 && <Shop
        setFlats={setFlats}
        user={user}
        setFurniture={setFurniture}
        setMoney={setMoney}
        setMen={setMen}
      ></Shop>}
    </div>
  );
}

export default TodoList;
