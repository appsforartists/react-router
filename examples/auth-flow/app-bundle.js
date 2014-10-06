(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;

var App = React.createClass({displayName: 'App',
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function() {
    var loginOrOut = this.state.loggedIn ?
      Link({to: "logout"}, "Log out") :
      Link({to: "login"}, "Sign in");
    return (
      React.DOM.div(null, 
        React.DOM.ul(null, 
          React.DOM.li(null, loginOrOut), 
          React.DOM.li(null, Link({to: "about"}, "About")), 
          React.DOM.li(null, Link({to: "dashboard"}, "Dashboard"), " (authenticated)")
        ), 
        this.props.activeRouteHandler(null)
      )
    );
  }
});

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};

var Dashboard = React.createClass({displayName: 'Dashboard',
  mixins: [AuthenticatedRoute],

  render: function() {
    var token = auth.getToken();
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "Dashboard"), 
        React.DOM.p(null, "You made it!"), 
        React.DOM.p(null, token)
      )
    );
  }
});

var Login = React.createClass({displayName: 'Login',
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function() {
    return {
      error: false
    };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    auth.login(email, pass, function(loggedIn) {
      if (!loggedIn)
        return this.setState({ error: true });

      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/about');
      }
    }.bind(this));
  },

  render: function() {
    var errors = this.state.error ? React.DOM.p(null, "Bad login information") : '';
    return (
      React.DOM.form({onSubmit: this.handleSubmit}, 
        React.DOM.label(null, React.DOM.input({ref: "email", placeholder: "email", defaultValue: "joe@example.com"})), 
        React.DOM.label(null, React.DOM.input({ref: "pass", placeholder: "password"})), " (hint: password1)", React.DOM.br(null), 
        React.DOM.button({type: "submit"}, "login"), 
        errors
      )
    );
  }
});

var About = React.createClass({displayName: 'About',
  render: function() {
    return React.DOM.h1(null, "About");
  }
});

var Logout = React.createClass({displayName: 'Logout',
  componentDidMount: function() {
    auth.logout();
  },

  render: function() {
    return React.DOM.p(null, "You are now logged out");
  }
});


// Fake authentication lib

var auth = {
  login: function(email, pass, cb) {
    var cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      cb && cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, function(res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        cb && cb(true);
        this.onChange(true);
      } else {
        cb && cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  getToken: function() {
    return localStorage.token;
  },

  logout: function(cb) {
    delete localStorage.token;
    cb && cb();
    this.onChange(false);
  },

  loggedIn: function() {
    return !!localStorage.token;
  },

  onChange: function() {}
};

function pretendRequest(email, pass, cb) {
  setTimeout(function() {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}


var routes = (
  Routes(null, 
    Route({handler: App}, 
      Route({name: "login", handler: Login}), 
      Route({name: "logout", handler: Logout}), 
      Route({name: "about", handler: About}), 
      Route({name: "dashboard", handler: Dashboard})
    )
  )
);

React.renderComponent(routes, document.getElementById('example'));

},{"react":"M6d2gk"}],2:[function(require,module,exports){

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvYXV0aC1mbG93L2FwcC5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xudmFyIFJvdXRlID0gUm91dGVyLlJvdXRlO1xudmFyIFJvdXRlcyA9IFJvdXRlci5Sb3V0ZXM7XG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQXBwJyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9nZ2VkSW46IGF1dGgubG9nZ2VkSW4oKVxuICAgIH07XG4gIH0sXG5cbiAgc2V0U3RhdGVPbkF1dGg6IGZ1bmN0aW9uKGxvZ2dlZEluKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsb2dnZWRJbjogbG9nZ2VkSW5cbiAgICB9KTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIGF1dGgub25DaGFuZ2UgPSB0aGlzLnNldFN0YXRlT25BdXRoO1xuICAgIGF1dGgubG9naW4oKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb2dpbk9yT3V0ID0gdGhpcy5zdGF0ZS5sb2dnZWRJbiA/XG4gICAgICBMaW5rKHt0bzogXCJsb2dvdXRcIn0sIFwiTG9nIG91dFwiKSA6XG4gICAgICBMaW5rKHt0bzogXCJsb2dpblwifSwgXCJTaWduIGluXCIpO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00udWwobnVsbCwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIGxvZ2luT3JPdXQpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwiYWJvdXRcIn0sIFwiQWJvdXRcIikpLCBcbiAgICAgICAgICBSZWFjdC5ET00ubGkobnVsbCwgTGluayh7dG86IFwiZGFzaGJvYXJkXCJ9LCBcIkRhc2hib2FyZFwiKSwgXCIgKGF1dGhlbnRpY2F0ZWQpXCIpXG4gICAgICAgICksIFxuICAgICAgICB0aGlzLnByb3BzLmFjdGl2ZVJvdXRlSGFuZGxlcihudWxsKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQXV0aGVudGljYXRlZFJvdXRlID0ge1xuICBzdGF0aWNzOiB7XG4gICAgd2lsbFRyYW5zaXRpb25UbzogZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgIGlmICghYXV0aC5sb2dnZWRJbigpKSB7XG4gICAgICAgIExvZ2luLmF0dGVtcHRlZFRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgICAgICB0cmFuc2l0aW9uLnJlZGlyZWN0KCcvbG9naW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciBEYXNoYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdEYXNoYm9hcmQnLFxuICBtaXhpbnM6IFtBdXRoZW50aWNhdGVkUm91dGVdLFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRva2VuID0gYXV0aC5nZXRUb2tlbigpO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00uaDEobnVsbCwgXCJEYXNoYm9hcmRcIiksIFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIllvdSBtYWRlIGl0IVwiKSwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIHRva2VuKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdMb2dpbicsXG4gIG1peGluczogWyBSb3V0ZXIuTmF2aWdhdGlvbiBdLFxuXG4gIHN0YXRpY3M6IHtcbiAgICBhdHRlbXB0ZWRUcmFuc2l0aW9uOiBudWxsXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgZW1haWwgPSB0aGlzLnJlZnMuZW1haWwuZ2V0RE9NTm9kZSgpLnZhbHVlO1xuICAgIHZhciBwYXNzID0gdGhpcy5yZWZzLnBhc3MuZ2V0RE9NTm9kZSgpLnZhbHVlO1xuICAgIGF1dGgubG9naW4oZW1haWwsIHBhc3MsIGZ1bmN0aW9uKGxvZ2dlZEluKSB7XG4gICAgICBpZiAoIWxvZ2dlZEluKVxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiB0cnVlIH0pO1xuXG4gICAgICBpZiAoTG9naW4uYXR0ZW1wdGVkVHJhbnNpdGlvbikge1xuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IExvZ2luLmF0dGVtcHRlZFRyYW5zaXRpb247XG4gICAgICAgIExvZ2luLmF0dGVtcHRlZFRyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICB0cmFuc2l0aW9uLnJldHJ5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlcGxhY2VXaXRoKCcvYWJvdXQnKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVycm9ycyA9IHRoaXMuc3RhdGUuZXJyb3IgPyBSZWFjdC5ET00ucChudWxsLCBcIkJhZCBsb2dpbiBpbmZvcm1hdGlvblwiKSA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZm9ybSh7b25TdWJtaXQ6IHRoaXMuaGFuZGxlU3VibWl0fSwgXG4gICAgICAgIFJlYWN0LkRPTS5sYWJlbChudWxsLCBSZWFjdC5ET00uaW5wdXQoe3JlZjogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiLCBkZWZhdWx0VmFsdWU6IFwiam9lQGV4YW1wbGUuY29tXCJ9KSksIFxuICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgUmVhY3QuRE9NLmlucHV0KHtyZWY6IFwicGFzc1wiLCBwbGFjZWhvbGRlcjogXCJwYXNzd29yZFwifSkpLCBcIiAoaGludDogcGFzc3dvcmQxKVwiLCBSZWFjdC5ET00uYnIobnVsbCksIFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHt0eXBlOiBcInN1Ym1pdFwifSwgXCJsb2dpblwiKSwgXG4gICAgICAgIGVycm9yc1xuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQWJvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBYm91dCcsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5oMShudWxsLCBcIkFib3V0XCIpO1xuICB9XG59KTtcblxudmFyIExvZ291dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0xvZ291dCcsXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBhdXRoLmxvZ291dCgpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5wKG51bGwsIFwiWW91IGFyZSBub3cgbG9nZ2VkIG91dFwiKTtcbiAgfVxufSk7XG5cblxuLy8gRmFrZSBhdXRoZW50aWNhdGlvbiBsaWJcblxudmFyIGF1dGggPSB7XG4gIGxvZ2luOiBmdW5jdGlvbihlbWFpbCwgcGFzcywgY2IpIHtcbiAgICB2YXIgY2IgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChsb2NhbFN0b3JhZ2UudG9rZW4pIHtcbiAgICAgIGNiICYmIGNiKHRydWUpO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJldGVuZFJlcXVlc3QoZW1haWwsIHBhc3MsIGZ1bmN0aW9uKHJlcykge1xuICAgICAgaWYgKHJlcy5hdXRoZW50aWNhdGVkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS50b2tlbiA9IHJlcy50b2tlbjtcbiAgICAgICAgY2IgJiYgY2IodHJ1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYiAmJiBjYihmYWxzZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoZmFsc2UpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgZ2V0VG9rZW46IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UudG9rZW47XG4gIH0sXG5cbiAgbG9nb3V0OiBmdW5jdGlvbihjYikge1xuICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UudG9rZW47XG4gICAgY2IgJiYgY2IoKTtcbiAgICB0aGlzLm9uQ2hhbmdlKGZhbHNlKTtcbiAgfSxcblxuICBsb2dnZWRJbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICEhbG9jYWxTdG9yYWdlLnRva2VuO1xuICB9LFxuXG4gIG9uQ2hhbmdlOiBmdW5jdGlvbigpIHt9XG59O1xuXG5mdW5jdGlvbiBwcmV0ZW5kUmVxdWVzdChlbWFpbCwgcGFzcywgY2IpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZiAoZW1haWwgPT09ICdqb2VAZXhhbXBsZS5jb20nICYmIHBhc3MgPT09ICdwYXNzd29yZDEnKSB7XG4gICAgICBjYih7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHRydWUsXG4gICAgICAgIHRva2VuOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2Ioe2F1dGhlbnRpY2F0ZWQ6IGZhbHNlfSk7XG4gICAgfVxuICB9LCAwKTtcbn1cblxuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZXMobnVsbCwgXG4gICAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgICAgUm91dGUoe25hbWU6IFwibG9naW5cIiwgaGFuZGxlcjogTG9naW59KSwgXG4gICAgICBSb3V0ZSh7bmFtZTogXCJsb2dvdXRcIiwgaGFuZGxlcjogTG9nb3V0fSksIFxuICAgICAgUm91dGUoe25hbWU6IFwiYWJvdXRcIiwgaGFuZGxlcjogQWJvdXR9KSwgXG4gICAgICBSb3V0ZSh7bmFtZTogXCJkYXNoYm9hcmRcIiwgaGFuZGxlcjogRGFzaGJvYXJkfSlcbiAgICApXG4gIClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChyb3V0ZXMsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpO1xuIixudWxsXX0=
