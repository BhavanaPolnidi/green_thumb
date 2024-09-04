import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const names = ["Books", "Bonsai", "Flowers", "Fruits", "Leafy", "Seeds", "Tools", "Vegetables"];

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Plants</h1>
      <p className='explore-menu-text'>Choose from a diverse plants featuring a delectable array of variety plants. Our mission is to build a healthy and green environment.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt={item.menu_name} />
              <p>{names[index]}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;
