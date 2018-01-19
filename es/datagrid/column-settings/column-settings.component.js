'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _datagrid = require('../datagrid.props');

var _availableColumnsList = require('./available-columns-list.component');

var _availableColumnsList2 = _interopRequireDefault(_availableColumnsList);

var _selectedColumnsList = require('./selected-columns-list.component');

var _selectedColumnsList2 = _interopRequireDefault(_selectedColumnsList);

var _columnSettings = require('./column-settings.utils');

var _columnSettings2 = _interopRequireDefault(_columnSettings);

require('./column-settings.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnSettings = (_temp = _class = function (_React$PureComponent) {
  _inherits(ColumnSettings, _React$PureComponent);

  function ColumnSettings(props) {
    _classCallCheck(this, ColumnSettings);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var availableColumns = _columnSettings2.default.getAvailableColumns(props.columns, props.visibleColumns);
    var selectedColumns = _columnSettings2.default.getSelectedColumns(props.columns, props.visibleColumns);
    _this.state = {
      keyword: '',
      availableColumns: availableColumns,
      visibleAvailableColumns: availableColumns,
      selectedColumns: selectedColumns
    };
    return _this;
  }

  ColumnSettings.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Modal,
      {
        bsSize: 'large',
        dialogClassName: 'oc-datagrid-column-settings-modal',
        'aria-labelledby': 'oc-datagrid-column-settings-modal',
        show: true,
        onHide: this.handleCancelClick
      },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        { closeButton: true },
        _react2.default.createElement(
          _reactBootstrap.Modal.Title,
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridSelectColumns' })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(
          _reactBootstrap.Grid,
          { fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 6 },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                null,
                _react2.default.createElement(
                  _reactBootstrap.ControlLabel,
                  null,
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridAvailableColumns' })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 6 },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                null,
                _react2.default.createElement(
                  _reactBootstrap.ControlLabel,
                  null,
                  _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridSelectedColumns' })
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 6 },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                { className: 'oc-datagrid-column-settings-keyword-group' },
                _react2.default.createElement(_reactBootstrap.FormControl, {
                  id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-keyword',
                  type: 'text',
                  name: 'keyword',
                  value: this.state.keyword,
                  onChange: this.handleKeywordChange,
                  className: 'oc-datagrid-column-settings-keyword-input'
                }),
                _react2.default.createElement(_reactFontawesome2.default, { className: 'oc-datagrid-column-settings-keyword-icon', name: 'search' })
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 6 },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                null,
                _react2.default.createElement(_availableColumnsList2.default, {
                  id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-available-columns',
                  items: this.state.visibleAvailableColumns,
                  onSelectItem: this.handleSelectItem,
                  onDeselectItem: this.handleDeselectItem
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 6 },
              _react2.default.createElement(
                _reactBootstrap.FormGroup,
                null,
                _react2.default.createElement(_selectedColumnsList2.default, {
                  id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-selected-columns',
                  items: this.state.selectedColumns,
                  onSortChange: this.handleSortChange,
                  onRemoveItem: this.handleDeselectItem
                })
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Footer,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-ok-button',
            bsStyle: 'primary',
            onClick: this.handleOkClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Ok' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(_react2.default.PureComponent), _class.propTypes = {
  grid: _datagrid.gridShape.isRequired,
  columns: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  visibleColumns: _reactImmutableProptypes2.default.list.isRequired,
  closeColumnSettingsModal: _propTypes2.default.func.isRequired,
  saveColumnSettings: _propTypes2.default.func.isRequired
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleCancelClick = function () {
    _this2.props.closeColumnSettingsModal(_this2.props.grid);
  };

  this.handleOkClick = function () {
    var hiddenColumns = _columnSettings2.default.getHiddenColumns(_this2.state.availableColumns);
    var columnOrders = _columnSettings2.default.getColumnOrders(_this2.state.selectedColumns);
    _this2.props.saveColumnSettings(_this2.props.grid, hiddenColumns, columnOrders);
    _this2.props.closeColumnSettingsModal(_this2.props.grid);
  };

  this.handleKeywordChange = function (e) {
    var keyword = e.target.value;
    var visibleAvailableColumns = _columnSettings2.default.filterColumns(_this2.state.availableColumns, keyword);
    _this2.setState({ keyword: keyword, visibleAvailableColumns: visibleAvailableColumns });
  };

  this.handleSortChange = function (_ref) {
    var oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex;

    var selectedColumns = _columnSettings2.default.changeColumnSort(_this2.state.selectedColumns, oldIndex, newIndex);
    _this2.setState({ selectedColumns: selectedColumns });
  };

  this.handleSelectItem = function (item) {
    // add item to the end of the list
    var _state = _this2.state,
        availableColumns = _state.availableColumns,
        visibleAvailableColumns = _state.visibleAvailableColumns;

    var selectedColumns = [].concat(_this2.state.selectedColumns, [item]);
    availableColumns.forEach(function (col, i) {
      if (col.columnKey === item.columnKey) {
        availableColumns[i].isSelected = true;
      }
    });
    visibleAvailableColumns.forEach(function (col, i) {
      if (col.columnKey === item.columnKey) {
        visibleAvailableColumns[i].isSelected = true;
      }
    });
    _this2.setState({ availableColumns: availableColumns, visibleAvailableColumns: visibleAvailableColumns, selectedColumns: selectedColumns });
  };

  this.handleDeselectItem = function (item) {
    var _state2 = _this2.state,
        availableColumns = _state2.availableColumns,
        visibleAvailableColumns = _state2.visibleAvailableColumns;

    var selectedColumns = _this2.state.selectedColumns.filter(function (c) {
      return c.columnKey !== item.columnKey;
    });
    availableColumns.forEach(function (col, i) {
      if (col.columnKey === item.columnKey) {
        availableColumns[i].isSelected = false;
      }
    });
    visibleAvailableColumns.forEach(function (col, i) {
      if (col.columnKey === item.columnKey) {
        visibleAvailableColumns[i].isSelected = false;
      }
    });
    _this2.setState({ availableColumns: availableColumns, visibleAvailableColumns: visibleAvailableColumns, selectedColumns: selectedColumns });
  };
}, _temp);
exports.default = ColumnSettings;