import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import LoginPage from './LoginPage';
import { noOfQuestionsAsked, noOfQuestionsAnswered, totalQuestionsByUser } from '../utils/helper';

function LeaderBoard({ users, userIds, questions, loggedUser }) {
	if (loggedUser === null) {
		return <LoginPage />;
	}

	return (
		<div className = "ui center aligned container">
			<NavigationBar />
			<h2>LeaderBoard</h2>
			<ul>
				{userIds.map((userId) => (
					<div key={userId} className="ui card">
						<div className="content">
							<div className="center aligned header">{users[userId].name}</div>
							<div className="center aligned description">
								<h2>
									Total Points :{noOfQuestionsAsked(userId, questions) +
										noOfQuestionsAnswered(userId, questions)}{' '}
								</h2>
							</div>
						</div>
						<div className="extra content">
							<div className="center aligned author">
								<img
									className="ui avatar image"
									src={users[userId].avatarURL}
									alt="http://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png"
								/>{' '}
								{users[userId].name}
							</div>
						</div>
					</div>
				))}
			</ul>
		</div>
	);
}

function mapStateToProps({ users, questions, login }) {
	return {
		users,
		userIds    : Object.keys(users).sort(
			(a, b) => totalQuestionsByUser(b, questions) - totalQuestionsByUser(a, questions)
		),
		questions,
		loggedUser :
			login ? login.loggedUser :
			null
	};
}

export default connect(mapStateToProps)(LeaderBoard);
