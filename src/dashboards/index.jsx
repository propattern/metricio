import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import HealthCheck from '../widgets/healthcheck/widget';

ReactDOM.render(
  <Dashboard>
    <HealthCheck name="LocalHealth" title="Health (Local)" />
    <HealthCheck name="DevHealth" title="Health (Dev)" />
    <HealthCheck name="TestHealth" title="Health (Test)" />
    <HealthCheck name="PreProdHealth" title="Health (PreProd)" />
    <HealthCheck name="ProdHealth" title="Health (Prod)" />
  </Dashboard>,
  document.getElementById('content'),
);
