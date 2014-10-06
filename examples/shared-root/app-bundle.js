(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  render: function () {
    return (
      React.DOM.div(null, 
        React.DOM.ol(null, 
          React.DOM.li(null, Link({to: "home"}, "Home")), 
          React.DOM.li(null, Link({to: "signin"}, "Sign in")), 
          React.DOM.li(null, Link({to: "forgot-password"}, "Forgot Password"))
        ), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var SignedIn = React.createClass({displayName: 'SignedIn',
  render: function () {
    return (
      React.DOM.div(null, 
        React.DOM.h2(null, "Signed In"), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var Home = React.createClass({displayName: 'Home',
  render: function () {
    return (
      React.DOM.h3(null, "Welcome home!")
    );
  }
});

var SignedOut = React.createClass({displayName: 'SignedOut',
  render: function () {
    return (
      React.DOM.div(null, 
        React.DOM.h2(null, "Signed Out"), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var SignIn = React.createClass({displayName: 'SignIn',
  render: function () {
    return (
      React.DOM.h3(null, "Please sign in.")
    );
  }
});

var ForgotPassword = React.createClass({displayName: 'ForgotPassword',
  render: function () {
    return (
      React.DOM.h3(null, "Forgot your password?")
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({handler: SignedOut}, 
        Route({name: "signin", handler: SignIn}), 
        Route({name: "forgot-password", handler: ForgotPassword})
      ), 
      Route({handler: SignedIn}, 
        Route({name: "home", handler: Home})
      )
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvc2hhcmVkLXJvb3QvYXBwLmpzIiwiL1VzZXJzL3J5YW5mL0NvZGUvZ2l0aHViL3JhY2t0L3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgUm91dGUgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVzID0gUm91dGVyLlJvdXRlcztcbnZhciBMaW5rID0gUm91dGVyLkxpbms7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBcHAnLFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLm9sKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJob21lXCJ9LCBcIkhvbWVcIikpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwic2lnbmluXCJ9LCBcIlNpZ24gaW5cIikpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwiZm9yZ290LXBhc3N3b3JkXCJ9LCBcIkZvcmdvdCBQYXNzd29yZFwiKSlcbiAgICAgICAgKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBTaWduZWRJbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NpZ25lZEluJyxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5oMihudWxsLCBcIlNpZ25lZCBJblwiKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBIb21lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnSG9tZScsXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uaDMobnVsbCwgXCJXZWxjb21lIGhvbWUhXCIpXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBTaWduZWRPdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTaWduZWRPdXQnLFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLmgyKG51bGwsIFwiU2lnbmVkIE91dFwiKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBTaWduSW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTaWduSW4nLFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiUGxlYXNlIHNpZ24gaW4uXCIpXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBGb3Jnb3RQYXNzd29yZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0ZvcmdvdFBhc3N3b3JkJyxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5oMyhudWxsLCBcIkZvcmdvdCB5b3VyIHBhc3N3b3JkP1wiKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe2hhbmRsZXI6IFNpZ25lZE91dH0sIFxuICAgICAgICBSb3V0ZSh7bmFtZTogXCJzaWduaW5cIiwgaGFuZGxlcjogU2lnbklufSksIFxuICAgICAgICBSb3V0ZSh7bmFtZTogXCJmb3Jnb3QtcGFzc3dvcmRcIiwgaGFuZGxlcjogRm9yZ290UGFzc3dvcmR9KVxuICAgICAgKSwgXG4gICAgICBSb3V0ZSh7aGFuZGxlcjogU2lnbmVkSW59LCBcbiAgICAgICAgUm91dGUoe25hbWU6IFwiaG9tZVwiLCBoYW5kbGVyOiBIb21lfSlcbiAgICAgIClcbiAgICApXG4gIClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChyb3V0ZXMsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpO1xuIixudWxsXX0=
