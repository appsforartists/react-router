(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.ul(null, 
          React.DOM.li(null, Link({to: "dashboard"}, "Dashboard")), 
          React.DOM.li(null, Link({to: "form"}, "Form"))
        ), 
        this.props.activeRouteHandler() || React.DOM.h1(null, "Home")
      )
    );
  }
});

var Dashboard = React.createClass({displayName: 'Dashboard',
  render: function() {
    return React.DOM.h1(null, "Dashboard")
  }
});

var Form = React.createClass({displayName: 'Form',

  mixins: [ Router.Navigation ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.refs.userInput.getDOMNode().value !== '') {
        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
          transition.abort();
        }
      }
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.refs.userInput.getDOMNode().value = '';
    this.transitionTo('/');
  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.form({onSubmit: this.handleSubmit}, 
          React.DOM.p(null, "Click the dashboard link with text in the input."), 
          React.DOM.input({type: "text", ref: "userInput", defaultValue: "ohai"}), 
          React.DOM.button({type: "submit"}, "Go")
        )
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "dashboard", handler: Dashboard}), 
      Route({name: "form", handler: Form})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvdHJhbnNpdGlvbnMvYXBwLmpzIiwiL1VzZXJzL3J5YW5mL0NvZGUvZ2l0aHViL3JhY2t0L3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xudmFyIFJvdXRlID0gUm91dGVyLlJvdXRlO1xudmFyIFJvdXRlcyA9IFJvdXRlci5Sb3V0ZXM7XG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQXBwJyxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLnVsKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJkYXNoYm9hcmRcIn0sIFwiRGFzaGJvYXJkXCIpKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIExpbmsoe3RvOiBcImZvcm1cIn0sIFwiRm9ybVwiKSlcbiAgICAgICAgKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKCkgfHwgUmVhY3QuRE9NLmgxKG51bGwsIFwiSG9tZVwiKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgRGFzaGJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnRGFzaGJvYXJkJyxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmgxKG51bGwsIFwiRGFzaGJvYXJkXCIpXG4gIH1cbn0pO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gIG1peGluczogWyBSb3V0ZXIuTmF2aWdhdGlvbiBdLFxuXG4gIHN0YXRpY3M6IHtcbiAgICB3aWxsVHJhbnNpdGlvbkZyb206IGZ1bmN0aW9uKHRyYW5zaXRpb24sIGNvbXBvbmVudCkge1xuICAgICAgaWYgKGNvbXBvbmVudC5yZWZzLnVzZXJJbnB1dC5nZXRET01Ob2RlKCkudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGlmICghY29uZmlybSgnWW91IGhhdmUgdW5zYXZlZCBpbmZvcm1hdGlvbiwgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nKSkge1xuICAgICAgICAgIHRyYW5zaXRpb24uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnJlZnMudXNlcklucHV0LmdldERPTU5vZGUoKS52YWx1ZSA9ICcnO1xuICAgIHRoaXMudHJhbnNpdGlvblRvKCcvJyk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLmZvcm0oe29uU3VibWl0OiB0aGlzLmhhbmRsZVN1Ym1pdH0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiQ2xpY2sgdGhlIGRhc2hib2FyZCBsaW5rIHdpdGggdGV4dCBpbiB0aGUgaW5wdXQuXCIpLCBcbiAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwidGV4dFwiLCByZWY6IFwidXNlcklucHV0XCIsIGRlZmF1bHRWYWx1ZTogXCJvaGFpXCJ9KSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7dHlwZTogXCJzdWJtaXRcIn0sIFwiR29cIilcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe25hbWU6IFwiZGFzaGJvYXJkXCIsIGhhbmRsZXI6IERhc2hib2FyZH0pLCBcbiAgICAgIFJvdXRlKHtuYW1lOiBcImZvcm1cIiwgaGFuZGxlcjogRm9ybX0pXG4gICAgKVxuICApXG4pO1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQocm91dGVzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKTtcbiIsbnVsbF19
