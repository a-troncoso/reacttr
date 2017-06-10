import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import firebase from 'firebase'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
	user: PropTypes.object.isRequired,
	onLogout: PropTypes.func.isRequired
}

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: Object.assign({}, this.props.user, {retweets: []}, {favorites: []}),
			openText: false,
			unsernameToReply: '',
			messages: []
		}

		this.handleSendText = this.handleSendText.bind(this)
		this.handleCloseText = this.handleCloseText.bind(this)
		this.handleOpenText = this.handleOpenText.bind(this)
		this.handleRetweet = this.handleRetweet.bind(this)
		this.handleFavorite = this.handleFavorite.bind(this)
		this.handleReplyTweet = this.handleReplyTweet.bind(this)
	}

	componentWillMount() {
		// firebase.databse().ref() -> referencia a la base de datos
		const messageRef = firebase.database().ref().child('messages')

		// child_added -> evento q se ejecuta cada vez q se agrega algo a la bd
		// snapshot -> captura de la bd en ese momento
		// napshot.val() -> valor q contiene snapshot
		messageRef.on('child_added', snapshot => {
			this.setState({
				messages: this.state.messages.concat(snapshot.val()),
				openText: false
			})
		})

	}

	handleSendText(event) {
		event.preventDefault();

		let newMessage = {
			id: uuid.v4(),
			text: event.target.text.value,
			picture: this.props.user.photoURL,
			username: this.props.user.email.split('@')[0],
			displayName: this.props.user.displayName,
			date: Date.now(),
			retweets: 0,
			favorites: 0
		}

		const messageRef = firebase.database().ref().child('messages')
		const messageID = messageRef.push()
		messageID.set(newMessage)

		// this.setState({
		// 	messages: this.state.messages.concat([newMessage]),
		// 	openText: false
		// })
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
				onOpenText={this.handleOpenText}
				onLogout={this.props.onLogout}
				/>
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