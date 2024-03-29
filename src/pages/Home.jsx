import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import "swiper/css/effect-cards";
import { EffectCards } from 'swiper'

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

  const [adminImages, setAdminImages] = useState([])
  const [adminDescriptions, setAdminDescriptions] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const storedAdminImages = localStorage.getItem('adminImages')
    const storedAdminDescriptions = localStorage.getItem('adminDescriptions')
    const parsedAdminImages = storedAdminImages ? JSON.parse(storedAdminImages) : []
    const parsedAdminDescriptions = storedAdminDescriptions ? JSON.parse(storedAdminDescriptions) : []
    setAdminImages(parsedAdminImages)
    setAdminDescriptions(parsedAdminDescriptions)
  }, [])

  const handleSlideChange = (swiper) => {
    setCurrentImageIndex(swiper.realIndex)
  }
  
  return (
    <>
      <h1>This is the Home</h1>

      <Swiper 
        effect={'cards'} 
        grabCursor={true} 
        modules={[EffectCards]}
        className="mySwiper"
        onSlideChange = {handleSlideChange}
      >
          {adminImages.map((image, index) => (
            <SwiperSlide key = {index} style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className = 'swiper-slide-content'>
                <img src={typeof image === 'object' ? URL.createObjectURL(image) : image } alt={`Image ${index + 1}`} style = {{ objectFit: 'cover'}}/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {adminDescriptions.length > 0 && (
          <h1> {adminDescriptions[currentImageIndex]} </h1>
        )}

      {user && (
        <>
          <p>This is Home {user.displayName}</p>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </>
      )}
      {!user && <Navigate to="/login" />}
     
    </>
  );
}
