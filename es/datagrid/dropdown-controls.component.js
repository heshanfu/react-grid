'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactIntl = require('react-intl');

var _reactIcons = require('@opuscapita/react-icons');

var _datagrid = require('./datagrid.props');

var _dropdownMenu = require('../dropdown-menu');

require('./dropdown-controls.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, DropdownControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRemoveClick = function () {
      if (_this.props.selectedItems.has(0)) {
        _this.props.remove(_this.props.grid, _this.props.onRemove);
      }
    }, _this.handleToggleFilteringClick = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _this.handleColumnSettingsClick = function () {
      _this.props.openColumnSettingsModal(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DropdownControls.prototype.render = function render() {
    var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
    var menuItems = [];
    if (this.props.filtering) {
      menuItems.push({
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridShowFilteringRow' }),
        icon: this.props.isFiltering ? _react2.default.createElement(_reactIcons.Icon, {
          type: 'indicator',
          name: 'ok',
          width: 18,
          height: 18
        }) : undefined,
        onClick: this.handleToggleFilteringClick
      });
    }
    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }
    if (this.props.columnSettings) {
      menuItems.push({
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridColumnSettings' }),
        onClick: this.handleColumnSettingsClick
      });
    }
    if (this.props.removing) {
      menuItems.push({
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Delete' }),
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick
      });
    }
    return _react2.default.createElement(_dropdownMenu.DropdownMenu, {
      id: this.props.grid.id,
      disabled: disabled,
      menuItems: menuItems
    });
  };

  return DropdownControls;
}(_react2.default.PureComponent), _class.propTypes = {
  grid: _datagrid.gridShape.isRequired,
  // actions
  remove: _propTypes2.default.func.isRequired,
  toggleFiltering: _propTypes2.default.func.isRequired,
  openColumnSettingsModal: _propTypes2.default.func.isRequired,
  // data
  selectedItems: _reactImmutableProptypes2.default.list.isRequired,
  isBusy: _propTypes2.default.bool.isRequired,
  isCreating: _propTypes2.default.bool.isRequired,
  isEditing: _propTypes2.default.bool.isRequired,
  isFiltering: _propTypes2.default.bool.isRequired,
  // config
  onRemove: _propTypes2.default.func.isRequired,
  filtering: _propTypes2.default.bool,
  removing: _propTypes2.default.bool,
  columnSettings: _propTypes2.default.bool,
  dropdownMenuItems: _propTypes2.default.array,
  disableActions: _propTypes2.default.bool
}, _class.defaultProps = {
  filtering: false,
  removing: false,
  columnSettings: false,
  dropdownMenuItems: [],
  disableActions: false
}, _temp2);
exports.default = DropdownControls;