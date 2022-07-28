import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SideBar } from '../../components/SideBar';
import api from '../../services';

import './styles.css';

const Event = () => {
  const [event, setEvent] = useState();

  const location = useLocation();
  console.log(location);

  const getEvent = useCallback(async () => {
    try {
      const response = await api.get(`/islands/${location.state}`);
      setEvent(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [location]);

  useEffect(() => {
    getEvent();
    window.scrollTo(0, 0);
  }, [getEvent]);

  return (
    <div className='container'>
      <SideBar goTo="/" />

      <div className='areaEvent'>
        <h4>Ilha de ubatuba</h4>

        <div className="card">
          {event?.image_url ? (
            <img src={event?.image_url} alt="Imagem de uma ilha" />
          ) : (
            <img src="https://www.madeireiraestrela.com.br/images/joomlart/demo/default.jpg" alt="Sem Imagem" />
          )}

          <div className="containerCard">
            <h1>{event?.name}</h1>

            <p>{event?.description}</p>

            <div className='line' />

            <h2 className='infoTitle'>Impactos ambientais</h2>
            <p>{event?.impacts} </p>

            <div className='line' />

            <h2 className='infoTitle'>Animais da região</h2>

            <div className='containerCardAnimals'>
              {event?.animals.map(animal => {
                return (
                  <div className='cardAnimals' key={animal.id}>
                    <h1>Nome: {animal.name}</h1>
                    <span>Nome Científico: {animal.scientific_name}</span>
                    <span>Status: {animal.status}</span>
                    <img src={animal.image_url} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Event };