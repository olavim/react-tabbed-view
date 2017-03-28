import React from 'react';

export default class TabContent extends React.Component {
	static propTypes = {
		children: React.PropTypes.any
	};

	render() {
		const {children, ...other} = this.props;

		return (
			<div {...other}>
				{children}
			</div>
		);
	}
}
