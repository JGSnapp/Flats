import React from 'react';
import '../Styles/Navbar.css';

const Navbar = ({ setActiveList }) => {
  return (
    <div className="navbar">
      {[{id: 1, src: 'flats.png'},
       {id: 2, src: 'city.png'},
        {id: 3, src: 'activities.png'},
         {id: 4, src: 'shop.png'}].map(button => (
        <button 
        className='pixel-art'
        key={button.id} 
        onClick={() => setActiveList(button.id)}          
        style={{
          backgroundImage: `url(https://d-art.space/backend/interface_images/${button.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '50px', // Обеспечивает, что все кнопки одинакового размера
          height: '50px',
        }}>
        </button>
      ))}
    </div>
  );
}

export default Navbar;
