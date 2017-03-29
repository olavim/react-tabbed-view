import React from 'react';
import Tab from './Tab';
import TabContent from './TabContent';
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
		renderTab: (children, tabKey, props) => <div {...props}>{children}</div>,
		renderTabList: children => <div>{children}</div>,
		renderTabContent: (children, tabKey, props) => <div {...props}>{children}</div>
	};

	handleClickTab = (evt, tabKey) => {
		if (tabKey !== JSON.stringify(this.props.selectedKey)) {
			this.props.onChange(evt, tabKey);
		}
	};

	handleKeyDown = (evt, tabKey) => {
		const tabs = React.Children.toArray(this.props.children);
		const index = tabs.findIndex(tab => tab.props.tabKey === tabKey);

		if (evt.keyCode === 37 && index > 0) {
			// Left arrow
			this.props.onChange(evt, tabs[index - 1].props.tabKey);
		} else if (evt.keyCode === 37 && index < tabs.length - 1) {
			// Right arrow
			this.props.onChange(evt, tabs[index + 1].props.tabKey);
		} else if (evt.keyCode === 9) {
			// Tab
			this.props.onChange(evt, tabs[index % tabs.length].props.tabKey);
		}
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
			const {children, tabKey: _tabKey} = tab.props;
			const tabKey = JSON.stringify(_tabKey);
			entries[tabKey] = {};

			React.Children.forEach(children, child => {
				if (child.type === TabTitle) {
					entries[tabKey].title = child;
				} else if (child.type === TabContent) {
					entries[tabKey].content = child;
				}
			});
		});

		const tabs = Object.entries(entries).map(([key, value]) => {
			const {children, onClick, onKeyDown, ...other} = value.title.props;
			let _onClick = evt => this.handleClickTab(evt, key);
			let _onKeyDown = evt => this.handleKeyDown(evt, key);

			if (typeof onClick === 'function') {
				_onClick = evt => {
					const ret = onClick(evt, key);
					if (ret !== false) {
						this.handleClickTab(evt, key);
					}
				};
			}

			if (typeof onKeyDown === 'function') {
				_onKeyDown = evt => {
					const ret = onKeyDown(evt, key);
					if (ret !== false) {
						this.handleKeyDown(evt, key);
					}
				};
			}

			return renderTab(children, key, Object.assign({
				key,
				onClick: _onClick,
				onKeyDown: _onKeyDown
			}, other));
		});

		const tabList = renderTabList(tabs);

		const tabContentList = Object.entries(entries).map(([key, value]) => {
			const selected = key === selectedKey;
			const {children, style, ...other} = value.content.props;
			return renderTabContent(children, key, Object.assign({
				key,
				style: Object.assign({display: selected ? undefined : 'none'}, style)
			}, other));
		});

		return (
			<div {...other}>
				{tabList}
				{tabContentList}
			</div>
		);
	}
}
