/**
 * This is a trimmed down representation of what express returns
 * when you access the app._router.stack array
 */

module.exports = [{
    route: {
      path: "/test",
      methods: {
        get: true
      }
    }
  },
  {
    route: {
      path: "/test",
      methods: {
        post: true
      }
    }
  },
  {
    handle: {
      stack: [{
          route: {
            path: "/login",
            methods: {
              get: true
            }
          }
        },
        {
          route: {
            path: "/login",
            methods: {
              post: true
            }
          }
        },
        {
          route: {
            path: "/edituser/:userID",
            methods: {
              get: true
            }
          }
        },
        {
          route: {
            path: "/deleteuser/:userID",
            methods: {
              delete: true
            }
          }
        }
      ]
    },
    name: "router",
    regexp: /^\/admin\/?(?=\/|$)/i
  }
]
