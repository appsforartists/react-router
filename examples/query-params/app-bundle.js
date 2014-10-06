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
          React.DOM.li(null, Link({to: "user", params: {userId: "123"}}, "Bob")), 
          React.DOM.li(null, Link({to: "user", params: {userId: "123"}, query: {showAge: true}}, "Bob With Query Params")), 
          React.DOM.li(null, Link({to: "user", params: {userId: "abc"}}, "Sally"))
        ), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var User = React.createClass({displayName: 'User',
  render: function() {
    var age = this.props.query.showAge ? '33' : '';
    return (
      React.DOM.div({className: "User"}, 
        React.DOM.h1(null, "User id: ", this.props.params.userId), 
        age
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "user", path: "user/:userId", handler: User})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvcXVlcnktcGFyYW1zL2FwcC5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBSb3V0ZSA9IFJvdXRlci5Sb3V0ZTtcbnZhciBSb3V0ZXMgPSBSb3V0ZXIuUm91dGVzO1xudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0FwcCcsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS51bChudWxsLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwidXNlclwiLCBwYXJhbXM6IHt1c2VySWQ6IFwiMTIzXCJ9fSwgXCJCb2JcIikpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwidXNlclwiLCBwYXJhbXM6IHt1c2VySWQ6IFwiMTIzXCJ9LCBxdWVyeToge3Nob3dBZ2U6IHRydWV9fSwgXCJCb2IgV2l0aCBRdWVyeSBQYXJhbXNcIikpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwidXNlclwiLCBwYXJhbXM6IHt1c2VySWQ6IFwiYWJjXCJ9fSwgXCJTYWxseVwiKSlcbiAgICAgICAgKSwgXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKG51bGwpXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBVc2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnVXNlcicsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFnZSA9IHRoaXMucHJvcHMucXVlcnkuc2hvd0FnZSA/ICczMycgOiAnJztcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcIlVzZXJcIn0sIFxuICAgICAgICBSZWFjdC5ET00uaDEobnVsbCwgXCJVc2VyIGlkOiBcIiwgdGhpcy5wcm9wcy5wYXJhbXMudXNlcklkKSwgXG4gICAgICAgIGFnZVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe25hbWU6IFwidXNlclwiLCBwYXRoOiBcInVzZXIvOnVzZXJJZFwiLCBoYW5kbGVyOiBVc2VyfSlcbiAgICApXG4gIClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChyb3V0ZXMsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpO1xuIixudWxsXX0=
