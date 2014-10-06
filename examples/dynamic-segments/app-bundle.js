(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.ul(null, 
          React.DOM.li(null, Link({to: "user", params: {userId: "123"}}, "Bob")), 
          React.DOM.li(null, Link({to: "user", params: {userId: "abc"}}, "Sally"))
        ), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var User = React.createClass({displayName: 'User',
  render: function() {
    return (
      React.DOM.div({className: "User"}, 
        React.DOM.h1(null, "User id: ", this.props.params.userId), 
        React.DOM.ul(null, 
          React.DOM.li(null, Link({to: "task", params: {userId: this.props.params.userId, taskId: "foo"}}, "foo task")), 
          React.DOM.li(null, Link({to: "task", params: {userId: this.props.params.userId, taskId: "bar"}}, "bar task"))
        ), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var Task = React.createClass({displayName: 'Task',
  render: function() {
    return (
      React.DOM.div({className: "Task"}, 
        React.DOM.h2(null, "User id: ", this.props.params.userId), 
        React.DOM.h3(null, "Task id: ", this.props.params.taskId)
      )
    );
  }
});

var routes = (
  Route({handler: App}, 
    Route({name: "user", path: "/user/:userId", handler: User}, 
      Route({name: "task", path: "tasks/:taskId", handler: Task}), 
      Redirect({from: "todos/:taskId", to: "task"})
    )
  )
);

React.renderComponent(
  Routes({children: routes}),
  document.getElementById('example')
);

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvZHluYW1pYy1zZWdtZW50cy9hcHAuanMiLCIvVXNlcnMvcnlhbmYvQ29kZS9naXRodWIvcmFja3QvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgUm91dGUgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVzID0gUm91dGVyLlJvdXRlcztcbnZhciBSZWRpcmVjdCA9IFJvdXRlci5SZWRpcmVjdDtcbnZhciBMaW5rID0gUm91dGVyLkxpbms7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBcHAnLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00udWwobnVsbCwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIExpbmsoe3RvOiBcInVzZXJcIiwgcGFyYW1zOiB7dXNlcklkOiBcIjEyM1wifX0sIFwiQm9iXCIpKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIExpbmsoe3RvOiBcInVzZXJcIiwgcGFyYW1zOiB7dXNlcklkOiBcImFiY1wifX0sIFwiU2FsbHlcIikpXG4gICAgICAgICksIFxuICAgICAgICB0aGlzLnByb3BzLmFjdGl2ZVJvdXRlSGFuZGxlcihudWxsKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgVXNlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1VzZXInLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiVXNlclwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5oMShudWxsLCBcIlVzZXIgaWQ6IFwiLCB0aGlzLnByb3BzLnBhcmFtcy51c2VySWQpLCBcbiAgICAgICAgUmVhY3QuRE9NLnVsKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJ0YXNrXCIsIHBhcmFtczoge3VzZXJJZDogdGhpcy5wcm9wcy5wYXJhbXMudXNlcklkLCB0YXNrSWQ6IFwiZm9vXCJ9fSwgXCJmb28gdGFza1wiKSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJ0YXNrXCIsIHBhcmFtczoge3VzZXJJZDogdGhpcy5wcm9wcy5wYXJhbXMudXNlcklkLCB0YXNrSWQ6IFwiYmFyXCJ9fSwgXCJiYXIgdGFza1wiKSlcbiAgICAgICAgKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBUYXNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnVGFzaycsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJUYXNrXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmgyKG51bGwsIFwiVXNlciBpZDogXCIsIHRoaXMucHJvcHMucGFyYW1zLnVzZXJJZCksIFxuICAgICAgICBSZWFjdC5ET00uaDMobnVsbCwgXCJUYXNrIGlkOiBcIiwgdGhpcy5wcm9wcy5wYXJhbXMudGFza0lkKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZSh7aGFuZGxlcjogQXBwfSwgXG4gICAgUm91dGUoe25hbWU6IFwidXNlclwiLCBwYXRoOiBcIi91c2VyLzp1c2VySWRcIiwgaGFuZGxlcjogVXNlcn0sIFxuICAgICAgUm91dGUoe25hbWU6IFwidGFza1wiLCBwYXRoOiBcInRhc2tzLzp0YXNrSWRcIiwgaGFuZGxlcjogVGFza30pLCBcbiAgICAgIFJlZGlyZWN0KHtmcm9tOiBcInRvZG9zLzp0YXNrSWRcIiwgdG86IFwidGFza1wifSlcbiAgICApXG4gIClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcbiAgUm91dGVzKHtjaGlsZHJlbjogcm91dGVzfSksXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLG51bGxdfQ==
