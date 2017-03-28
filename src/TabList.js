import React from 'react';
import Tab from './Tab';

export default class TabList extends React.Component {
	static propTypes = {
		tabs: React.PropTypes.any.isRequired
	};

	render() {
		const {tabs, ...other} = this.props;

		return (
			<div {...other}>
				{tabs}
			</div>
		);
	}
}
