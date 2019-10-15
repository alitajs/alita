"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderRoutes;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RouteInstanceMap = {
  get: function get(key) {
    return key._routeInternalComponent;
  },
  has: function has(key) {
    return key._routeInternalComponent !== undefined;
  },
  set: function set(key, value) {
    key._routeInternalComponent = value;
  }
}; // Support pass props from layout to child routes

var RouteWithProps = function RouteWithProps(_ref) {
  var path = _ref.path,
      exact = _ref.exact,
      strict = _ref.strict,
      _render = _ref.render,
      location = _ref.location,
      sensitive = _ref.sensitive,
      rest = _objectWithoutProperties(_ref, ["path", "exact", "strict", "render", "location", "sensitive"]);

  return _react.default.createElement(_reactRouterDom.Route, {
    path: path,
    exact: exact,
    strict: strict,
    location: location,
    sensitive: sensitive,
    render: function render(props) {
      return _render(_objectSpread({}, props, {}, rest));
    }
  });
};

function getCompatProps(props) {
  var compatProps = {};

  if (__UMI_BIGFISH_COMPAT) {
    if (props.match && props.match.params && !props.params) {
      compatProps.params = props.match.params;
    }
  }

  return compatProps;
}

function withRoutes(route) {
  if (RouteInstanceMap.has(route)) {
    return RouteInstanceMap.get(route);
  }

  var Routes = route.Routes;
  var len = Routes.length - 1;

  var Component = function Component(args) {
    var render = args.render,
        props = _objectWithoutProperties(args, ["render"]);

    return render(props);
  };

  var _loop = function _loop() {
    var AuthRoute = Routes[len];
    var OldComponent = Component;

    Component = function Component(props) {
      return _react.default.createElement(AuthRoute, props, _react.default.createElement(OldComponent, props));
    };

    len -= 1;
  };

  while (len >= 0) {
    _loop();
  }

  var ret = function ret(args) {
    var _render2 = args.render,
        rest = _objectWithoutProperties(args, ["render"]);

    return _react.default.createElement(RouteWithProps, _extends({}, rest, {
      render: function render(props) {
        return _react.default.createElement(Component, _extends({}, props, {
          route: route,
          render: _render2
        }));
      }
    }));
  };

  RouteInstanceMap.set(route, ret);
  return ret;
}

function wrapWithInitialProps(WrappedComponent, initialProps) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class(props) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
        _this.state = {
          extraProps: {}
        };
        return _this;
      }

      _createClass(_class, [{
        key: "componentDidMount",
        value: function () {
          var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _this2 = this;

            var history;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    history = this.props.history;

                    window.onpopstate = function () {
                      _this2.getInitialProps();
                    };

                    if (history.action !== 'POP') {
                      this.getInitialProps();
                    }

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidMount() {
            return _componentDidMount.apply(this, arguments);
          }

          return componentDidMount;
        }() // 前端路由切换时，也需要执行 getInitialProps

      }, {
        key: "getInitialProps",
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            var _this$props, match, location, extraProps;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // the values may be different with findRoute.js
                    _this$props = this.props, match = _this$props.match, location = _this$props.location;
                    _context2.next = 3;
                    return WrappedComponent.getInitialProps(_objectSpread({
                      isServer: false,
                      route: match,
                      location: location
                    }, initialProps));

                  case 3:
                    extraProps = _context2.sent;
                    this.setState({
                      extraProps: extraProps
                    });

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function getInitialProps() {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(WrappedComponent, _objectSpread({}, this.props, {}, this.state.extraProps));
        }
      }]);

      return _class;
    }(_react.default.Component)
  );
}

function renderRoutes(routes) {
  var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var switchProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var plugins = require('umi/_runtimePlugin');

  return routes ? _react.default.createElement(_reactRouterDom.Switch, switchProps, routes.map(function (route, i) {
    if (route.redirect) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        key: route.key || i,
        from: route.path,
        to: route.redirect,
        exact: route.exact,
        strict: route.strict
      });
    }

    var RouteRoute = route.Routes ? withRoutes(route) : RouteWithProps;
    return _react.default.createElement(RouteRoute, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      sensitive: route.sensitive,
      render: function render(props) {
        var childRoutes = renderRoutes(route.routes, extraProps, {
          location: props.location
        });

        if (route.component) {
          var compatProps = getCompatProps(_objectSpread({}, props, {}, extraProps));
          var newProps = plugins.apply('modifyRouteProps', {
            initialValue: _objectSpread({}, props, {}, extraProps, {}, compatProps),
            args: {
              route: route
            }
          });
          var Component = route.component;

          if (__IS_BROWSER && Component.getInitialProps) {
            var initialProps = plugins.apply('modifyInitialProps', {
              initialValue: {}
            });
            Component = wrapWithInitialProps(Component, initialProps);
          }

          return _react.default.createElement(Component, _extends({}, newProps, {
            route: route
          }), childRoutes);
        } else {
          return childRoutes;
        }
      }
    });
  })) : null;
}