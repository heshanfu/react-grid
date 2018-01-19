'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _availableColumnsItem = require('./available-columns-item.component');

var _availableColumnsItem2 = _interopRequireDefault(_availableColumnsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AvailableColumnsList = (_temp2 = _class = function (_React$Component) {
  _inherits(AvailableColumnsList, _React$Component);

  function AvailableColumnsList() {
    var _temp, _this, _ret;

    _classCallCheck(this, AvailableColumnsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleItemClick = function (item) {
      return function () {
        if (item.isSelected) {
          _this.props.onDeselectItem(item);
        } else {
          _this.props.onSelectItem(item);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AvailableColumnsList.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { className: 'oc-datagrid-available-columns-list' },
      _react2.default.createElement(
        _reactPerfectScrollbar2.default,
        null,
        this.props.items.map(function (item) {
          return _react2.default.createElement(_availableColumnsItem2.default, {
            key: item.columnKey,
            isSelected: item.isSelected,
            isLocked: item.isLocked,
            name: item.name,
            handleItemClick: _this2.handleItemClick(item)
          });
        })
      )
    );
  };

  return AvailableColumnsList;
}(_react2.default.Component), _class.propTypes = {
  items: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSelectItem: _propTypes2.default.func.isRequired,
  onDeselectItem: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = AvailableColumnsList;