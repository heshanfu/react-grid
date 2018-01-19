'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _class2, _temp; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _moment3 = require('react-day-picker/moment');

var _moment4 = _interopRequireDefault(_moment3);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

require('react-day-picker/lib/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = (0, _reactIntl.injectIntl)(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleContainerMouseDown = function () {
      _this.clickedInside = true;
      // The input's onBlur method is called from a queue right after onMouseDown event.
      // setTimeout adds another callback in the queue, but is called later than onBlur event
      _this.clickTimeout = setTimeout(function () {
        _this.clickedInside = false;
      }, 0);
    };

    _this.handleInputFocus = function () {
      _this.setState({
        showOverlay: true
      });
    };

    _this.handleInputBlur = function () {
      var showOverlay = _this.clickedInside;

      _this.setState({
        showOverlay: showOverlay
      });

      // Force input's focus if blur event was caused by clicking on the calendar
      if (showOverlay) {
        _this.input.focus();
      }
    };

    _this.handleInputChange = function (e) {
      var value = e.target.value;

      // Remove invisble LRM chars from datestring

      if (value.replace) {
        value = value.replace(/\u200E/g, '');
      }

      if (value === '') {
        _this.setState({
          selectedDay: null
        });
        _this.props.onChange(null);
        return;
      }
      _this.props.onChange(value);

      var momentDay = _moment2.default.utc(value, _this.props.dateFormat);
      if (/^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(value) && momentDay.isValid()) {
        _this.setState({
          selectedDay: momentDay.toDate()
        }, function () {
          if (_this.daypicker) {
            _this.daypicker.showMonth(_this.state.selectedDay);
          }
        });
      }
    };

    _this.handleDayClick = function (e, day) {
      _this.setState({
        selectedDay: day,
        showOverlay: false
      });
      // Remove invisble LRM chars from datestring
      _this.props.onChange(_this.props.intl.formatDate(_moment2.default.utc(day).format()).replace(/\u200E/g, ''));
      _this.input.blur();
    };

    var state = {
      showOverlay: false,
      selectedDay: null
    };
    if (props.value !== '' && /^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(props.value)) {
      var momentDay = _moment2.default.utc(props.value, props.dateFormat);
      if (momentDay.isValid()) {
        state.selectedDay = momentDay.toDate();
      }
    }
    _this.state = state;
    _this.localeUtils = Object.assign(_moment4.default, { getFirstDayOfWeek: function getFirstDayOfWeek() {
        return _moment2.default.localeData().firstDayOfWeek();
      } });
    _this.input = null;
    _this.daypicker = null;
    _this.clickedInside = false;
    _this.clickTimeout = null;
    return _this;
  }

  DatePicker.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  };

  DatePicker.prototype.render = function render() {
    var _this2 = this;

    /* eslint-disable no-unused-vars */
    var _props = this.props,
        language = _props.language,
        dateFormat = _props.dateFormat,
        value = _props.value,
        onChange = _props.onChange,
        intl = _props.intl,
        inputProps = _props.inputProps,
        _inputRef = _props.inputRef,
        disabled = _props.disabled,
        otherProps = _objectWithoutProperties(_props, ['language', 'dateFormat', 'value', 'onChange', 'intl', 'inputProps', 'inputRef', 'disabled']);

    var overlayStyle = {
      backgroundColor: '#fff',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
    };
    return _react2.default.createElement(
      _reactTether2.default,
      {
        attachment: 'top center',
        constraints: [{
          to: 'scrollParent',
          attachment: 'together'
        }]
      },
      _react2.default.createElement(
        _reactBootstrap.FormGroup,
        null,
        _react2.default.createElement(_reactBootstrap.FormControl, _extends({
          type: 'text',
          inputRef: function inputRef(el) {
            _this2.input = el;
            _inputRef(el);
          },
          value: value,
          onChange: this.handleInputChange,
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          disabled: disabled
        }, inputProps))
      ),
      this.state.showOverlay && _react2.default.createElement(
        'div',
        {
          style: overlayStyle,
          onMouseDown: this.handleContainerMouseDown,
          role: 'presentation'
        },
        _react2.default.createElement(_reactDayPicker2.default, _extends({
          ref: function ref(el) {
            _this2.daypicker = el;
          },
          onDayClick: this.handleDayClick,
          selectedDays: function selectedDays(day) {
            return _reactDayPicker.DateUtils.isSameDay(_this2.state.selectedDay, day);
          },
          localeUtils: this.localeUtils,
          locale: language
        }, otherProps))
      )
    );
  };

  return DatePicker;
}(_react2.default.Component), _class2.propTypes = {
  intl: _reactIntl.intlShape.isRequired,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  language: _propTypes2.default.string.isRequired,
  dateFormat: _propTypes2.default.string,
  inputProps: _propTypes2.default.object,
  inputRef: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
}, _class2.defaultProps = {
  value: '',
  dateFormat: 'L',
  onChange: function onChange() {},

  inputProps: {},
  inputRef: function inputRef() {},

  disabled: false
}, _temp)) || _class;

exports.default = DatePicker;