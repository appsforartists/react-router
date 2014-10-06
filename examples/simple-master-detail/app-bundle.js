(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  getInitialState: function() {
    return { states: findStates() }
  },

  indexTemplate: function() {
    return React.DOM.p(null, "Select a state from the left");
  },

  render: function() {
    var links = this.state.states.map(function(state) {
      return React.DOM.li(null, Link({to: "state", params: { abbr: state.abbr}}, state.name))
    });
    return (
      React.DOM.div({className: "App"}, 
        React.DOM.ul({className: "Master"}, 
          links
        ), 
        React.DOM.div({className: "Detail"}, 
          this.props.activeRouteHandler() || this.indexTemplate()
        )
      )
    );
  }
});

var State = React.createClass({displayName: 'State',
  getInitialState: function() {
    return findState(this.props.params.abbr);
  },

  imageUrl: function() {
    return "http://www.50states.com/maps/"+underscore(this.state.name)+".gif";
  },

  render: function() {
    return (
      React.DOM.div({className: "State"}, 
        React.DOM.h1(null, this.state.name), 
        React.DOM.img({src: this.imageUrl()})
      )
    );
  }
});

var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "state", path: "state/:abbr", addHandlerKey: true, handler: State})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

/*****************************************************************************/
// data stuff

function findState(abbr) {
  var states = findStates();
  for (var i = 0, l = states.length; i < l; i ++) {
    if (states[i].abbr === abbr) {
      return states[i];
    }
  }
}

function findStates() {
  return [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "AR", name: "Arkansas"},
    { abbr: "CA", name: "California"},
    { abbr: "CO", name: "Colorado"},
    { abbr: "CT", name: "Connecticut"},
    { abbr: "DE", name: "Delaware"},
    { abbr: "FL", name: "Florida"},
    { abbr: "GA", name: "Georgia"},
    { abbr: "HI", name: "Hawaii"},
    { abbr: "ID", name: "Idaho"},
    { abbr: "IL", name: "Illinois"},
    { abbr: "IN", name: "Indiana"},
    { abbr: "IA", name: "Iowa"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "ME", name: "Maine"},
    { abbr: "MD", name: "Maryland"},
    { abbr: "MA", name: "Massachusetts"},
    { abbr: "MI", name: "Michigan"},
    { abbr: "MN", name: "Minnesota"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "MO", name: "Missouri"},
    { abbr: "MT", name: "Montana"},
    { abbr: "NE", name: "Nebraska"},
    { abbr: "NV", name: "Nevada"},
    { abbr: "NH", name: "New Hampshire"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "NC", name: "North Carolina"},
    { abbr: "ND", name: "North Dakota"},
    { abbr: "OH", name: "Ohio"},
    { abbr: "OK", name: "Oklahoma"},
    { abbr: "OR", name: "Oregon"},
    { abbr: "PA", name: "Pennsylvania"},
    { abbr: "RI", name: "Rhode Island"},
    { abbr: "SC", name: "South Carolina"},
    { abbr: "SD", name: "South Dakota"},
    { abbr: "TN", name: "Tennessee"},
    { abbr: "TX", name: "Texas"},
    { abbr: "UT", name: "Utah"},
    { abbr: "VT", name: "Vermont"},
    { abbr: "VA", name: "Virginia"},
    { abbr: "WA", name: "Washington"},
    { abbr: "WV", name: "West Virginia"},
    { abbr: "WI", name: "Wisconsin"},
    { abbr: "WY", name: "Wyoming"}
  ];
}

function underscore(str) {
  return str.toLowerCase().replace(/ /, '_');
}

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvc2ltcGxlLW1hc3Rlci1kZXRhaWwvYXBwLmpzIiwiL1VzZXJzL3J5YW5mL0NvZGUvZ2l0aHViL3JhY2t0L3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBSb3V0ZSA9IFJvdXRlci5Sb3V0ZTtcbnZhciBSb3V0ZXMgPSBSb3V0ZXIuUm91dGVzO1xudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0FwcCcsXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHsgc3RhdGVzOiBmaW5kU3RhdGVzKCkgfVxuICB9LFxuXG4gIGluZGV4VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00ucChudWxsLCBcIlNlbGVjdCBhIHN0YXRlIGZyb20gdGhlIGxlZnRcIik7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGlua3MgPSB0aGlzLnN0YXRlLnN0YXRlcy5tYXAoZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHJldHVybiBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwic3RhdGVcIiwgcGFyYW1zOiB7IGFiYnI6IHN0YXRlLmFiYnJ9fSwgc3RhdGUubmFtZSkpXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJBcHBcIn0sIFxuICAgICAgICBSZWFjdC5ET00udWwoe2NsYXNzTmFtZTogXCJNYXN0ZXJcIn0sIFxuICAgICAgICAgIGxpbmtzXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiRGV0YWlsXCJ9LCBcbiAgICAgICAgICB0aGlzLnByb3BzLmFjdGl2ZVJvdXRlSGFuZGxlcigpIHx8IHRoaXMuaW5kZXhUZW1wbGF0ZSgpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIFN0YXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnU3RhdGUnLFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaW5kU3RhdGUodGhpcy5wcm9wcy5wYXJhbXMuYWJicik7XG4gIH0sXG5cbiAgaW1hZ2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcImh0dHA6Ly93d3cuNTBzdGF0ZXMuY29tL21hcHMvXCIrdW5kZXJzY29yZSh0aGlzLnN0YXRlLm5hbWUpK1wiLmdpZlwiO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJTdGF0ZVwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5oMShudWxsLCB0aGlzLnN0YXRlLm5hbWUpLCBcbiAgICAgICAgUmVhY3QuRE9NLmltZyh7c3JjOiB0aGlzLmltYWdlVXJsKCl9KVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe25hbWU6IFwic3RhdGVcIiwgcGF0aDogXCJzdGF0ZS86YWJiclwiLCBhZGRIYW5kbGVyS2V5OiB0cnVlLCBoYW5kbGVyOiBTdGF0ZX0pXG4gICAgKVxuICApXG4pO1xuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQocm91dGVzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8gZGF0YSBzdHVmZlxuXG5mdW5jdGlvbiBmaW5kU3RhdGUoYWJicikge1xuICB2YXIgc3RhdGVzID0gZmluZFN0YXRlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHN0YXRlcy5sZW5ndGg7IGkgPCBsOyBpICsrKSB7XG4gICAgaWYgKHN0YXRlc1tpXS5hYmJyID09PSBhYmJyKSB7XG4gICAgICByZXR1cm4gc3RhdGVzW2ldO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kU3RhdGVzKCkge1xuICByZXR1cm4gW1xuICAgIHsgYWJicjogXCJBTFwiLCBuYW1lOiBcIkFsYWJhbWFcIn0sXG4gICAgeyBhYmJyOiBcIkFLXCIsIG5hbWU6IFwiQWxhc2thXCJ9LFxuICAgIHsgYWJicjogXCJBWlwiLCBuYW1lOiBcIkFyaXpvbmFcIn0sXG4gICAgeyBhYmJyOiBcIkFSXCIsIG5hbWU6IFwiQXJrYW5zYXNcIn0sXG4gICAgeyBhYmJyOiBcIkNBXCIsIG5hbWU6IFwiQ2FsaWZvcm5pYVwifSxcbiAgICB7IGFiYnI6IFwiQ09cIiwgbmFtZTogXCJDb2xvcmFkb1wifSxcbiAgICB7IGFiYnI6IFwiQ1RcIiwgbmFtZTogXCJDb25uZWN0aWN1dFwifSxcbiAgICB7IGFiYnI6IFwiREVcIiwgbmFtZTogXCJEZWxhd2FyZVwifSxcbiAgICB7IGFiYnI6IFwiRkxcIiwgbmFtZTogXCJGbG9yaWRhXCJ9LFxuICAgIHsgYWJicjogXCJHQVwiLCBuYW1lOiBcIkdlb3JnaWFcIn0sXG4gICAgeyBhYmJyOiBcIkhJXCIsIG5hbWU6IFwiSGF3YWlpXCJ9LFxuICAgIHsgYWJicjogXCJJRFwiLCBuYW1lOiBcIklkYWhvXCJ9LFxuICAgIHsgYWJicjogXCJJTFwiLCBuYW1lOiBcIklsbGlub2lzXCJ9LFxuICAgIHsgYWJicjogXCJJTlwiLCBuYW1lOiBcIkluZGlhbmFcIn0sXG4gICAgeyBhYmJyOiBcIklBXCIsIG5hbWU6IFwiSW93YVwifSxcbiAgICB7IGFiYnI6IFwiS1NcIiwgbmFtZTogXCJLYW5zYXNcIn0sXG4gICAgeyBhYmJyOiBcIktZXCIsIG5hbWU6IFwiS2VudHVja3lcIn0sXG4gICAgeyBhYmJyOiBcIkxBXCIsIG5hbWU6IFwiTG91aXNpYW5hXCJ9LFxuICAgIHsgYWJicjogXCJNRVwiLCBuYW1lOiBcIk1haW5lXCJ9LFxuICAgIHsgYWJicjogXCJNRFwiLCBuYW1lOiBcIk1hcnlsYW5kXCJ9LFxuICAgIHsgYWJicjogXCJNQVwiLCBuYW1lOiBcIk1hc3NhY2h1c2V0dHNcIn0sXG4gICAgeyBhYmJyOiBcIk1JXCIsIG5hbWU6IFwiTWljaGlnYW5cIn0sXG4gICAgeyBhYmJyOiBcIk1OXCIsIG5hbWU6IFwiTWlubmVzb3RhXCJ9LFxuICAgIHsgYWJicjogXCJNU1wiLCBuYW1lOiBcIk1pc3Npc3NpcHBpXCJ9LFxuICAgIHsgYWJicjogXCJNT1wiLCBuYW1lOiBcIk1pc3NvdXJpXCJ9LFxuICAgIHsgYWJicjogXCJNVFwiLCBuYW1lOiBcIk1vbnRhbmFcIn0sXG4gICAgeyBhYmJyOiBcIk5FXCIsIG5hbWU6IFwiTmVicmFza2FcIn0sXG4gICAgeyBhYmJyOiBcIk5WXCIsIG5hbWU6IFwiTmV2YWRhXCJ9LFxuICAgIHsgYWJicjogXCJOSFwiLCBuYW1lOiBcIk5ldyBIYW1wc2hpcmVcIn0sXG4gICAgeyBhYmJyOiBcIk5KXCIsIG5hbWU6IFwiTmV3IEplcnNleVwifSxcbiAgICB7IGFiYnI6IFwiTk1cIiwgbmFtZTogXCJOZXcgTWV4aWNvXCJ9LFxuICAgIHsgYWJicjogXCJOWVwiLCBuYW1lOiBcIk5ldyBZb3JrXCJ9LFxuICAgIHsgYWJicjogXCJOQ1wiLCBuYW1lOiBcIk5vcnRoIENhcm9saW5hXCJ9LFxuICAgIHsgYWJicjogXCJORFwiLCBuYW1lOiBcIk5vcnRoIERha290YVwifSxcbiAgICB7IGFiYnI6IFwiT0hcIiwgbmFtZTogXCJPaGlvXCJ9LFxuICAgIHsgYWJicjogXCJPS1wiLCBuYW1lOiBcIk9rbGFob21hXCJ9LFxuICAgIHsgYWJicjogXCJPUlwiLCBuYW1lOiBcIk9yZWdvblwifSxcbiAgICB7IGFiYnI6IFwiUEFcIiwgbmFtZTogXCJQZW5uc3lsdmFuaWFcIn0sXG4gICAgeyBhYmJyOiBcIlJJXCIsIG5hbWU6IFwiUmhvZGUgSXNsYW5kXCJ9LFxuICAgIHsgYWJicjogXCJTQ1wiLCBuYW1lOiBcIlNvdXRoIENhcm9saW5hXCJ9LFxuICAgIHsgYWJicjogXCJTRFwiLCBuYW1lOiBcIlNvdXRoIERha290YVwifSxcbiAgICB7IGFiYnI6IFwiVE5cIiwgbmFtZTogXCJUZW5uZXNzZWVcIn0sXG4gICAgeyBhYmJyOiBcIlRYXCIsIG5hbWU6IFwiVGV4YXNcIn0sXG4gICAgeyBhYmJyOiBcIlVUXCIsIG5hbWU6IFwiVXRhaFwifSxcbiAgICB7IGFiYnI6IFwiVlRcIiwgbmFtZTogXCJWZXJtb250XCJ9LFxuICAgIHsgYWJicjogXCJWQVwiLCBuYW1lOiBcIlZpcmdpbmlhXCJ9LFxuICAgIHsgYWJicjogXCJXQVwiLCBuYW1lOiBcIldhc2hpbmd0b25cIn0sXG4gICAgeyBhYmJyOiBcIldWXCIsIG5hbWU6IFwiV2VzdCBWaXJnaW5pYVwifSxcbiAgICB7IGFiYnI6IFwiV0lcIiwgbmFtZTogXCJXaXNjb25zaW5cIn0sXG4gICAgeyBhYmJyOiBcIldZXCIsIG5hbWU6IFwiV3lvbWluZ1wifVxuICBdO1xufVxuXG5mdW5jdGlvbiB1bmRlcnNjb3JlKHN0cikge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC8sICdfJyk7XG59XG4iLG51bGxdfQ==
