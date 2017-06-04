import React from 'react'
import styles from './header.css'

// Componente stateless, no es necesario que extienda de Component,
// ya que Header es solo representacional porque no utiliza un constructor ni estado, nada propio de un component
// Esto hace que la app sea mas ligera
function Header() {
	return (
		<header className={styles.root}>
			<h1 className={styles.logo} >Reacttr</h1>
		</header>
		)
}

export default Header