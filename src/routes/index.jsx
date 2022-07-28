import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Event } from '../pages/Event';

const RoutesApp = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/evento" element={<Event />} />
  </Routes>
);

export { RoutesApp };