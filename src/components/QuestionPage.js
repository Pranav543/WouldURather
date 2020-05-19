import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleAnswerPoll } from '../actions/questions';
import LoginPage from './LoginPage';
import FourOFour from './FourOFour';

class QuestionPage extends React.Component {
	submitAnswer = (option) => {
		const { handleAnswerPoll, loggedUser, id } = this.props;

		handleAnswerPoll({
			authedUser : loggedUser,
			qid        : id,
			answer     : option
		});
	};

	render() {
		const { loggedUser, question, users } = this.props;

		if (loggedUser === null) {
			return <LoginPage />;
		}

		if (question === null) {
			return <FourOFour />;
		}

		const optionSelectedByUser = isPollAnsweredByCurrentUser(loggedUser, question);
		const op1Percent = (optionSelectedByUser.numberOfOptionOneVotes.length /
			(optionSelectedByUser.numberOfOptionOneVotes.length + optionSelectedByUser.numberOfOptionTwoVotes.length) *
			100).toPrecision(3);

		const op2Percent = (optionSelectedByUser.numberOfOptionTwoVotes.length /
			(optionSelectedByUser.numberOfOptionOneVotes.length + optionSelectedByUser.numberOfOptionTwoVotes.length) *
			100).toPrecision(3);

		const renderQuestion =
			optionSelectedByUser.answered ? <div className="ui card">
				<div className="image">
					<img
						src={users[question.author].avatarURL}
						alt="http://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png"
					/>
				</div>
				<div className="content">
					<div className="header">Would You Rather...</div>
					<h3>Your selection is: {question[optionSelectedByUser.optionSelected].text}</h3>
					<div className="description">
						<div className="ui segments">
							<div className="ui segment">
								<p>
									<font>
										<font>{question.optionOne.text}</font>
									</font>
								</p>
							</div>
							<div className="ui red segment">
								<p>
									<font>
										<font>{question.optionTwo.text}</font>
									</font>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="extra content">
					<div class="ui indicating progress" data-percent={`${op1Percent}`}>
						<div class="bar" style={{ width: `${op1Percent}%` }} />
						<div class="label">Option 1</div>
					</div>
					<div class="ui indicating progress" data-percent={`${op2Percent}`}>
						<div class="bar" style={{ width: `${op2Percent}%` }} />
						<div class="label">Option 2</div>
					</div>
				</div>
			</div> :
			<div className="ui card">
				<div className="image">
					<img
						src={users[question.author].avatarURL}
						alt="http://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png"
					/>
				</div>
				<div className="content">
					<div className="header">Would You Rather...</div>

					<div className="description">
						<div className="ui segments">
							<div className="ui segment">
								<p>
									<font>
										<font>{question.optionOne.text}</font>
									</font>
								</p>
							</div>
							<div className="ui red segment">
								<p>
									<font>
										<font>{question.optionTwo.text}</font>
									</font>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="extra content">
					<div className="ui two buttons">
						<div className="ui basic blue button" onClick={() => this.submitAnswer('optionOne')}>
							Option 1
						</div>
						<div className="ui basic olive button" onClick={() => this.submitAnswer('optionTwo')}>
							Option 2
						</div>
					</div>
				</div>
			</div>;

		return (
			<div className = "ui center aligned container">
				{renderQuestion}
				<Link to="/" className="button" style={{ marginLeft: '35px' }}>
					Home
				</Link>
			</div>
		);
	}
}

function isPollAnsweredByCurrentUser(loggedUser, question) {
	let answered = question.optionOne.votes.includes(loggedUser) || question.optionTwo.votes.includes(loggedUser);
	return {
		answered,
		optionSelected         :
			answered ? question.optionOne.votes.includes(loggedUser) ? 'optionOne' :
			'optionTwo' :
			null,
		numberOfOptionOneVotes : question.optionOne.votes,
		numberOfOptionTwoVotes : question.optionTwo.votes
	};
}

function mapStateToProps({ questions, users, login }, props) {
	const { id } = props.match.params;
	const question =
		questions[id] ? questions[id] :
		null;

	return {
		loggedUser :
			login ? login.loggedUser :
			null,
		question,
		id,
		users
	};
}

export default connect(mapStateToProps, { handleAnswerPoll })(QuestionPage);
