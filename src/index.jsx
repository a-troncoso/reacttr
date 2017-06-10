import React, {Component} from 'react'
// sólo traemos el método render de react-dom, por
// eso aparece entre {} (destructuring)
import {render} from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyAWRiaZbS4In2cqFUE_JIx5cXKNgaL3hms',
  authDomain: 'curso-react-e6f5f.firebaseapp.com',
  databaseURL: 'https://curso-react-e6f5f.firebaseio.com',
  projectId: 'curso-react-e6f5f',
  storageBucket: 'curso-react-e6f5f.appspot.com',
  messagingSenderId: '109415647511'
})

// Automaticamente importa el index.jsx dentro de App
import App from './components/App'


render(<App />, document.getElementById('root'))