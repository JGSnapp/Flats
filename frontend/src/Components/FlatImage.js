import '../Styles/FlatImage.css';

const FlatImage = ({ back, chair, table, lamp, tv, locker, pix, removeFromFlat, active, men, manFromFlat}) => {
    const apartmentStyle = {
        position: 'relative',
        width: `${118 * pix}px`,  
        height: `${62 * pix}px`,  
        border: '2px solid black',
    };    

    return (
        <div className="pixel-art" style={apartmentStyle}>
            <Furniture top={0} left={0} width={118 * pix} height={62 * pix} imageUrl={`https://d-art.space/backend/flat_images/${back}`} type="back" removeFromFlat={(t) => {console.log(t)}} active={false}/>
            {chair && <Furniture top={29 * pix} left={7 * pix} width={28 * pix} height={28 * pix} imageUrl={`https://d-art.space/backend/furniture_images/${chair.skin}`} type="chair" removeFromFlat={removeFromFlat} active={active}/>}
            {table && <Furniture top={38 * pix} left={37 * pix} width={37 * pix} height={19 * pix} imageUrl={`https://d-art.space/backend/furniture_images/${table.skin}`} type="table" removeFromFlat={removeFromFlat} active={active}/>}
            {lamp && <Furniture top={3 * pix} left={49 * pix} width={20 * pix} height={15 * pix} imageUrl={`https://d-art.space/backend/furniture_images/${lamp.skin}`} type="lamp" removeFromFlat={removeFromFlat} active={active}/>}
            {tv && <Furniture top={locker ? pix : 23 * pix} left={75 * pix} width={39 * pix} height={35 * pix} imageUrl={`https://d-art.space/backend/furniture_images/${tv.skin}`} type="tv" removeFromFlat={removeFromFlat} active={active}/>}
            {locker && <Furniture top={35 * pix} left={83 * pix} width={27 * pix} height={22 * pix} imageUrl={`https://d-art.space/backend/furniture_images/${locker.skin}`} type="locker" removeFromFlat={removeFromFlat} active={active}/>}
            {men && men.map((man, index) => (
                <Furniture 
                key={index}
                top={21 * pix} 
                left={man.xxx * pix} 
                width={16 * pix} 
                height={36 * pix} 
                imageUrl={`https://d-art.space/backend/people_images/${man.skin}`} 
                type={man.id}
                removeFromFlat={manFromFlat} 
                active={active}/>
            ))}
        </div>
    );
};

function Furniture({ top, left, width, height, imageUrl, type, removeFromFlat, active }) {
    const style = {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
    };

    return active ? (
        <button onClick={() => removeFromFlat(type)} className="button-invisible" style={style} />
    ) : (
        <div className="button-invisible" style={style} />
    );
}

export default FlatImage