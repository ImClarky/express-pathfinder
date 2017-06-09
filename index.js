var _methods = require('http').METHODS

module.exports = function(routes, methods) {

  if (typeof methods == "undefined") {
    methods = _methods
  } else if (typeof methods == "string") {
    methods = methods.toUpperCase()
    if (_methods.indexOf(methods) === -1) {
      console.log("")
      return
    }
  } else if (typeof methods == "object" && Array.isArray(methods)) {
    var errors = [];
    var initialCount = methods.length
    methods = methods.map(function(method) {
      method = method.toUpperCase()
      if (_methods.indexOf(method) === -1) {
        errors.push(method)
        return
      }
      return method
    })

    if (errors.length > 0) {
      console.log("The following Methods that were provided are not supported and have been omitted: " + errors.join(", "))
      if (errors.length == initialCount) {
        console.log("")
        return
      }
    }
  } else {
    // ERROR
    return
  }

  var list = [],
    route

  routes.forEach(function(middleware) {
    if (middleware.route) {
      var associatedMethod = Object.keys(middleware.route.methods)[0].toUpperCase() //object should only have one key - the method
      if (methods.indexOf(associatedMethod) !== -1) {
        route = {}
        route.method = associatedMethod
        route.path = middleware.route.path

        list.push(route)
      }
    } else if (middleware.name === "router") {

      /** gets the first part of the uri that app._router.stack forgets
       * for example:
       *     app.use('/users', users)
       * would ommit the '/users' part in the uris - not giving you the full path
       */
      var mount = middleware.regexp.toString().match(/([\/\\A-Za-z0-9-_]+)\?/)[1]
      mount = mount.replace(/\\/g, "")
      mount = mount.replace(/\/$/, "")

      middleware.handle.stack.forEach(function(handler) {
        var associatedMethod = Object.keys(handler.route.methods)[0].toUpperCase() //object should only have one key - the method
        if (methods.indexOf(associatedMethod) !== -1) {
          route = {}
          route.method = associatedMethod
          route.path = mount + handler.route.path

          list.push(route)
        } else {
          return
        }
      })
    }
  })

  return list
}
