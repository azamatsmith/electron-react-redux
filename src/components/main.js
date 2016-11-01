import React, { Component} from 'react';
import {connect} from 'react-redux';
import {handleData} from '../actions/index';

class Main extends Component {
	constructor(props) {
		super(props);	
	}

	componentDidMount() {
		var event = new CustomEvent('mounted');	
		document.dispatchEvent(event);

		document.addEventListener('loadedData', (e) => {
			this.props.handleData(e.detail);
		}, false);
	}

	render() {
		return (
			<div>
				<p>This is the main component</p>
			</div>
		);	
	}	
}

export default connect(null, {handleData})(Main);

