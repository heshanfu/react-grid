'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownContainer = (_temp = _class = function (_React$PureComponent) {
  _inherits(DropdownContainer, _React$PureComponent);

  function DropdownContainer() {
    _classCallCheck(this, DropdownContainer);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  /** Note: 'useAnchor' prop makes dropdown.toggle render as a link rather than
   * a button with onClick issue when it wraps an input
   */

  DropdownContainer.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        id = _props.id,
        isOpen = _props.isOpen,
        noCaret = _props.noCaret,
        title = _props.title,
        useAnchor = _props.useAnchor,
        otherProps = _objectWithoutProperties(_props, ['children', 'id', 'isOpen', 'noCaret', 'title', 'useAnchor']);

    return _react2.default.createElement(
      _reactBootstrap.Dropdown,
      _extends({
        id: id,
        open: isOpen
      }, otherProps),
      _react2.default.createElement(
        _reactBootstrap.Dropdown.Toggle,
        {
          noCaret: noCaret,
          open: isOpen,
          useAnchor: useAnchor
        },
        title
      ),
      _react2.default.createElement(
        _reactBootstrap.Dropdown.Menu,
        null,
        children
      )
    );
  };

  return DropdownContainer;
}(_react2.default.PureComponent), _class.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  title: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.element]).isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),
  noCaret: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  dropup: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  pullRight: _propTypes2.default.bool,
  style: _propTypes2.default.shape({
    bsSize: _propTypes2.default.string,
    bsStyle: _propTypes2.default.string
  }),
  useAnchor: _propTypes2.default.bool
}, _class.defaultProps = {
  children: null,
  disabled: false,
  dropup: false,
  isOpen: false,
  noCaret: false,
  onToggle: function onToggle() {},
  pullRight: false,
  style: {
    bsSize: 'xs',
    bsStyle: 'info'
  },
  useAnchor: false
}, _temp);
exports.default = DropdownContainer;