# express-pathfinder
A module that provides a simple Method - URI views of all the registered routes in an Express application.

### What does it do?
`express-pathfinder` takes advantage of Express's `app._router.stack` object and iterates over the registered routes to get the attached method and the related URI.

### Why not just use `app._router.stack`?
The main problem that I have found with `app._router.stack` is that, if you mount router modules onto paths, it does not provide the path the router was mounted on.

For example, if I have a `user.js` and a `staff.js` in my routes folder, and they both have something like:

```js
router.get("/login", function(req, res, next){
  res.render("loginview", {/* some data */})
})
```

And I included and mounted them in my `app.js` like so:

```js
var users = require("./routes/users.js")
var staff = require("./routes/staff.js")

app.use("/users", users)
app.use("/staff", staff)
```

And then used `app._router.stack` and iterated over the results to get the method and uri of all the routes, I would end up having two `GET` routes with the same path of `/login`, becuase it has not included the path that the route files were mounted on.

`express-pathfinder` takes care of this problem.


## Installation

```
npm install express-pathfinder
```

## Usage
Usage is quite simple for this module. Inside the the main application file (app.js for example) add the following:

```js
var pathfinder = require('express-pathfinder')

var routes = pathfinder(app._router.stack, "GET")
```

The above code will retireve all of the paths registered with the method `GET`.

If I wanted to get both `GET` and `POST` routes, for example, I could change the second line to:

```js
var routes = pathfinder(app._router.stack, ["GET", "POST"])
```

Providing an array of methods instead of a string.

The second, methods, parameter is an optional parameter. If no specific methods are provided, by string or array, then the function to the default settings of using all of the methods supported by the http module.

**Note:** The pathfinder function must be used *after* mounting the router modules to their respective paths.

### Example Data Returned
```js
[
  { method: "GET", path: "/" },
  { method: "GET", path: "/users" },
  { method: "GET", path: "/users/:user_id/profile" },
  { method: "GET", path: "/users/login" },
  { method: "POST", path: "/users/login" },
  { method: "GET", path: "/articles/:id" },
]
```

### Function and Parameters

`pathfinder(routes, methods)` - returns Array

| Parameter | Expected Type | Examples | Description | Default |
|---|---|---|---|---|
| routes | Object | `app._router.stack`| The object that contains the information about the routes registered in the Express application | N/A |
| methods (optional)| String<br>Array | `"GET"`<br>`["GET", "POST"]` | A string, or an array of strings, outlining the method(s) that should be looked for when returning routes | `require('http').METHODS` |
