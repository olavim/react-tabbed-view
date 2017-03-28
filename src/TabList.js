import React from 'react';
import Tab from './Tab';

export default class TabList extends React.Component {
	static propTypes = {
		tabs: (props, propName, componentName) => {
			const prop = props[propName];

			let error = null;
			React.Children.forEach(prop, child => {
				if (child.type !== Tab) {
					error = new Error('`' + componentName + '` children should be of type `Tab`.');
				}
			});

			return error;
		}
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
