import React from 'react';
import PropTypes from 'prop-types';

export default class TabTitle extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		selectedClassName: PropTypes.string
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
