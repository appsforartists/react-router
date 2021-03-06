API: `Location` (object)
==========================

You can supply the router with your own location implementation. The
following methods must be implemented:

Methods
-------

### `setup()`

Called when the router is first setup.

### `teardown`

Called when the router is torn down.

### `push`

Called when the router is transitioning from one path to another.

### `replace`

Called when ther router is replacing (not transitioning) one url with
another.

### `pop`

Called when the router attempts to go back one entry in the history.

### `toString`

Should return a useful string for logging and debugging.

Example
-------

This is a terrible example, you're probably better off looking at the
implementations in this repository.

```js
var MyLocation = {

  setup: function () {},

  teardown: function () {},

  push: function (path) {},

  replace: function (path) {},

  pop: function () {},

  toString: function () {}

};
```
