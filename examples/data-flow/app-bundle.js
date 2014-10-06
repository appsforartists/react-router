(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',

  mixins: [ Router.Navigation ],

  getInitialState: function() {
    return {
      tacos: [
        { name: 'duck confit' },
        { name: 'carne asada' },
        { name: 'shrimp' }
      ]
    };
  },

  addTaco: function() {
    var name = prompt('taco name?');
    this.setState({
      tacos: this.state.tacos.concat({name: name})
    });
  },

  handleRemoveTaco: function(removedTaco) {
    var tacos = this.state.tacos.filter(function(taco) {
      return taco.name != removedTaco;
    });
    this.setState({tacos: tacos});
    this.transitionTo('/');
  },

  render: function() {
    var links = this.state.tacos.map(function(taco) {
      return React.DOM.li(null, Link({to: "taco", params: taco}, taco.name))
    });
    return (
      React.DOM.div({className: "App"}, 
        React.DOM.button({onClick: this.addTaco}, "Add Taco"), 
        React.DOM.ul({className: "Master"}, 
          links
        ), 
        React.DOM.div({className: "Detail"}, 
          this.props.activeRouteHandler({onRemoveTaco: this.handleRemoveTaco})
        )
      )
    );
  }
});

var Taco = React.createClass({displayName: 'Taco',
  remove: function() {
    this.props.onRemoveTaco(this.props.params.name);
  },

  render: function() {
    return (
      React.DOM.div({className: "Taco"}, 
        React.DOM.h1(null, this.props.params.name), 
        React.DOM.button({onClick: this.remove}, "remove")
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "taco", path: "taco/:name", handler: Taco})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvZGF0YS1mbG93L2FwcC5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgUm91dGUgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVzID0gUm91dGVyLlJvdXRlcztcbnZhciBMaW5rID0gUm91dGVyLkxpbms7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBcHAnLFxuXG4gIG1peGluczogWyBSb3V0ZXIuTmF2aWdhdGlvbiBdLFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhY29zOiBbXG4gICAgICAgIHsgbmFtZTogJ2R1Y2sgY29uZml0JyB9LFxuICAgICAgICB7IG5hbWU6ICdjYXJuZSBhc2FkYScgfSxcbiAgICAgICAgeyBuYW1lOiAnc2hyaW1wJyB9XG4gICAgICBdXG4gICAgfTtcbiAgfSxcblxuICBhZGRUYWNvOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmFtZSA9IHByb21wdCgndGFjbyBuYW1lPycpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGFjb3M6IHRoaXMuc3RhdGUudGFjb3MuY29uY2F0KHtuYW1lOiBuYW1lfSlcbiAgICB9KTtcbiAgfSxcblxuICBoYW5kbGVSZW1vdmVUYWNvOiBmdW5jdGlvbihyZW1vdmVkVGFjbykge1xuICAgIHZhciB0YWNvcyA9IHRoaXMuc3RhdGUudGFjb3MuZmlsdGVyKGZ1bmN0aW9uKHRhY28pIHtcbiAgICAgIHJldHVybiB0YWNvLm5hbWUgIT0gcmVtb3ZlZFRhY287XG4gICAgfSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dGFjb3M6IHRhY29zfSk7XG4gICAgdGhpcy50cmFuc2l0aW9uVG8oJy8nKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW5rcyA9IHRoaXMuc3RhdGUudGFjb3MubWFwKGZ1bmN0aW9uKHRhY28pIHtcbiAgICAgIHJldHVybiBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwidGFjb1wiLCBwYXJhbXM6IHRhY299LCB0YWNvLm5hbWUpKVxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiQXBwXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5hZGRUYWNvfSwgXCJBZGQgVGFjb1wiKSwgXG4gICAgICAgIFJlYWN0LkRPTS51bCh7Y2xhc3NOYW1lOiBcIk1hc3RlclwifSwgXG4gICAgICAgICAgbGlua3NcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJEZXRhaWxcIn0sIFxuICAgICAgICAgIHRoaXMucHJvcHMuYWN0aXZlUm91dGVIYW5kbGVyKHtvblJlbW92ZVRhY286IHRoaXMuaGFuZGxlUmVtb3ZlVGFjb30pXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIFRhY28gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdUYWNvJyxcbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uUmVtb3ZlVGFjbyh0aGlzLnByb3BzLnBhcmFtcy5uYW1lKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiVGFjb1wifSwgXG4gICAgICAgIFJlYWN0LkRPTS5oMShudWxsLCB0aGlzLnByb3BzLnBhcmFtcy5uYW1lKSwgXG4gICAgICAgIFJlYWN0LkRPTS5idXR0b24oe29uQ2xpY2s6IHRoaXMucmVtb3ZlfSwgXCJyZW1vdmVcIilcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIHJvdXRlcyA9IChcbiAgUm91dGVzKG51bGwsIFxuICAgIFJvdXRlKHtoYW5kbGVyOiBBcHB9LCBcbiAgICAgIFJvdXRlKHtuYW1lOiBcInRhY29cIiwgcGF0aDogXCJ0YWNvLzpuYW1lXCIsIGhhbmRsZXI6IFRhY299KVxuICAgIClcbiAgKVxuKTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KHJvdXRlcywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSk7XG4iLG51bGxdfQ==
