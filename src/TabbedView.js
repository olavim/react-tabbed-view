import React from 'react';
import classNames from 'classnames';
import Tab from './Tab';
import TabContent from './TabContent';
import TabTitle from './TabTitle';

export default class TabbedView extends React.Component {
	static propTypes = {
		selectedKey: React.PropTypes.any,
		onChange: React.PropTypes.func,
		tabListClassName: React.PropTypes.string,
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
		selectedKey: null,
		onChange: () => {},
		renderTab: (children, tabKey, props) => <div {...props}>{children}</div>,
		renderTabList: (children, props) => <div {...props}>{children}</div>,
		renderTabContent: (children, tabKey, props) => <div {...props}>{children}</div>
	};

	handleClickTab = (evt, tabKey) => {
		if (tabKey !== JSON.stringify(this.props.selectedKey)) {
			this.props.onChange(evt, tabKey);
		}
	};

	render() {
		const {
			children,
			selectedKey,
			onChange,
			tabListClassName,
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
			const tabKey = JSON.parse(key);
			const {children, onClick, className, selectedClassName, ...other} = value.title.props;
			let _onClick = evt => this.handleClickTab(evt, tabKey);

			if (typeof onClick === 'function') {
				_onClick = evt => {
					const ret = onClick(evt, tabKey);
					if (ret !== false) {
						this.handleClickTab(evt, tabKey);
					}
				};
			}

			return renderTab(children, tabKey, Object.assign({
				key: tabKey,
				onClick: _onClick,
				className: classNames(className, {
					[selectedClassName]: tabKey === this.props.selectedKey
				})
			}, other));
		});

		const tabList = renderTabList(tabs, {className: tabListClassName});

		const tabContentList = Object.entries(entries).map(([key, value]) => {
			const tabKey = JSON.parse(key);
			const selected = tabKey === selectedKey;
			const {children, style, className, selectedClassName, ...other} = value.content.props;
			return renderTabContent(children, tabKey, Object.assign({
				key: tabKey,
				style: Object.assign({display: selected ? undefined : 'none'}, style),
				className: classNames(className, {
					[selectedClassName]: tabKey === this.props.selectedKey
				})
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
