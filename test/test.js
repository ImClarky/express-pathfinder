var exampleRoutes = require('./example-route-data')
var expressApp = require('./express-application/app')
var pathfinder = require('../')
var assert = require('chai').assert
var expect = require('chai').expect

describe("Test Routes - SIMULATED ROUTES", function() {
  it("Should get all routes from the list", function() {
    var routes = pathfinder(exampleRoutes);
    assert.equal(routes.length, 6)
  })

  it("should get all GET routes", function() {
    var routes = pathfinder(exampleRoutes, "POST")

    assert.equal(routes.length, 2)
  })

  it("should include the mount path at the start of the url", function() {
    var routes = pathfinder(exampleRoutes, "DELETE") // Delete is only used in a "mounted route"
    var regex = /^\/admin\/[a-zA-Z0-9]*/

    var test = regex.test(routes[0].path)

    assert.isTrue(test)
  })

  it("should throw an Error as supplied HTTP method is not supported", function() {
    expect(() => {
      pathfinder(exampleRoutes, "FOOBAR")
    }).to.throw(Error)
  })

  it("should throw an TypeError as supplied method parameter is not of the correct type", function() {
    expect(() => {
      pathfinder(exampleRoutes, 123456)
    }).to.throw(TypeError)
  })
})


describe("Test Routes - EXPRESS APPLICATION", function() {
  it("Should get all routes from the list", function() {
    var routes = pathfinder(expressApp._router.stack)
    assert.equal(routes.length, 6)
  })

  it("should get all GET routes", function() {
    var routes = pathfinder(expressApp._router.stack, "POST")

    assert.equal(routes.length, 2)
  })

  it("should include the mount path at the start of the url", function() {
    var routes = pathfinder(expressApp._router.stack, "DELETE") // Delete is only used in a "mounted route"
    var regex = /^\/admin\/[a-zA-Z0-9]*/

    var test = regex.test(routes[0].path)

    assert.isTrue(test)
  })

  it("should throw an Error as supplied HTTP method is not supported", function() {
    expect(() => {
      pathfinder(expressApp._router.stack, "FOOBAR")
    }).to.throw(Error)
  })

  it("should throw a TypeError as supplied method parameter is not of the correct type", function() {
    expect(() => {
      pathfinder(expressApp._router.stack, 123456)
    }).to.throw(TypeError)
  })
})
