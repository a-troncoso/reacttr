import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import 'normalize-css'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
	user: PropTypes.object.isRequired
}

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: Object.assign({}, this.props.user, {retweets: []}, {favorites: []}),
			openText: false,
			unsernameToReply: '',
			messages: [{
				id: uuid.v4(),
				text: 'Mensaje de Álvaro',
				picture: 'https://randomuser.me/api/portraits/thumb/men/50.jpg',
				displayName: 'Álvaro Troncoso',
				username: 'Alvarito',
				date: Date.now() - 180000,
				retweets: 0,
				favorites: 0
			}, {
				id: uuid.v4(),
				text: 'Mensaje de Mary',
				picture: 'https://randomuser.me/api/portraits/thumb/women/50.jpg',
				displayName: 'Mary Zuaznabar',
				username: 'Zarita',
				date: Date.now(),
				retweets: 0,
				favorites: 0
			}, {
				id: uuid.v4(),
				text: 'Mensaje de Mila',
				picture: 'https://randomuser.me/api/portraits/thumb/women/51.jpg',
				displayName: 'Mila Troncoso',
				username: 'Le wawé',
				date: Date.now(),
				retweets: 0,
				favorites: 0
			}]
		}

		this.handleSendText = this.handleSendText.bind(this)
		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleRetweet = this.handleRetweet.bind(this)
		this.handleFavorite = this.handleFavorite.bind(this)
		this.handleReplyTweet = this.handleReplyTweet.bind(this)
	}

	handleSendText(event) {
		event.preventDefault();
		let newMessage = {
			id: uuid.v4(),
			username: this.props.user.email.split('@')[0],
			displayName: this.props.user.displayName,
			picture: this.props.user.photoURL,
			date: Date.now(),
			text: event.target.text.value
		}

		this.setState({
			messages: this.state.messages.concat([newMessage]),
			openText: false
		})
	}
	handleCloseText(event) {
		event.preventDefault();
		this.setState({openText: false})
	}
	handleOpenText (event) {
		event.preventDefault()
		this.setState({ openText: true})
	}
	handleRetweet(msgId) {
		let alreadyRetweeted = this.state.user.retweets.filter( rt => rt === msgId)

		if(alreadyRetweeted.length === 0) {
			let messages = this.state.messages.map(msg => {
				if(msg.id === msgId) msg.retweets++
				return msg
			})

			let user = Object.assign({}, this.state.user)
			user.retweets.push(msgId)

			this.setState({
				messages,
				user
			})
		}
	}
	handleFavorite(msgId) {
		let alreadyFavorite = this.state.user.favorites.filter(fav => fav === msgId)
		if(alreadyFavorite.length === 0) {
			let messages = this.state.messages.map(msg => {
				if(msg.id === msgId) msg.favorites++
				return msg
			})

			let user = Object.assign({}, this.state.user)
			user.favorites.push(msgId)

			this.setState({
				messages,
				user
			})
		}
	}
	handleReplyTweet(msgId, unsernameToReply) {
		this.setState({
			openText: true,
			unsernameToReply
		})
	}
	renderOpenText() {
		if(this.state.openText) {
			return (
				<InputText
					onSendText={this.handleSendText}
					onCloseText={this.handleCloseText}
					unsernameToReply={this.state.unsernameToReply}
				/>
			)}
	}

	render() {
		return (
			<div>
				<ProfileBar
				picture={this.props.user.photoURL}
				username={this.props.user.email.split('@')[0]}
				onOpenText={this.handleOpenText}/>
				{this.renderOpenText()}
				<MessageList
					messages={this.state.messages}
					onRetweet={this.handleRetweet}
					onFavorite={this.handleFavorite}
					onReplyTweet={this.handleReplyTweet}
					/>
			</div>
			)
	}
}

Main.propTypes = propTypes

export default Main