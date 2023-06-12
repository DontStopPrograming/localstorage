import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

import { Link } from 'react-router-dom'

export function Admin() {
  const { user, logOut } = UserAuth();

  const cerrarSesion = async () => {
    try {
      await logOut();
      Navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const [taskCount, setTaskCount] = useState(0);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [editModes, setEditModes] = useState([]);

  const handleTaskCountChange = (e) => {
    const count = parseInt(e.target.value);
    setTaskCount(count);
    setImages(Array(count).fill(null));
    setDescriptions(Array(count).fill(''));
    setEditModes(Array(count).fill(false));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      const updatedImages = [...images];
      updatedImages[index] = imageDataUrl;
      setImages(updatedImages);

      localStorage.setItem('adminImages', JSON.stringify(updatedImages));
    };

    reader.readAsDataURL(file);
  };

  const handleImageDescriptionChange = (e, index) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = e.target.value;
    setDescriptions(updatedDescriptions);
  };

  const handleImageSubmit = (index) => {
    const updatedEditModes = [...editModes];
    updatedEditModes[index] = false;
    setEditModes(updatedEditModes);
  };

  const handleImageEdit = (index) => {
    const updatedEditModes = [...editModes];
    updatedEditModes[index] = true;
    setEditModes(updatedEditModes);
  };

  useEffect(() => {
    const storedTaskCount = localStorage.getItem('adminTaskCount');
    const storedImages = localStorage.getItem('adminImages');
    const storedDescriptions = localStorage.getItem('adminDescriptions');

    if (storedTaskCount) {
      setTaskCount(parseInt(storedTaskCount));
    }

    if (storedImages && storedDescriptions) {
      setImages(JSON.parse(storedImages));
      setDescriptions(JSON.parse(storedDescriptions));
    }
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem('adminTaskCount', taskCount.toString());
    localStorage.setItem('adminImages', JSON.stringify(images));
    localStorage.setItem('adminDescriptions', JSON.stringify(descriptions));
    alert('Se han guardado los cambios');
  };

  return (
    <>
      <h1>This is Admin</h1>
      {user && (
        <div>
          <p>THIS IS ADMIN {user.displayName}</p>

          <label htmlFor='taskCount'>Cantidad de tareas </label>
          <input
            type='number'
            id='taskCount'
            value={taskCount}
            onChange={handleTaskCountChange}
          />

          {taskCount > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${taskCount}, 1fr)`, gap:'10px', marginTop: '20px' }}>
              {Array(taskCount)
                .fill()
                .map((_, index) => (
                  <div key={index} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '400px',
                      height: '500px',
                      padding: '10px 20px',
                      background: '#232323',
                      color: '#fff',
                      fontSize: '1.2rem'
                      }}
                    >
                    {/* Modificación: Se verifica si la imagen es un objeto o una cadena */}
                    {images[index] && (
                      <>
                        <div style={{ height:'50%', overflow:'hidden'}}>
                          {/* Modificación: Se utiliza URL.createObjectURL para mostrar la imagen */}
                          <img src={typeof images[index] === 'object' ? URL.createObjectURL(images[index]) : images[index]} alt="imagen" style={{ width: '100%', height: '100%' }} />
                        </div>

                        <div style={{ height:'50%', overflow:'hidden'}}>
                          <p style={{ wordWrap: 'break-word' }}>{descriptions[index]}</p>
                        </div>

                        {editModes[index] ? (
                          <>
                            <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, index)} />
                            <input
                              type='text'
                              placeholder='Descripción de la imagen'
                              value={descriptions[index]}
                              onChange={(e) => handleImageDescriptionChange(e, index)}
                            />
                            <button onClick={() => handleImageSubmit(index)}>Aceptar</button>
                          </>
                        ) : (
                          <button onClick={() => handleImageEdit(index)}>Editar</button>
                        )}
                      </>
                    )}
                    {!images[index] && (
                      <>
                        <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, index)} />
                        <input
                          type='text'
                          placeholder='Descripción de la imagen'
                          value={descriptions[index] || ''}
                          onChange={(e) => handleImageDescriptionChange(e, index)}
                        />
                        {descriptions[index] && <p style={{ wordWrap: 'break-word' }}>{descriptions[index]}</p>}
                        <button onClick={() => handleImageSubmit(index)}>Aceptar</button>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
          <button onClick={handleSaveChanges}>Guardar cambios</button>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
      )}
      {!user && <Navigate to="/login" />}
      <button>
        <Link to = '/home'> Ir al Home </Link>
      </button>
    </>
  );
}
