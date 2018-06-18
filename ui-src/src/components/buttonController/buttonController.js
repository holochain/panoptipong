import React, { Component } from "react";
import "./buttonController.css";


class buttonController extends Component {
	static propTypes = {
		upCount: React.PropTypes.number,
		stayCount: React.PropTypes.number,
		downCount: React.PropTypes.number
	};

	// static defaultProps = {
	// 	upCount: 0,
	// 	stayCount: 0,
	// 	downCount: 0
	// };

	constructor(props) {
		super(props);
		this.state = {
			upCount: 0,
			stayCount: 0,
			downCount: 0
		};
	}


	handleInputChange = event => {
	    const { name, value } = event.target;   
	    if (name === "upCount"){
	    	value += 1
	    }
	   	else if (name === "downCount"){
	    	value -= 1
	    }
	    this.setState({
	      [name]: value
	    });
	}

	render() {
		return (
			<div>
				<ul>
					<li className="button" bsStyle="success" bsSize="large" value={this.state.upCount} onclick={this.handleChange}>
						Up
					</li>
					<li className="button" bsStyle="warning" bsSize="large" value={this.state.stayCount} onclick={this.handleChange}>
						Stay
					</li>
					<li>
						<button className="button" bsStyle="danger" bsSize="large" value={this.state.downCount} onclick={this.handleChange}>
							Down
						</button>
					</li>
				</ul>
			</div>
		);
	}
}

export default buttonController;

