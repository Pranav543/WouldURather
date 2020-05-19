import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends React.Component {
	render() {
		const { question, id, users } = this.props;

		return (
			<Link to={`/question/${id}`} className="link">
				<div className = "ui center aligned container">
					<div className="ui raised card">
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
							<div className="right floated author">
								<img
									className="ui avatar image"
									src={users[question.author].avatarURL}
									alt="http://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png"
								/>{' '}
								{question.author}
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

function mapStateToProps({ login, questions, users }, { id }) {
	return {
		loggedUser :
			login ? login.loggedUser :
			null,
		question   : questions[id],
		users
	};
}

export default connect(mapStateToProps)(Question);
