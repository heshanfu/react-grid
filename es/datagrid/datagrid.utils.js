'use strict';

exports.__esModule = true;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-nested-ternary */
var getColumnKey = function getColumnKey(col) {
  return col.columnKey || col.valueKeyPath.join('/');
};

var getVisibleColumns = function getVisibleColumns(cols) {
  var hiddenColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columnOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var orderedColumnList = [];
  cols.forEach(function (col, i) {
    var columnKey = getColumnKey(col);
    if (hiddenColumns.indexOf(columnKey) === -1) {
      var colOrderIdx = columnOrder.indexOf(columnKey);
      var order = colOrderIdx !== -1 ? colOrderIdx : i + 1;
      orderedColumnList.push({
        columnKey: columnKey,
        order: order
      });
    }
  });
  return orderedColumnList.sort(function (a, b) {
    return a.order - b.order;
  }).map(function (item) {
    return item.columnKey;
  });
};

exports.default = {
  getColumnKey: getColumnKey,
  getColumnDefaultValues: function getColumnDefaultValues(cols) {
    var columnDefaultValues = {};
    cols.forEach(function (col) {
      if (col.defaultValue !== undefined) {
        columnDefaultValues[getColumnKey(col)] = col.defaultValue;
      }
    });
    return columnDefaultValues;
  },
  getCellStyleByCol: function getCellStyleByCol(col) {
    if (col.align) {
      return {
        textAlign: col.align
      };
    }
    // No default align if component is select
    // Because rendered data is most likely text
    // Even if valueType is number
    if (col.componentType === 'select') {
      return {};
    }
    switch (col.valueType) {
      case 'number':
      case 'float':
      case 'date':
        return {
          textAlign: 'right'
        };
      default:
        return {};
    }
  },
  isSortable: function isSortable(col) {
    return col.valueType && (col.sortValueGetter || col.valueKeyPath) && !col.disableSorting;
  },
  getSortComparator: function getSortComparator(col) {
    if (col.sortComparator) {
      return col.sortComparator;
    }
    switch (col.valueType) {
      case 'text':
        return function (a, b) {
          return a.localeCompare ? a.localeCompare(b) : 1;
        };
      case 'number':
        return function (a, b) {
          return a - b;
        };
      case 'float':
        return function (a, b) {
          return a - b;
        };
      case 'boolean':
        return function (a, b) {
          return a === b ? 0 : a ? -1 : 1;
        };
      case 'date':
        return function (a, b) {
          return new Date(b) - new Date(a);
        };
      default:
        return function (a, b) {
          return a.localeCompare ? a.localeCompare(b) : 1;
        };
    }
  },
  getSortValueGetter: function getSortValueGetter(col) {
    if (col.sortValueGetter) {
      return col.sortValueGetter;
    }
    return function (data) {
      return data.getIn(col.valueKeyPath);
    };
  },
  getFilterFunctions: function getFilterFunctions(col) {
    var filterFunctions = {
      valueEmptyChecker: function valueEmptyChecker(val) {
        return val === '' || val === null || val === undefined;
      },
      filterMatcher: function filterMatcher(val, filterVal) {
        return new RegExp(filterVal, 'i').test(val);
      }
    };
    switch (col.valueType) {
      case 'text':
        break;
      case 'number':
        filterFunctions.valueEmptyChecker = function (val) {
          return val === '' || (0, _isNaN2.default)(val) || val === null || val === undefined;
        };
        filterFunctions.filterMatcher = function (val, filterVal) {
          return parseInt(val, 10) === parseInt(filterVal, 10);
        };
        break;
      case 'float':
        filterFunctions.valueEmptyChecker = function (val) {
          return val === '' || (0, _isNaN2.default)(val) || val === null || val === undefined;
        };
        filterFunctions.filterMatcher = function (val, filterVal) {
          var parsedFilterVal = filterVal.replace(',', '.');
          return parseFloat(parsedFilterVal) === val;
        };
        break;
      case 'boolean':
        filterFunctions.filterMatcher = function (val, filterVal) {
          return val === filterVal;
        };
        break;
      case 'date':
        filterFunctions.filterMatcher = function (val, filterVal) {
          return (0, _moment2.default)(filterVal, 'L').isSame(val, 'day');
        };
        break;
      case 'select':
        filterFunctions.filterMatcher = function (val, filterVal) {
          return val === filterVal;
        };
        break;
      default:
    }
    if (col.valueEmptyChecker) {
      filterFunctions.valueEmptyChecker = col.valueEmptyChecker;
    }
    if (col.filterMatcher) {
      filterFunctions.filterMatcher = col.filterMatcher;
    }
    return filterFunctions;
  },
  loadSelectedItems: function loadSelectedItems(grid) {
    var sessionItem = sessionStorage.getItem('oc_grid_selectedItems_' + grid.id);
    if (sessionItem && !grid.disableRememberSelectedItems) {
      try {
        return JSON.parse(sessionItem);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing selectedItems from sessionStorage', e);
      }
    }
    return [];
  },
  loadGridConfig: function loadGridConfig(grid, cols) {
    var columnWidths = localStorage.getItem('oc_grid_columnWidths_' + grid.id);
    var hiddenColumns = localStorage.getItem('oc_grid_hiddenColumns_' + grid.id);
    var columnOrder = localStorage.getItem('oc_grid_columnOrder_' + grid.id);
    var sortingData = sessionStorage.getItem('oc_grid_sorting_' + grid.id);
    var filterData = sessionStorage.getItem('oc_grid_filtering_' + grid.id);
    var isFilteringData = localStorage.getItem('oc_grid_isFiltering_' + grid.id);
    var parsedHiddenCols = void 0;
    var parsedColOrder = void 0;
    var isFiltering = false;
    if (isFilteringData && !grid.disableRememberIsFiltering) {
      try {
        isFiltering = JSON.parse(isFilteringData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing isFilteringData from localStorage', e);
      }
    }
    if (hiddenColumns) {
      try {
        parsedHiddenCols = JSON.parse(hiddenColumns);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing hiddenColumns from localStorage', e);
      }
    }
    if (columnOrder) {
      try {
        parsedColOrder = JSON.parse(columnOrder);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnOrder from localStorage', e);
      }
    }
    var config = {
      visibleColumns: getVisibleColumns(cols, parsedHiddenCols, parsedColOrder),
      filteringData: {
        isFiltering: isFiltering
      }
    };
    if (columnWidths && !grid.disableRememberColumnWidths) {
      try {
        config.columnWidths = JSON.parse(columnWidths);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnWidths from localStorage', e);
      }
    }
    if (sortingData && !grid.disableRememberSortData) {
      try {
        config.sortingData = JSON.parse(sortingData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing sortingData from sessionStorage', e);
      }
    }
    if (filterData && isFiltering && !grid.disableRememberFilteData) {
      try {
        config.filteringData.filterData = JSON.parse(filterData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing filterData from sessionStorage', e);
      }
    }

    if (!config.sortingData && grid.defaultSortColumn) {
      config.sortingData = {
        sortColumn: grid.defaultSortColumn,
        sortOrder: grid.defaultSortOrder || 'asc'
      };
    }
    return config;
  },
  saveSelectedItems: function saveSelectedItems(grid, selectedItems) {
    if (grid.disableRememberSelectedItems) return false;
    if (!selectedItems) return false;
    sessionStorage.setItem('oc_grid_selectedItems_' + grid.id, JSON.stringify(selectedItems));
    return true;
  },
  saveColumnWidths: function saveColumnWidths(grid, columnWidths) {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnWidths) return false;
    localStorage.setItem('oc_grid_columnWidths_' + grid.id, JSON.stringify(columnWidths));
    return true;
  },
  saveHiddenColumns: function saveHiddenColumns(grid, hiddenColumns) {
    if (!hiddenColumns) return false;
    localStorage.setItem('oc_grid_hiddenColumns_' + grid.id, JSON.stringify(hiddenColumns));
    return true;
  },
  saveColumnOrder: function saveColumnOrder(grid, columnOrder) {
    if (!columnOrder) return false;
    localStorage.setItem('oc_grid_columnOrder_' + grid.id, JSON.stringify(columnOrder));
    return true;
  },
  saveSortData: function saveSortData(grid, sortingData) {
    if (grid.disableRememberSortData) return false;
    if (!sortingData) return false;
    sessionStorage.setItem('oc_grid_sorting_' + grid.id, JSON.stringify(sortingData));
    return true;
  },
  saveFilterData: function saveFilterData(grid, filterData) {
    if (grid.disableRememberFilteData) return false;
    if (!filterData) return false;
    sessionStorage.setItem('oc_grid_filtering_' + grid.id, JSON.stringify(filterData));
    return true;
  },
  saveIsFiltering: function saveIsFiltering(grid, isFiltering) {
    if (grid.disableRememberIsFiltering) return false;
    if (isFiltering === undefined) return false;
    localStorage.setItem('oc_grid_isFiltering_' + grid.id, JSON.stringify(isFiltering));
    if (!isFiltering) {
      sessionStorage.removeItem('oc_grid_filtering_' + grid.id);
    }
    return true;
  },
  /* eslint-disable max-len */
  checkGridParam: function checkGridParam(gridParam) {
    if (gridParam) {
      if (!gridParam.id) {
        throw new Error('[Grid] Invalid `grid.id` parameter, update action parameters to new format!');
      }
      if (!gridParam.idKeyPath) {
        throw new Error('[Grid] Invalid `grid.idKeyPath` parameter, update action parameters to new format!');
      }
    } else {
      throw new Error('[Grid] Invalid `grid` parameter, update action parameters to new format!');
    }
  },
  checkColumnsParam: function checkColumnsParam(columnsParam) {
    if (!columnsParam) {
      throw new Error('[Grid] Invalid `columns` parameter, update action parameters to new format!');
    }
  }
};