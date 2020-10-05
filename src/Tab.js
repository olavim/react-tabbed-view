import React from 'react';
import PropTypes from 'prop-types';
import TabContent from './TabContent';
import TabTitle from './TabTitle';

export default class Tab extends React.Component {
	static propTypes = {
		tabKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		children: (props, propName, componentName) => {
			const prop = props[propName];

			const numChildren = React.Children.count(prop);
			if (numChildren !== 2) {
				return new Error('`' + componentName + '` expected two children; ' + numChildren + ' found.');
			}

			const childArr = React.Children.toArray(prop);
			if (childArr[0].type === childArr[1].type) {
				return new Error('`' + componentName + '` should have a child of type `TabTitle` and `TabContent`.');
			}

			if ((childArr[0].type !== TabTitle && childArr[0].type !== TabContent) ||
					(childArr[1].type !== TabTitle && childArr[1].type !== TabContent)) {
				return new Error('`' + componentName + '` should have a child of type `TabTitle` and `TabContent`.');
			}

			return null;
		}
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
