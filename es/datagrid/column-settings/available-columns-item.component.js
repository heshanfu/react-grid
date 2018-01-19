'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnItem = (_temp = _class = function (_React$PureComponent) {
  _inherits(ColumnItem, _React$PureComponent);

  function ColumnItem() {
    _classCallCheck(this, ColumnItem);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ColumnItem.prototype.render = function render() {
    var _props = this.props,
        isLocked = _props.isLocked,
        isSelected = _props.isSelected,
        name = _props.name,
        handleItemClick = _props.handleItemClick;

    var iconClassName = (0, _classnames2.default)({
      'oc-datagrid-available-columns-item-icon': true,
      'is-locked': !!isLocked
    });
    return _react2.default.createElement(
      'div',
      { className: 'oc-datagrid-available-columns-item' },
      _react2.default.createElement(_reactFontawesome2.default, {
        className: iconClassName,
        name: isSelected ? 'check-square' : 'square-o',
        onClick: isLocked ? undefined : handleItemClick
      }),
      _react2.default.createElement(
        'span',
        { className: 'oc-datagrid-available-columns-item-text' },
        name
      )
    );
  };

  return ColumnItem;
}(_react2.default.PureComponent), _class.propTypes = {
  isLocked: _propTypes2.default.bool,
  isSelected: _propTypes2.default.bool,
  name: _propTypes2.default.node,
  handleItemClick: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
  isLocked: false,
  isSelected: true,
  name: ''
}, _temp);
exports.default = ColumnItem;