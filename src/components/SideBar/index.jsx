import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.png';

const SideBar = ({ goTo }) => {
  const navigate = useNavigate();

  return (
    <div className="containerSideBar">
      <div className="areaTop">
        <img src={logo} alt="Naturalize Ubatuba" />
      </div>
      <div className="areaBottom">
        <button onClick={() => navigate(goTo)}>
          <FiArrowLeft size={22} color="#FFF" />
        </button>
      </div>
    </div>
  );
}

export { SideBar };