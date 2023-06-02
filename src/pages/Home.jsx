import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import "swiper/css/effect-cards";
import { EffectCards } from 'swiper'

import imgBroaster from '../assets/broaster.jpg';
import imgBrasa from '../assets/brasa.jpg';
import imgCoca from '../assets/coca.jpg';

export function Home() {
  const { user, logOut } = UserAuth();

  const cerrarSesion = async () => {
    try {
      await logOut();
      Navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const images = [imgBroaster, imgBrasa, imgCoca];

  return (
    <>
      <h1>This is the Home</h1>

      <Swiper 
        effect={'cards'} 
        grabCursor={true} 
        modules={[EffectCards]}
        className="mySwiper"
      >
          {images.map((image, index) => (
            <SwiperSlide key = {index} style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className = 'swiper-slide-content'>
                <img src={image} alt={`Image $[index + 1]`} style = {{ objectFit: 'cover'}}/>
              </div>
            </SwiperSlide>
          ))}
        
      </Swiper>

      {user && (
        <>
          <p>This is Home {user.displayName}</p>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </>
      )}
      {!user && <Navigate to="/login" />}
      <button>
        <Link to="/admin">Regresar al Admin</Link>
      </button>
    </>
  );
}
