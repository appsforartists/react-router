(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var API = 'http://addressbook-api.herokuapp.com/contacts';
var _contacts = {};
var _changeListeners = [];
var _initCalled = false;

var ContactStore = module.exports = {

  init: function () {
    if (_initCalled)
      return;

    _initCalled = true;

    getJSON(API, function (err, res) {
      res.contacts.forEach(function (contact) {
        _contacts[contact.id] = contact;
      });

      ContactStore.notifyChange();
    });
  },

  addContact: function (contact, cb) {
    postJSON(API, { contact: contact }, function (res) {
      _contacts[res.contact.id] = res.contact;
      ContactStore.notifyChange();
      if (cb) cb(res.contact);
    });
  },

  removeContact: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _contacts[id];
    ContactStore.notifyChange();
  },

  getContacts: function () {
    var array = [];

    for (var id in _contacts)
      array.push(_contacts[id]);

    return array;
  },

  getContact: function (id) {
    return _contacts[id];
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  }

};

function getJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  req.send();
}

function postJSON(url, obj, cb) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    cb(JSON.parse(req.response));
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = cb;
  req.open('DELETE', url);
  req.send();
}



},{}],2:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var ContactStore = require('./ContactStore');

var App = React.createClass({displayName: 'App',
  getInitialState: function() {
    return {
      contacts: ContactStore.getContacts(),
      loading: true
    };
  },

  componentWillMount: function () {
    ContactStore.init();
  },

  componentDidMount: function() {
    ContactStore.addChangeListener(this.updateContacts);
  },

  componentWillUnmount: function () {
    ContactStore.removeChangeListener(this.updateContacts);
  },

  updateContacts: function () {
    if (!this.isMounted())
      return;

    this.setState({
      contacts: ContactStore.getContacts(),
      loading: false
    });
  },

  render: function() {
    var contacts = this.state.contacts.map(function(contact) {
      return React.DOM.li({key: contact.id}, Link({to: "contact", params: contact}, contact.first))
    });
    return (
      React.DOM.div({className: "App"}, 
        React.DOM.div({className: "ContactList"}, 
          Link({to: "new"}, "New Contact"), 
          React.DOM.ul(null, 
            contacts
          ), 
          Link({to: "/nothing-here"}, "Invalid Link (not found)")
        ), 
        React.DOM.div({className: "Content"}, 
          this.props.activeRouteHandler()
        )
      )
    );
  }
});

var Index = React.createClass({displayName: 'Index',
  render: function() {
    return React.DOM.h1(null, "Address Book");
  }
});

var Contact = React.createClass({displayName: 'Contact',

  mixins: [ Router.Navigation ],

  getStateFromStore: function(props) {
    props = props || this.props;
    return {
      contact: ContactStore.getContact(props.params.id)
    };
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  componentDidMount: function() {
    ContactStore.addChangeListener(this.updateContact);
  },

  componentWillUnmount: function () {
    ContactStore.removeChangeListener(this.updateContact);
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(this.getStateFromStore(newProps));
  },

  updateContact: function () {
    if (!this.isMounted())
      return;

    this.setState(this.getStateFromStore())
  },

  destroy: function() {
    ContactStore.removeContact(this.props.params.id);
    this.transitionTo('/');
  },

  render: function() {
    var contact = this.state.contact || {};
    var name = contact.first + ' ' + contact.last;
    var avatar = contact.avatar || 'http://placekitten.com/50/50';
    return (
      React.DOM.div({className: "Contact"}, 
        React.DOM.img({height: "50", src: avatar}), 
        React.DOM.h3(null, name), 
        React.DOM.button({onClick: this.destroy}, "Delete")
      )
    );
  }
});

var NewContact = React.createClass({displayName: 'NewContact',

  mixins: [ Router.Navigation ],

  createContact: function(event) {
    event.preventDefault();
    ContactStore.addContact({
      first: this.refs.first.getDOMNode().value,
      last: this.refs.last.getDOMNode().value
    }, function(contact) {
      this.transitionTo('contact', { id: contact.id });
    }.bind(this));
  },

  render: function() {
    return (
      React.DOM.form({onSubmit: this.createContact}, 
        React.DOM.p(null, 
          React.DOM.input({type: "text", ref: "first", placeholder: "First name"}), 
          React.DOM.input({type: "text", ref: "last", placeholder: "Last name"})
        ), 
        React.DOM.p(null, 
          React.DOM.button({type: "submit"}, "Save"), " ", Link({to: "/"}, "Cancel")
        )
      )
    );
  }
});

var NotFound = React.createClass({displayName: 'NotFound',
  render: function() {
    return React.DOM.h2(null, "Not found");
  }
});

var routes = (
  Route({handler: App}, 
    DefaultRoute({handler: Index}), 
    Route({name: "new", path: "contact/new", handler: NewContact}), 
    Route({name: "contact", path: "contact/:id", handler: Contact}), 
    NotFoundRoute({handler: NotFound})
  )
);

React.renderComponent(
  Routes({children: routes}),
  document.getElementById('example')
);


},{"./ContactStore":1,"react":"M6d2gk"}],3:[function(require,module,exports){

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yeWFuZi9Db2RlL2dpdGh1Yi9yYWNrdC9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvbWFzdGVyLWRldGFpbC9Db250YWN0U3RvcmUuanMiLCIvVXNlcnMvcnlhbmYvQ29kZS9naXRodWIvcmFja3QvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL21hc3Rlci1kZXRhaWwvYXBwLmpzIiwiL1VzZXJzL3J5YW5mL0NvZGUvZ2l0aHViL3JhY2t0L3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQVBJID0gJ2h0dHA6Ly9hZGRyZXNzYm9vay1hcGkuaGVyb2t1YXBwLmNvbS9jb250YWN0cyc7XG52YXIgX2NvbnRhY3RzID0ge307XG52YXIgX2NoYW5nZUxpc3RlbmVycyA9IFtdO1xudmFyIF9pbml0Q2FsbGVkID0gZmFsc2U7XG5cbnZhciBDb250YWN0U3RvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF9pbml0Q2FsbGVkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgX2luaXRDYWxsZWQgPSB0cnVlO1xuXG4gICAgZ2V0SlNPTihBUEksIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgcmVzLmNvbnRhY3RzLmZvckVhY2goZnVuY3Rpb24gKGNvbnRhY3QpIHtcbiAgICAgICAgX2NvbnRhY3RzW2NvbnRhY3QuaWRdID0gY29udGFjdDtcbiAgICAgIH0pO1xuXG4gICAgICBDb250YWN0U3RvcmUubm90aWZ5Q2hhbmdlKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgYWRkQ29udGFjdDogZnVuY3Rpb24gKGNvbnRhY3QsIGNiKSB7XG4gICAgcG9zdEpTT04oQVBJLCB7IGNvbnRhY3Q6IGNvbnRhY3QgfSwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgX2NvbnRhY3RzW3Jlcy5jb250YWN0LmlkXSA9IHJlcy5jb250YWN0O1xuICAgICAgQ29udGFjdFN0b3JlLm5vdGlmeUNoYW5nZSgpO1xuICAgICAgaWYgKGNiKSBjYihyZXMuY29udGFjdCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlQ29udGFjdDogZnVuY3Rpb24gKGlkLCBjYikge1xuICAgIGRlbGV0ZUpTT04oQVBJICsgJy8nICsgaWQsIGNiKTtcbiAgICBkZWxldGUgX2NvbnRhY3RzW2lkXTtcbiAgICBDb250YWN0U3RvcmUubm90aWZ5Q2hhbmdlKCk7XG4gIH0sXG5cbiAgZ2V0Q29udGFjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgIGZvciAodmFyIGlkIGluIF9jb250YWN0cylcbiAgICAgIGFycmF5LnB1c2goX2NvbnRhY3RzW2lkXSk7XG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG5cbiAgZ2V0Q29udGFjdDogZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIF9jb250YWN0c1tpZF07XG4gIH0sXG5cbiAgbm90aWZ5Q2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9KTtcbiAgfSxcblxuICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycyA9IF9jaGFuZ2VMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIgIT09IGw7XG4gICAgfSk7XG4gIH1cblxufTtcblxuZnVuY3Rpb24gZ2V0SlNPTih1cmwsIGNiKSB7XG4gIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyZXEuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIGNiKG5ldyBFcnJvcignbm90IGZvdW5kJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYihudWxsLCBKU09OLnBhcnNlKHJlcS5yZXNwb25zZSkpO1xuICAgIH1cbiAgfTtcbiAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG4gIHJlcS5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIHBvc3RKU09OKHVybCwgb2JqLCBjYikge1xuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBjYihKU09OLnBhcnNlKHJlcS5yZXNwb25zZSkpO1xuICB9O1xuICByZXEub3BlbignUE9TVCcsIHVybCk7XG4gIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG4gIHJlcS5zZW5kKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVKU09OKHVybCwgY2IpIHtcbiAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub25sb2FkID0gY2I7XG4gIHJlcS5vcGVuKCdERUxFVEUnLCB1cmwpO1xuICByZXEuc2VuZCgpO1xufVxuXG5cbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBSb3V0ZSA9IFJvdXRlci5Sb3V0ZTtcbnZhciBEZWZhdWx0Um91dGUgPSBSb3V0ZXIuRGVmYXVsdFJvdXRlO1xudmFyIFJvdXRlcyA9IFJvdXRlci5Sb3V0ZXM7XG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xudmFyIE5vdEZvdW5kUm91dGUgPSBSb3V0ZXIuTm90Rm91bmRSb3V0ZTtcbnZhciBDb250YWN0U3RvcmUgPSByZXF1aXJlKCcuL0NvbnRhY3RTdG9yZScpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQXBwJyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29udGFjdHM6IENvbnRhY3RTdG9yZS5nZXRDb250YWN0cygpLFxuICAgICAgbG9hZGluZzogdHJ1ZVxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgQ29udGFjdFN0b3JlLmluaXQoKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgQ29udGFjdFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdHMpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgQ29udGFjdFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdHMpO1xuICB9LFxuXG4gIHVwZGF0ZUNvbnRhY3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzTW91bnRlZCgpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb250YWN0czogQ29udGFjdFN0b3JlLmdldENvbnRhY3RzKCksXG4gICAgICBsb2FkaW5nOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRhY3RzID0gdGhpcy5zdGF0ZS5jb250YWN0cy5tYXAoZnVuY3Rpb24oY29udGFjdCkge1xuICAgICAgcmV0dXJuIFJlYWN0LkRPTS5saSh7a2V5OiBjb250YWN0LmlkfSwgTGluayh7dG86IFwiY29udGFjdFwiLCBwYXJhbXM6IGNvbnRhY3R9LCBjb250YWN0LmZpcnN0KSlcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcIkFwcFwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJDb250YWN0TGlzdFwifSwgXG4gICAgICAgICAgTGluayh7dG86IFwibmV3XCJ9LCBcIk5ldyBDb250YWN0XCIpLCBcbiAgICAgICAgICBSZWFjdC5ET00udWwobnVsbCwgXG4gICAgICAgICAgICBjb250YWN0c1xuICAgICAgICAgICksIFxuICAgICAgICAgIExpbmsoe3RvOiBcIi9ub3RoaW5nLWhlcmVcIn0sIFwiSW52YWxpZCBMaW5rIChub3QgZm91bmQpXCIpXG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiQ29udGVudFwifSwgXG4gICAgICAgICAgdGhpcy5wcm9wcy5hY3RpdmVSb3V0ZUhhbmRsZXIoKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBJbmRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0luZGV4JyxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmgxKG51bGwsIFwiQWRkcmVzcyBCb29rXCIpO1xuICB9XG59KTtcblxudmFyIENvbnRhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDb250YWN0JyxcblxuICBtaXhpbnM6IFsgUm91dGVyLk5hdmlnYXRpb24gXSxcblxuICBnZXRTdGF0ZUZyb21TdG9yZTogZnVuY3Rpb24ocHJvcHMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRhY3Q6IENvbnRhY3RTdG9yZS5nZXRDb250YWN0KHByb3BzLnBhcmFtcy5pZClcbiAgICB9O1xuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUoKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgQ29udGFjdFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBDb250YWN0U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGVDb250YWN0KTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXdQcm9wcykge1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21TdG9yZShuZXdQcm9wcykpO1xuICB9LFxuXG4gIHVwZGF0ZUNvbnRhY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUoKSlcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICBDb250YWN0U3RvcmUucmVtb3ZlQ29udGFjdCh0aGlzLnByb3BzLnBhcmFtcy5pZCk7XG4gICAgdGhpcy50cmFuc2l0aW9uVG8oJy8nKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWN0ID0gdGhpcy5zdGF0ZS5jb250YWN0IHx8IHt9O1xuICAgIHZhciBuYW1lID0gY29udGFjdC5maXJzdCArICcgJyArIGNvbnRhY3QubGFzdDtcbiAgICB2YXIgYXZhdGFyID0gY29udGFjdC5hdmF0YXIgfHwgJ2h0dHA6Ly9wbGFjZWtpdHRlbi5jb20vNTAvNTAnO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiQ29udGFjdFwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5pbWcoe2hlaWdodDogXCI1MFwiLCBzcmM6IGF2YXRhcn0pLCBcbiAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIG5hbWUpLCBcbiAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7b25DbGljazogdGhpcy5kZXN0cm95fSwgXCJEZWxldGVcIilcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxudmFyIE5ld0NvbnRhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdOZXdDb250YWN0JyxcblxuICBtaXhpbnM6IFsgUm91dGVyLk5hdmlnYXRpb24gXSxcblxuICBjcmVhdGVDb250YWN0OiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgQ29udGFjdFN0b3JlLmFkZENvbnRhY3Qoe1xuICAgICAgZmlyc3Q6IHRoaXMucmVmcy5maXJzdC5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICBsYXN0OiB0aGlzLnJlZnMubGFzdC5nZXRET01Ob2RlKCkudmFsdWVcbiAgICB9LCBmdW5jdGlvbihjb250YWN0KSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25UbygnY29udGFjdCcsIHsgaWQ6IGNvbnRhY3QuaWQgfSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZm9ybSh7b25TdWJtaXQ6IHRoaXMuY3JlYXRlQ29udGFjdH0sIFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcbiAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwidGV4dFwiLCByZWY6IFwiZmlyc3RcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgbmFtZVwifSksIFxuICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCh7dHlwZTogXCJ0ZXh0XCIsIHJlZjogXCJsYXN0XCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgbmFtZVwifSlcbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oe3R5cGU6IFwic3VibWl0XCJ9LCBcIlNhdmVcIiksIFwiIFwiLCBMaW5rKHt0bzogXCIvXCJ9LCBcIkNhbmNlbFwiKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBOb3RGb3VuZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ05vdEZvdW5kJyxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmgyKG51bGwsIFwiTm90IGZvdW5kXCIpO1xuICB9XG59KTtcblxudmFyIHJvdXRlcyA9IChcbiAgUm91dGUoe2hhbmRsZXI6IEFwcH0sIFxuICAgIERlZmF1bHRSb3V0ZSh7aGFuZGxlcjogSW5kZXh9KSwgXG4gICAgUm91dGUoe25hbWU6IFwibmV3XCIsIHBhdGg6IFwiY29udGFjdC9uZXdcIiwgaGFuZGxlcjogTmV3Q29udGFjdH0pLCBcbiAgICBSb3V0ZSh7bmFtZTogXCJjb250YWN0XCIsIHBhdGg6IFwiY29udGFjdC86aWRcIiwgaGFuZGxlcjogQ29udGFjdH0pLCBcbiAgICBOb3RGb3VuZFJvdXRlKHtoYW5kbGVyOiBOb3RGb3VuZH0pXG4gIClcbik7XG5cblJlYWN0LnJlbmRlckNvbXBvbmVudChcbiAgUm91dGVzKHtjaGlsZHJlbjogcm91dGVzfSksXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG5cbiIsbnVsbF19
