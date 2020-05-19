import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';

class LoginPage extends React.Component {
	handleClick = (userId) => {
		this.props.login(userId);
	};

	render() {
		const { users } = this.props;

		return (
			<div className="ui three column grid ">
				{Object.keys(users).map((key) => (
					<div>
						<div className="column">
							<div className="ui fluid card">
								<div className="image">
									<img
										src={users[key].avatarURL}
										alt="http://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png"
									/>
								</div>
								<div className="content">
									<a key={key} onClick={() => this.handleClick(key)} className="header">
										{users[key].name}
									</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users
	};
}
export default connect(mapStateToProps, { login })(LoginPage);
