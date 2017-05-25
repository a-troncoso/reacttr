import React, { Component} from 'react'
import {HashRouter, Match} from 'react-router'

import 'normalize-css'
import styles from './app.css'
import Header from '../Header'
import Main from '../Main'

class App extends Component {

	constructor() {
		super()

		this.state = {
			user: {
				photoURL: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
				email: 'alvaro.mc2@gmail.com',
				displayName: 'Alvarito'
			}
		}
	}
	render () {
		return (
			<HashRouter>
				<div>
					<Header />
					<Match exactly pattern='/' render={() => {
					 	if(this.state.user) {
					 		return (
								<Main user={this.state.user}/>
					 	 	)
					 	} else {
					 		// Render <Login />
					 	}
					}} />
					<Match pattern='/profile' render={() => {
						// Renderizar <Profile />
					}} />

					<Match pattern='/user/:username' render={({params}) => {
						// Renderizar <Profile /> pasando params.username
					}} />
				</div>
			</HashRouter>
			)
	}
}

export default App