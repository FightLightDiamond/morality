(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_home_index_tsx"],{

/***/ "./resources/js/Pages/home/index.tsx":
/*!*******************************************!*\
  !*** ./resources/js/Pages/home/index.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var layout_1 = __importDefault(__webpack_require__(/*! ../../components/common/layout */ "./resources/js/components/common/layout/index.tsx"));

var HomePage = function HomePage() {
  return react_1["default"].createElement(layout_1["default"], {
    title: 'home'
  }, react_1["default"].createElement("div", null, react_1["default"].createElement("p", null, "Welcome to home page!")));
};

exports.default = HomePage;

/***/ }),

/***/ "./resources/js/components/common/layout/index.tsx":
/*!*********************************************************!*\
  !*** ./resources/js/components/common/layout/index.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var Layout = function Layout(props) {
  var title = props.title,
      children = props.children;
  return react_1["default"].createElement("div", {
    className: 'container'
  }, title && react_1["default"].createElement("div", {
    className: 'row'
  }, react_1["default"].createElement("div", {
    className: 'col-sm-12'
  }, react_1["default"].createElement("h1", null, title))), react_1["default"].createElement("div", {
    className: 'row'
  }, react_1["default"].createElement("div", {
    className: 'col-sm-12'
  }, children)));
};

exports.default = Layout;

/***/ })

}]);