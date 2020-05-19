import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import NavigationBar from './NavigationBar';
import LoginPage from './LoginPage';

class AddQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayErrorMessage1 : false,
			displayErrorMessage2 : false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit() {
		const optionOneText = this.optionOne.value;
		const optionTwoText = this.optionTwo.value;
		const { loggedUser, handleAddQuestion } = this.props;

		this.setState({
			displayErrorMessage1 : false,
			displayErrorMessage2 : false
		});

		if (optionOneText && optionTwoText) {
			handleAddQuestion({
				optionOneText,
				optionTwoText,
				author        : loggedUser
			});

			this.props.history.push('/');
		}
		else {
			optionOneText === '' && this.setState(() => ({ displayErrorMessage1: true }));
			optionTwoText === '' && this.setState(() => ({ displayErrorMessage2: true }));
		}
	}

	render() {
		const { loggedUser } = this.props;
		const { displayErrorMessage1, displayErrorMessage2 } = this.state;

		if (loggedUser === null) {
			return <LoginPage />;
		}

		const errorMessage1 = {
			color   : 'red',
			display :
				displayErrorMessage1 ? 'block' :
				'none'
		};

		const errorMessage2 = {
			color   : 'red',
			display :
				displayErrorMessage2 ? 'block' :
				'none'
		};

		return (
			<div className = "ui center aligned container">
				<NavigationBar />
				<div className="ui card">
					<div className="content">
						<div className="header">Would You Rather...</div>
					</div>
					<div className="content">
						<h4 className="ui sub header">Option 1</h4>
						<div className="ui input">
							<input type="text" ref={(input) => (this.optionOne = input)} />
							<p style={errorMessage1}>* This is a mandatory field.</p>
						</div>
						<h4 className="ui sub header">Option 2</h4>
						<div className="ui input">
							<input type="text" ref={(input) => (this.optionTwo = input)} />
							<p style={errorMessage2}>* This is a mandatory field.</p>
						</div>
					</div>
					<div className="ui bottom attached button" onClick={this.handleSubmit}>
						<i className="add icon" />
						Add Question
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ login }) {
	return {
		loggedUser :
			login ? login.loggedUser :
			null
	};
}

export default withRouter(connect(mapStateToProps, { handleAddQuestion })(AddQuestion));
