(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.ul(null, 
          React.DOM.li(null, Link({to: "image", params: {service: "kitten"}}, "Kitten")), 
          React.DOM.li(null, Link({to: "image", params: {service: "cage"}}, "Cage"))
        ), 
        CSSTransitionGroup({transitionName: "example"}, 
          this.props.activeRouteHandler(null)
        )
      )
    );
  }
});

var Image = React.createClass({displayName: 'Image',
  render: function() {
    var src = "http://place"+this.props.params.service+".com/400/400";
    return (
      React.DOM.div({className: "Image"}, 
        React.DOM.img({src: src})
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "image", path: ":service", handler: Image, addHandlerKey: true})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk","react/lib/ReactCSSTransitionGroup":"fmz4lL"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvYW5pbWF0aW9ucy9hcHAuanMiLCIvVXNlcnMvcnlhbmYvQ29kZS9naXRodWIvcmFja3QvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDU1NUcmFuc2l0aW9uR3JvdXAgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBSb3V0ZXMgPSBSb3V0ZXIuUm91dGVzO1xudmFyIFJvdXRlID0gUm91dGVyLlJvdXRlO1xudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0FwcCcsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS51bChudWxsLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwiaW1hZ2VcIiwgcGFyYW1zOiB7c2VydmljZTogXCJraXR0ZW5cIn19LCBcIktpdHRlblwiKSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJpbWFnZVwiLCBwYXJhbXM6IHtzZXJ2aWNlOiBcImNhZ2VcIn19LCBcIkNhZ2VcIikpXG4gICAgICAgICksIFxuICAgICAgICBDU1NUcmFuc2l0aW9uR3JvdXAoe3RyYW5zaXRpb25OYW1lOiBcImV4YW1wbGVcIn0sIFxuICAgICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIEltYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnSW1hZ2UnLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzcmMgPSBcImh0dHA6Ly9wbGFjZVwiK3RoaXMucHJvcHMucGFyYW1zLnNlcnZpY2UrXCIuY29tLzQwMC80MDBcIjtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcIkltYWdlXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmltZyh7c3JjOiBzcmN9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe25hbWU6IFwiaW1hZ2VcIiwgcGF0aDogXCI6c2VydmljZVwiLCBoYW5kbGVyOiBJbWFnZSwgYWRkSGFuZGxlcktleTogdHJ1ZX0pXG4gICAgKVxuICApXG4pO1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQocm91dGVzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKTtcbiIsbnVsbF19
