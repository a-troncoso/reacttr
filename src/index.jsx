import React, {Component} from 'react'
// sólo traemos el método render de react-dom, por
// eso aparece entre {} (destructuring)
import {render} from 'react-dom'

// Automaticamente importa el index.jsx dentro de App
import App from './components/App'


render(<App />, document.getElementById('root'))