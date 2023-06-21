// Admin.js
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

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
  const [lastUpdated, setLastUpdated] = useState(0);

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
    setLastUpdated(Date.now());
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
    const storedLastUpdated = localStorage.getItem('lastUpdated');

    if (storedTaskCount) {
      setTaskCount(parseInt(storedTaskCount));
    }

    if (storedImages && storedDescriptions) {
      setImages(JSON.parse(storedImages));
      setDescriptions(JSON.parse(storedDescriptions));
    }

    if (storedLastUpdated) {
      setLastUpdated(parseInt(storedLastUpdated));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminTaskCount', taskCount.toString());
    localStorage.setItem('adminImages', JSON.stringify(images));
    localStorage.setItem('adminDescriptions', JSON.stringify(descriptions));
    localStorage.setItem('lastUpdated', lastUpdated.toString());
  }, [taskCount, images, descriptions, lastUpdated]);

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
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${taskCount}, 1fr)`, gap: '10px', marginTop: '20px' }}>
              {Array(taskCount)
                .fill()
                .map((_, index) => (
                  <div key={index} style={{ display: 'flex',
                  flexDirection: 'column',
                  width: '250px',
                  height: '250px',
                  padding: '10px 20px',
                  background: '#232323',
                  color: '#fff',
                  fontSize: '1.2rem', }}>
                    <input type='file' onChange={(e) => handleImageChange(e, index)} />
                    {images[index] && <img src={images[index]} alt='task' style={{ width: '100px' }} />}
                    <textarea value={descriptions[index]} onChange={(e) => handleImageDescriptionChange(e, index)}></textarea>
                    {!editModes[index] ? (
                      <button onClick={() => handleImageEdit(index)}>Editar</button>
                    ) : (
                      <button onClick={() => handleImageSubmit(index)}>Guardar cambios</button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
