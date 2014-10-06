(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var ActiveState = Router.ActiveState;
var data = require('./data');

var CategoryNav = React.createClass({displayName: 'CategoryNav',
  getInitialState: function() {
    return { isOpen: this.props.defaultIsOpen};
  },

  getDefaultProps: function() {
    return { isOpen: false };
  },

  componentWillReceiveProps: function(newProps) {
    if (!this.state.isOpen)
      this.setState({isOpen: newProps.defaultIsOpen});
  },

  toggle: function() {
    this.setState({isOpen: !this.state.isOpen});
  },

  buildToggleClassName: function() {
    var toggleClassName = 'CategoryNav__Toggle';
    if (this.state.isOpen)
      toggleClassName += ' CategoryNav__Toggle--is-open';
    return toggleClassName;
  },

  renderItems: function() {
    var category = this.props.category;
    return this.state.isOpen ? category.items.map(function(item) {
      var params = { name: item.name, category: category.name };
      return (
        React.DOM.li({key: item.name}, 
          Link({to: "item", params: params}, item.name)
        )
      );
    }) : null;
  },

  render: function() {
    var category = this.props.category;
    return (
      React.DOM.div({className: "CategoryNav"}, 
        React.DOM.h3({
          className: this.buildToggleClassName(), 
          onClick: this.toggle
        }, category.name), 
        React.DOM.ul(null, this.renderItems())
      )
    );
  }
});

var Sidebar = React.createClass({displayName: 'Sidebar',
  renderCategory: function(category) {
    return CategoryNav({
      key: category.name, 
      defaultIsOpen: category.name === this.props.activeCategory, 
      category: category}
    );
  },

  render: function() {
    return (
      React.DOM.div({className: "Sidebar"}, 
        this.props.categories.map(this.renderCategory)
      )
    );
  }
});

var App = React.createClass({displayName: 'App',
  mixins: [ActiveState],

  render: function() {
    var activeCategory = this.getActiveParams().category;
    return (
      React.DOM.div(null, 
        Sidebar({activeCategory: activeCategory, categories: data.getAll()}), 
        React.DOM.div({className: "Content"}, 
          this.props.activeRouteHandler(null)
        )
      )
    );
  }
});

var Item = React.createClass({displayName: 'Item',
  render: function() {
    var params = this.props.params;
    var category = data.lookupCategory(params.category);
    var item = data.lookupItem(params.category, params.name);
    return (
      React.DOM.div(null, 
        React.DOM.h2(null, category.name, " / ", item.name), 
        React.DOM.p(null, "Price: $", item.price)
      )
    );
  }
});

var Index = React.createClass({displayName: 'Index',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.p(null, "Sidebar features:"), 
        React.DOM.ul({style: {maxWidth: '400px'}}, 
          React.DOM.li(null, "User can open/close categories"), 
          React.DOM.li(null, 
            "Visiting an item on first page load will automatically open" + ' ' +
            "the correct category. (Click an item, then reload the" + ' ' +
            "browser.)"
          ), 
          React.DOM.li(null, 
            "Navigating with forward/back buttons will open an active" + ' ' +
            "category if it is not already open. (Navigate to several" + ' ' +
            "items, close all the categories, then use back/forward" + ' ' +
            "buttons.)"
          ), 
          React.DOM.li(null, 
            "Only the user can close a category. (Navigating from an" + ' ' +
            "active category will not close it.)"
          )
        )
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      DefaultRoute({handler: Index}), 
      Route({name: "item", path: ":category/:name", handler: Item})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));


},{"./data":2,"react":"M6d2gk"}],2:[function(require,module,exports){
var data = [
  {
    name: 'Tacos',
    items: [
      { name: 'Carne Asada', price: 7 },
      { name: 'Pollo', price: 6 },
      { name: 'Carnitas', price: 6 }
    ]
  },
  {
    name: 'Burgers',
    items: [
      { name: 'Buffalo Bleu', price: 8 },
      { name: 'Bacon', price: 8 },
      { name: 'Mushroom and Swiss', price: 6 }
    ]
  },
  {
    name: 'Drinks',
    items: [
      { name: 'Lemonade', price: 3 },
      { name: 'Root Beer', price: 4 },
      { name: 'Iron Port', price: 5 }
    ]
  }
];

var dataMap = data.reduce(function(map, category) {
  category.itemsMap = category.items.reduce(function(itemsMap, item) {
    itemsMap[item.name] = item;
    return itemsMap;
  }, {});
  map[category.name] = category;
  return map;
}, {});

exports.getAll = function() {
  return data;
};

exports.lookupCategory = function(name) {
  return dataMap[name];
};

exports.lookupItem = function(category, item) {
  return dataMap[category].itemsMap[item];
};


},{}],3:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvc2lkZWJhci9hcHAuanMiLCIvVXNlcnMvcnlhbmYvQ29kZS9naXRodWIvcmFja3QvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL3NpZGViYXIvZGF0YS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgUm91dGVzID0gUm91dGVyLlJvdXRlcztcbnZhciBSb3V0ZSA9IFJvdXRlci5Sb3V0ZTtcbnZhciBEZWZhdWx0Um91dGUgPSBSb3V0ZXIuRGVmYXVsdFJvdXRlO1xudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcbnZhciBBY3RpdmVTdGF0ZSA9IFJvdXRlci5BY3RpdmVTdGF0ZTtcbnZhciBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJyk7XG5cbnZhciBDYXRlZ29yeU5hdiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0NhdGVnb3J5TmF2JyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBpc09wZW46IHRoaXMucHJvcHMuZGVmYXVsdElzT3Blbn07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBpc09wZW46IGZhbHNlIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV3UHJvcHMpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcGVuOiBuZXdQcm9wcy5kZWZhdWx0SXNPcGVufSk7XG4gIH0sXG5cbiAgdG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtpc09wZW46ICF0aGlzLnN0YXRlLmlzT3Blbn0pO1xuICB9LFxuXG4gIGJ1aWxkVG9nZ2xlQ2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdG9nZ2xlQ2xhc3NOYW1lID0gJ0NhdGVnb3J5TmF2X19Ub2dnbGUnO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzT3BlbilcbiAgICAgIHRvZ2dsZUNsYXNzTmFtZSArPSAnIENhdGVnb3J5TmF2X19Ub2dnbGUtLWlzLW9wZW4nO1xuICAgIHJldHVybiB0b2dnbGVDbGFzc05hbWU7XG4gIH0sXG5cbiAgcmVuZGVySXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeSA9IHRoaXMucHJvcHMuY2F0ZWdvcnk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNPcGVuID8gY2F0ZWdvcnkuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBwYXJhbXMgPSB7IG5hbWU6IGl0ZW0ubmFtZSwgY2F0ZWdvcnk6IGNhdGVnb3J5Lm5hbWUgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFJlYWN0LkRPTS5saSh7a2V5OiBpdGVtLm5hbWV9LCBcbiAgICAgICAgICBMaW5rKHt0bzogXCJpdGVtXCIsIHBhcmFtczogcGFyYW1zfSwgaXRlbS5uYW1lKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pIDogbnVsbDtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeSA9IHRoaXMucHJvcHMuY2F0ZWdvcnk7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJDYXRlZ29yeU5hdlwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5oMyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmJ1aWxkVG9nZ2xlQ2xhc3NOYW1lKCksIFxuICAgICAgICAgIG9uQ2xpY2s6IHRoaXMudG9nZ2xlXG4gICAgICAgIH0sIGNhdGVnb3J5Lm5hbWUpLCBcbiAgICAgICAgUmVhY3QuRE9NLnVsKG51bGwsIHRoaXMucmVuZGVySXRlbXMoKSlcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIFNpZGViYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTaWRlYmFyJyxcbiAgcmVuZGVyQ2F0ZWdvcnk6IGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIENhdGVnb3J5TmF2KHtcbiAgICAgIGtleTogY2F0ZWdvcnkubmFtZSwgXG4gICAgICBkZWZhdWx0SXNPcGVuOiBjYXRlZ29yeS5uYW1lID09PSB0aGlzLnByb3BzLmFjdGl2ZUNhdGVnb3J5LCBcbiAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeX1cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJTaWRlYmFyXCJ9LCBcbiAgICAgICAgdGhpcy5wcm9wcy5jYXRlZ29yaWVzLm1hcCh0aGlzLnJlbmRlckNhdGVnb3J5KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQXBwJyxcbiAgbWl4aW5zOiBbQWN0aXZlU3RhdGVdLFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFjdGl2ZUNhdGVnb3J5ID0gdGhpcy5nZXRBY3RpdmVQYXJhbXMoKS5jYXRlZ29yeTtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgU2lkZWJhcih7YWN0aXZlQ2F0ZWdvcnk6IGFjdGl2ZUNhdGVnb3J5LCBjYXRlZ29yaWVzOiBkYXRhLmdldEFsbCgpfSksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiQ29udGVudFwifSwgXG4gICAgICAgICAgdGhpcy5wcm9wcy5hY3RpdmVSb3V0ZUhhbmRsZXIobnVsbClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0l0ZW0nLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbXMgPSB0aGlzLnByb3BzLnBhcmFtcztcbiAgICB2YXIgY2F0ZWdvcnkgPSBkYXRhLmxvb2t1cENhdGVnb3J5KHBhcmFtcy5jYXRlZ29yeSk7XG4gICAgdmFyIGl0ZW0gPSBkYXRhLmxvb2t1cEl0ZW0ocGFyYW1zLmNhdGVnb3J5LCBwYXJhbXMubmFtZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5oMihudWxsLCBjYXRlZ29yeS5uYW1lLCBcIiAvIFwiLCBpdGVtLm5hbWUpLCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJQcmljZTogJFwiLCBpdGVtLnByaWNlKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdJbmRleCcsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiU2lkZWJhciBmZWF0dXJlczpcIiksIFxuICAgICAgICBSZWFjdC5ET00udWwoe3N0eWxlOiB7bWF4V2lkdGg6ICc0MDBweCd9fSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIFwiVXNlciBjYW4gb3Blbi9jbG9zZSBjYXRlZ29yaWVzXCIpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgXG4gICAgICAgICAgICBcIlZpc2l0aW5nIGFuIGl0ZW0gb24gZmlyc3QgcGFnZSBsb2FkIHdpbGwgYXV0b21hdGljYWxseSBvcGVuXCIgKyAnICcgK1xuICAgICAgICAgICAgXCJ0aGUgY29ycmVjdCBjYXRlZ29yeS4gKENsaWNrIGFuIGl0ZW0sIHRoZW4gcmVsb2FkIHRoZVwiICsgJyAnICtcbiAgICAgICAgICAgIFwiYnJvd3Nlci4pXCJcbiAgICAgICAgICApLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgXG4gICAgICAgICAgICBcIk5hdmlnYXRpbmcgd2l0aCBmb3J3YXJkL2JhY2sgYnV0dG9ucyB3aWxsIG9wZW4gYW4gYWN0aXZlXCIgKyAnICcgK1xuICAgICAgICAgICAgXCJjYXRlZ29yeSBpZiBpdCBpcyBub3QgYWxyZWFkeSBvcGVuLiAoTmF2aWdhdGUgdG8gc2V2ZXJhbFwiICsgJyAnICtcbiAgICAgICAgICAgIFwiaXRlbXMsIGNsb3NlIGFsbCB0aGUgY2F0ZWdvcmllcywgdGhlbiB1c2UgYmFjay9mb3J3YXJkXCIgKyAnICcgK1xuICAgICAgICAgICAgXCJidXR0b25zLilcIlxuICAgICAgICAgICksIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBcbiAgICAgICAgICAgIFwiT25seSB0aGUgdXNlciBjYW4gY2xvc2UgYSBjYXRlZ29yeS4gKE5hdmlnYXRpbmcgZnJvbSBhblwiICsgJyAnICtcbiAgICAgICAgICAgIFwiYWN0aXZlIGNhdGVnb3J5IHdpbGwgbm90IGNsb3NlIGl0LilcIlxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgRGVmYXVsdFJvdXRlKHtoYW5kbGVyOiBJbmRleH0pLCBcbiAgICAgIFJvdXRlKHtuYW1lOiBcIml0ZW1cIiwgcGF0aDogXCI6Y2F0ZWdvcnkvOm5hbWVcIiwgaGFuZGxlcjogSXRlbX0pXG4gICAgKVxuICApXG4pO1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQocm91dGVzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKTtcblxuIiwidmFyIGRhdGEgPSBbXG4gIHtcbiAgICBuYW1lOiAnVGFjb3MnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7IG5hbWU6ICdDYXJuZSBBc2FkYScsIHByaWNlOiA3IH0sXG4gICAgICB7IG5hbWU6ICdQb2xsbycsIHByaWNlOiA2IH0sXG4gICAgICB7IG5hbWU6ICdDYXJuaXRhcycsIHByaWNlOiA2IH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnQnVyZ2VycycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgbmFtZTogJ0J1ZmZhbG8gQmxldScsIHByaWNlOiA4IH0sXG4gICAgICB7IG5hbWU6ICdCYWNvbicsIHByaWNlOiA4IH0sXG4gICAgICB7IG5hbWU6ICdNdXNocm9vbSBhbmQgU3dpc3MnLCBwcmljZTogNiB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgbmFtZTogJ0RyaW5rcycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgbmFtZTogJ0xlbW9uYWRlJywgcHJpY2U6IDMgfSxcbiAgICAgIHsgbmFtZTogJ1Jvb3QgQmVlcicsIHByaWNlOiA0IH0sXG4gICAgICB7IG5hbWU6ICdJcm9uIFBvcnQnLCBwcmljZTogNSB9XG4gICAgXVxuICB9XG5dO1xuXG52YXIgZGF0YU1hcCA9IGRhdGEucmVkdWNlKGZ1bmN0aW9uKG1hcCwgY2F0ZWdvcnkpIHtcbiAgY2F0ZWdvcnkuaXRlbXNNYXAgPSBjYXRlZ29yeS5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24oaXRlbXNNYXAsIGl0ZW0pIHtcbiAgICBpdGVtc01hcFtpdGVtLm5hbWVdID0gaXRlbTtcbiAgICByZXR1cm4gaXRlbXNNYXA7XG4gIH0sIHt9KTtcbiAgbWFwW2NhdGVnb3J5Lm5hbWVdID0gY2F0ZWdvcnk7XG4gIHJldHVybiBtYXA7XG59LCB7fSk7XG5cbmV4cG9ydHMuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0cy5sb29rdXBDYXRlZ29yeSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIGRhdGFNYXBbbmFtZV07XG59O1xuXG5leHBvcnRzLmxvb2t1cEl0ZW0gPSBmdW5jdGlvbihjYXRlZ29yeSwgaXRlbSkge1xuICByZXR1cm4gZGF0YU1hcFtjYXRlZ29yeV0uaXRlbXNNYXBbaXRlbV07XG59O1xuXG4iLG51bGxdfQ==
