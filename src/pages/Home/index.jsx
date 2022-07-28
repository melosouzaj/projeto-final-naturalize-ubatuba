import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router';

import { useGeoLocation } from '../../hooks/useGeoLocation';

import api from '../../services';

import './styles.css'

import logo from '../../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: ""
  });

  const location = useGeoLocation();

  const getEvents = useCallback(async () => {
    try {
      const response = await api.get('islands');
      setEvents(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  if (loadError) {
    return <h1>Erro ao carregar o mapa</h1>;
  }

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='sidebarTop'>
          <img src={logo} alt="Naturalize Ubatuba" />
        </div>
        <div className='sidebarMiddle'>
          <h1>Escolha uma das ilha para visitar!
          </h1>
          <span>Descubra as maravilhas de ubatuba</span>
        </div>
        <div className='sidebarBottom'>
          <strong>Ubatuba</strong>
        </div>
      </div>

      <div className='mapArea'>
        {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          center={location.coordinates}
          zoom={12}
          options={{ zoomControl: false }}
        >
          {events.map(event => {
            return (
              <div key={event.id}>
                <Marker 
                  position={{ lat: event.latitude, lng: event.longitude }}
                  onClick={() => navigate('/evento', { state: event.id })}
                  opacity={1}
                />
              </div>
            )
          })}
        </GoogleMap>
        ) : (
          <h1>Carregando</h1>
        )}
      </div>
    </div>
  );
}

export { Home };