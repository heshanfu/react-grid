'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIcons = require('@opuscapita/react-icons');

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _reactSortableHoc = require('react-sortable-hoc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
  var value = _ref.value,
      handleItemRemove = _ref.handleItemRemove;
  return _react2.default.createElement(
    'div',
    {
      key: value.columnKey,
      className: 'oc-datagrid-selected-columns-item' + (value.isLocked ? ' locked' : '')
    },
    _react2.default.createElement(
      'span',
      { className: 'oc-datagrid-selected-columns-item-text' },
      value.name
    ),
    !value.isLocked && _react2.default.createElement(_reactIcons.Icon, {
      type: 'indicator',
      name: 'draggingArrows',
      className: 'oc-datagrid-selected-columns-dragging-icon',
      width: 20,
      height: 20
    }),
    value.isLocked && _react2.default.createElement(_reactIcons.Icon, {
      type: 'indicator',
      name: 'locked',
      className: 'oc-datagrid-selected-columns-locked-icon',
      width: 30,
      height: 30
    }),
    !value.isLocked && _react2.default.createElement(_reactIcons.Icon, {
      type: 'indicator',
      name: 'remove',
      className: 'oc-datagrid-selected-columns-remove-icon',
      width: 16,
      height: 16,
      onClick: handleItemRemove
    })
  );
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
  var items = _ref2.items,
      handleItemRemove = _ref2.handleItemRemove;
  return _react2.default.createElement(
    'div',
    { className: 'oc-datagrid-selected-columns-list' },
    _react2.default.createElement(
      _reactPerfectScrollbar2.default,
      null,
      items.map(function (value, index) {
        return _react2.default.createElement(SortableItem, {
          key: value.columnKey,
          index: index,
          value: value,
          disabled: value.isLocked,
          handleItemRemove: handleItemRemove(value)
        });
      })
    )
  );
});

var SelectedColumnsList = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(SelectedColumnsList, _React$PureComponent);

  function SelectedColumnsList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectedColumnsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleItemRemove = function (value) {
      return function () {
        _this.props.onRemoveItem(value);
      };
    }, _this.shouldCancelStart = function (e) {
      if (e.target.className.baseVal && e.target.className.baseVal.indexOf('oc-icon-remove') !== -1) {
        return true;
      }
      return false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectedColumnsList.prototype.render = function render() {
    return _react2.default.createElement(SortableList, {
      items: this.props.items,
      onSortEnd: this.props.onSortChange,
      handleItemRemove: this.handleItemRemove,
      shouldCancelStart: this.shouldCancelStart
    });
  };

  return SelectedColumnsList;
}(_react2.default.PureComponent), _class.propTypes = {
  items: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSortChange: _propTypes2.default.func.isRequired,
  onRemoveItem: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = SelectedColumnsList;