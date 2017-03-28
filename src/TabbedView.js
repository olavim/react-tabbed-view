import React from 'react';
import Tab from './Tab';
import TabContent from './TabContent';
import TabList from './TabList';
import TabTitle from './TabTitle';

export default class TabbedView extends React.Component {
	static propTypes = {
		selectedKey: React.PropTypes.any.isRequired,
		onChange: React.PropTypes.func.isRequired,
		renderTab: React.PropTypes.func,
		renderTabList: React.PropTypes.func,
		renderTabContent: React.PropTypes.func,
		children: (props, propName, componentName) => {
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

	static defaultProps = {
		renderTab: (children, props) => <div {...props}>{children}</div>,
		renderTabList: tabList => tabList,
		renderTabContent: (children, props) => <div {...props}>{children}</div>
	};

	render() {
		const {
			children,
			onChange,
			selectedKey,
			renderTab,
			renderTabList,
			renderTabContent,
			...other
		} = this.props;

		const entries = {};

		React.Children.forEach(children, tab => {
			const tabKey = tab.props.tabKey;
			entries[tabKey] = {};

			React.Children.forEach(tab.props.children, child => {
				if (child.type === TabTitle) {
					entries[tabKey].title = child;
				} else if (child.type === TabContent) {
					entries[tabKey].content = child;
				}
			});
		});

		const tabs = Object.entries(entries).map(([key, value]) => {
			return renderTab(value.title, {
				key,
				onClick: evt => onChange(evt, key),
				selected: key === selectedKey
			});
		});

		const tabList = renderTabList(<TabList tabs={tabs} />);

		const tabContentList = Object.entries(entries).map(([key, value]) => {
			const selected = key === selectedKey;

			return renderTabContent(value.content, {
				key,
				style: {display: selected ? undefined : 'none'},
				selected
			});
		});

		return (
			<div {...other}>
				{tabList}
				{tabContentList}
			</div>
		);
	}
}
