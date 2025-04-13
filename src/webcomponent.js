import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import App from './App';

const MyElement = reactToWebComponent(App, React, ReactDOM, {
  shadow: false,
  props: ['vertrkey']
});

customElements.define('tribemotorakte-react-app', MyElement);
