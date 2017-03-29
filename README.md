# React TabbedView

A highly customizable, barebones React tab component.

This is not a component you can simply plug in and be satisfied. There are
no default styles; everything except the actual functionality is left to you,
the user, to implement. Since there are no default styles, it's been made
as easy as possible for you to define them.

## Install

```
$ npm install --save react-tabbed-view
```

## Features

* Highly customizable - no default styles that you would just override anyways.
Even the default handling of tab changes can be overridden.
    * However, not needlessly verbose when you don't need the extra oomph.
* No mounts/unmounts between changing tabs **by default** - non-active tabs are simply
made invisible with css `{display: none}`. This is the only time we touch the style
of a component. This can be changed so that remounts will happen.

## Usage

```js
import React from 'react';
import {TabbedView, Tab, TabTitle, TabContent} from 'react-tabbed-view';

class Component extends React.Component {
  state = {
    selectedKey: 'home'
  }

  handleTabChange = (evt, key) => {
    this.setState({selectedKey: key});
  }

  render() {
    return (
      <TabbedView 
        className="tab-container"
        selectedKey={this.state.selectedKey} 
        onChange={this.handleTabChange}
        renderTab={(children, props) => <div {...props}>{children}</div>}
        renderTabList={children => <div {...props}>{children}</div>}
        renderTabContent={(children, props) => <div {...props}>{children}</div>}
      >
        <Tab tabKey="home">
          <TabTitle className="tab-title">Home</TabTitle>
          <TabContent className="tab-content">
            <h2>Hello World!</h2>
            <p>Lorem ipsum...</p>
          </TabContent>
        </Tab>
        <Tab tabKey="about">
          <TabTitle className="tab-title">This is the title</TabTitle>
          <TabContent className="tab-content">
            This is the content.
          </TabContent>
        </Tab>
      </TabbedView>
    );
  }
}
```

## Components

#### TabbedView

The root component. Children should be *Tab* components.

**Prop**|**Type**|**Description**
--------|--------|---------------
`selectedKey`|*any, required*|Key of the selected tab. If a tab with such key<br>cannot be found, then none of the tabs will be<br>selected.
`onChange`|*func, required*|A callback function that will be called when a<br>non-selected tab should be selected. Called when<br>a tab is clicked, or when navigated to through<br>keyboard events.
`tabListClassName`|*string*|className of the element wrapping all the tabs.<br>Use this to set the className of the tab list element<br>if you don't want to define the whole render function<br>for it.
`renderTab`|*func*|A callback that determines how a tab should be rendered.
`renderTabList`|*func*|A callback that determines how the component wrapping<br>all of the tabs should be rendered.
`renderTabContent`|*func*|A callback that determines how the contents of the<br>selected tab should be rendered.

**Rendering callbacks**

The props `renderTab`, `renderTabList` and `renderTabContent` should be given
special attention. They determine how you want your tabs to behave and look,
and even give you a change to override default functionality.

**Function**|**Parameters**|**Default return value**|**Notes**
------------|--------------|------------------------|---------
`renderTab`|*children*, *tabKey*, *props*|`<div {...props}>{children}</div>`|`props` are the props you give to the *TabTitle* component,<br>plus the properties `onClick` and `onKeyDown`.
`renderTabList`|*children*|`<div>{children}</div>`| 
`renderTabContent`|*children*, *tabKey*, *props*|`<div {...props}>{children}</div>`|`props` are the props you give to the *TabContent* component,<br>plus the property `style`.

As you can see, you can even choose to override the `onClick` and `onKeyDown` events
on the tabs; the two events that can fire the `onChange` callback prop you gave to
*TabbedView*.

You might want the contents of a tab to fire a remount on tab change. You can do this.
You simply need to return `null` in the `renderTabContent` function when the tab is not active.

You might not want to modify the intricate details of the components (they can be
needlessly verbose). Props given to *TabTitle* will be passed to the render function
`renderTab`, and props given to *TabContent* will be given to the render function
`renderTabContent`. This way you don't have to define the whole rendering procedure
for simply setting a class name.

#### Tab

Determines the title and contents of a single tab. The children should consist of
**one *TabTitle***, and **one *TabContent***, although they can be in any order.

**Prop**|**Type**|**Description**
--------|--------|---------------
`tabKey`|*any, required*|Key of the tab. *TabbedView* uses this to determine the selected tab.

*Tab* determines the logical grouping of a title and content. In reality
the titles will be grouped together inside a tab list (whose rendering you can
control by defining the `renderTabList` function on the *TabbedView* component),
and the contents will be one after the other next to the tab list.

#### TabTitle

Should go inside a *Tab* component.
The contents of this component determine the title of that tab.

**Prop**|**Type**|**Description**
--------|--------|---------------
`selectedClassName`|*string*|If the tab this component is inside of is selected, this prop<br>will be appended to the className of this component.

If you specify the `onClick` prop, they will be called with the original *event* 
and *tabKey* parameters **before** the default `onClick` handler. If you return 
`false` from your own `onClick` handler, the respective default event handler 
will not be called.

#### TabContent

Should go inside a *Tab* component.
The contents of this component determine the contents of that tab.

**Prop**|**Type**|**Description**
--------|--------|---------------
`selectedClassName`|*string*|If the tab this component is inside of is selected, this prop<br>will be appended to the className of this component.

**Note** that specifying a `style` prop with a `display` property on this component 
will override the default style given by *TabbedView*, which makes the component
invisible when the tab is not selected. If you specify a `style` prop with 
a `display` property, you will have to handle the visibility yourself.

## Licence

See the [Licence](LICENCE) file.
