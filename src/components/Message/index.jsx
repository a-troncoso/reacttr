import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import styles from './message.css'

// el objeto PropTypes de React, nos sirve para definir los tipos de datos y si son requeridas 
// las propiedades que almacenarán las propiedades del componentes

const propTypes = {
	onRetweet: PropTypes.func.isRequired,
	onReplyTweet: PropTypes.func.isRequired,
	onFavorite: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	date: PropTypes.number.isRequired,
	numRetweets: PropTypes.number.isRequired,
	numFavorites: PropTypes.number.isRequired
}

class Message extends Component {
	constructor(props) {
		super(props)

		this.state = {
			pressFavorite: false,
			pressRetweet: false
		}

		this.onPressRetweet = this.onPressRetweet.bind(this)
		this.onPressFavorite = this.onPressFavorite.bind(this)
	}

	onPressRetweet() {
		this.props.onRetweet()
		this.setState({
			pressRetweet: true
		})
	}
	onPressFavorite() {
		this.props.onFavorite()
		this.setState({
			pressFavorite: true
		})
	}

	render() {

		let dateFormat = moment(this.props.date).fromNow()
		let userLink = `/user/${this.props.username}`
		return(
				<div className={styles.root}>
					<div className={styles.user}>
						<Link to={userLink}>
							<figure>
								<img className={styles.avatar} src={this.props.picture} />
							</figure>
						</Link>
						<span className={styles.displayName}>{this.props.displayName}</span>
						<span className={styles.username}>{this.props.username}</span>
						<span className={styles.date}>{dateFormat}</span>
						{this.props.text}
					</div>
					<h3>{this.props.text}</h3>
					<div className={styles.buttons}>
						<div
							className={styles.icon}
							onClick={this.props.onReplyTweet}
						>
						<span className={'fa fa-reply'}></span></div>
						<div
							className={(this.state.pressRetweet) ? styles.rtGreen : ''}
							onClick={this.onPressRetweet}
							>
							<span className={'fa fa-retweet'}></span>
							<span className={styles.num}>{this.props.numRetweets}</span>
						</div>
						<div
							className={(this.state.pressFavorite) ? styles.favYellow : ''}
							onClick={this.onPressFavorite}
							>
							<span className={'fa fa-star'}></span>
							<span className={styles.num}>{this.props.numFavorites}</span>
						</div>
					</div>
				</div>
			)
	}

}

Message.propTypes = propTypes

export default Message