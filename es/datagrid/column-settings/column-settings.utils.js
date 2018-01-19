'use strict';

exports.__esModule = true;

var _reactSortableHoc = require('react-sortable-hoc');

var _datagrid = require('../datagrid.utils');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escapeRegExp = /[-\\^$*+?.()|[\]{}]/g;
var escapeKeyword = function escapeKeyword(keyword) {
  return keyword.replace(escapeRegExp, '\\$&');
};

exports.default = {
  getAvailableColumns: function getAvailableColumns(columns, visibleColumns) {
    return columns.map(function (col, i) {
      var columnKey = _datagrid2.default.getColumnKey(col);
      var header = col.header,
          isLocked = col.isLocked;

      var isSelected = visibleColumns.indexOf(columnKey) !== -1;
      var sort = i + 1;
      return {
        columnKey: columnKey,
        name: header,
        isLocked: isLocked,
        isSelected: isSelected,
        sort: sort
      };
    });
  },
  getSelectedColumns: function getSelectedColumns(columns, visibleColumns) {
    var selectedColumns = [];
    visibleColumns.forEach(function (columnKey, i) {
      columns.forEach(function (col) {
        if (_datagrid2.default.getColumnKey(col) === columnKey) {
          var header = col.header,
              isLocked = col.isLocked;

          var isSelected = true;
          var sort = i + 1;
          selectedColumns.push({
            columnKey: columnKey,
            name: header,
            isLocked: isLocked,
            isSelected: isSelected,
            sort: sort
          });
        }
      });
    });
    return selectedColumns;
  },
  changeColumnSort: function changeColumnSort(columns, oldIndex, newIndex) {
    var changeOverLockedItems = false;
    if (oldIndex + 1 < newIndex) {
      for (var i = oldIndex; i < newIndex; i += 1) {
        if (columns[i] && columns[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    if (oldIndex > newIndex + 1) {
      for (var _i = oldIndex; _i > newIndex; _i -= 1) {
        if (columns[_i] && columns[_i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    var sortedColumns = [];
    if (changeOverLockedItems) {
      // Swap items if sorting is done over locked item to keep it in place
      var _i2 = void 0;
      _i2 = columns.length;
      while (_i2 > 0) {
        _i2 -= 1;
        sortedColumns[_i2] = columns[_i2];
      }
      sortedColumns[oldIndex] = columns[newIndex];
      sortedColumns[newIndex] = columns[oldIndex];
    } else {
      // Normal sorting move all other items up/down
      sortedColumns = (0, _reactSortableHoc.arrayMove)(columns, oldIndex, newIndex);
    }
    return sortedColumns;
  },
  filterColumns: function filterColumns(columns, keyword) {
    var filteredColumns = void 0;
    if (keyword !== '') {
      var regexp = new RegExp(escapeKeyword(keyword), 'i');
      filteredColumns = columns.filter(function (c) {
        return regexp.test(c.name);
      });
    } else {
      filteredColumns = columns;
    }
    return filteredColumns;
  },
  getHiddenColumns: function getHiddenColumns(availableColumns) {
    var hiddenColumns = [];
    availableColumns.forEach(function (col) {
      if (!col.isSelected) {
        hiddenColumns.push(col.columnKey);
      }
    });
    return hiddenColumns;
  },
  getColumnOrders: function getColumnOrders(selectedColumns) {
    return selectedColumns.map(function (col) {
      return col.columnKey;
    });
  }
};