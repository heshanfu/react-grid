/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types, max-len */
/* eslint-disable no-multi-spaces, object-curly-newline */
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

var bool = PropTypes.bool,
    number = PropTypes.number,
    string = PropTypes.string,
    func = PropTypes.func,
    object = PropTypes.object,
    node = PropTypes.node,
    array = PropTypes.array,
    shape = PropTypes.shape,
    any = PropTypes.any,
    oneOfType = PropTypes.oneOfType,
    arrayOf = PropTypes.arrayOf;
var list = ImmutablePropTypes.list,
    map = ImmutablePropTypes.map,
    mapOf = ImmutablePropTypes.mapOf;


export var configStorageShape = shape({
  load: func.isRequired,
  save: func.isRequired
});

// Grid object holds data that also actions uses
export var gridShape = shape({
  id: string.isRequired,
  idKeyPath: arrayOf(string).isRequired, // keyPath to id data
  defaultShowFilteringRow: bool, // is filtering row shown as default
  defaultSortColumn: string, // columnKey of column that is sorted by default
  defaultSortOrder: string, // default sort order [asc/desc]
  disableRememberColumnWidths: bool,
  disableRememberSortData: bool,
  disableRememberIsFiltering: bool,
  disableRememberFilteData: bool,
  disableRememberSelectedItems: bool,
  language: string,
  region: string,
  dateFormat: string,
  thousandSeparator: string,
  decimalSeparator: string,
  configStorage: configStorageShape,
  pagination: bool
});

export var columnShape = shape({
  header: node,
  columnKey: string, // Use valueKeyPath if possible, this is calculated from there
  valueKeyPath: array, // key path for the cell data value, required if no columnKey is given
  valueType: string, // data value type [text/number/float/boolean/date]
  valueOptions: shape({ // options for the value type
    currencyKeyPath: array, // key path to currency code (only for currency data type)
    decimals: number, // number of decimals override
    thousandSeparator: string, // thousand separator override
    decimalSeparator: string // decimal separator override
  }),
  componentType: string, // edit component type [text/number/float/select/boolean/date]
  valueRender: func, // custom renderer for the value, data as parameter
  editValueRender: func, // custom renderer for the edit value, data as parameter
  createValueRender: func, // custom renderer for the create value, data as parameter
  filterValueRender: func, // custom renderer for the filter value, data as parameter
  cell: func, // override cell renderer, rowIndex as parameter
  cellEdit: func, // override cellEdit renderer, rowIndex as parameter
  cellCreate: func, // override cellCreate renderer, rowIndex as parameter
  cellFilter: func, // override cellFilter renderer, rowIndex as parameter
  renderComponentProps: object, // additional props to the render component
  editComponentProps: object, // additional props to the edit component
  createComponentProps: object, // additional props to the create component
  filterComponentProps: object, // additional props to the filter component
  width: number,
  minWidth: number,
  maxWidth: number,
  align: string, // vertical cell alignment, defaults to 'left'
  fixed: bool, // is column fixed
  allowCellsRecycling: bool, // allow cells to be recycled for better horizontal scrolling perf
  disableResizing: bool, // disable column resizing
  disableEditing: bool, // disable input component (make read-only) when editing/creating
  disableSorting: bool, // disable filtering on this column
  disableEditingOnValueMatch: shape({ // disable editing/creating input when other columns value match
    matchValueKeyPath: array,
    matchValue: any
  }),
  onValueMatchChangeValue: shape({ // Change other column value when data matches
    matchValue: any,
    newValueKeyPath: array,
    newValue: any
  }),
  flexGrow: number,
  valueEmptyChecker: func, // override function that checks if value is considered as empty
  sortValueGetter: func, // override sort value getter, defaults to getIn(valueKeyPath)
  sortComparator: func, // override sort comparator function, default sorts by valueType
  filterMatcher: func, // override filter matcher function, that defined when filter matches data
  defaultValue: any, // default value for the column when creating new item
  isRequired: bool, // is column value required
  isHidden: bool, // is column hidden by default
  onEditValueChange: func, // callback with (value, valueKeyPath, rowIndex, dataId)
  onCreateValueChange: func, // callbac with (value, valueKeyPath, rowIndex)
  onCreateBlur: func, // callback with (value, rowIndex)
  onEditBlur: func, // callback with (value, rowIndex, dataId)
  selectComponentOptions: arrayOf(shape({
    value: oneOfType([number, string, bool]).isRequired,
    label: oneOfType([number, string]).isRequired
  })),
  selectComponentTranslations: shape({ // customize select components placeholder and noResults texts.
    placeholder: string,
    noResultsText: string
  })
});

export var propTypes = {
  children: node,
  // App props
  intl: object.isRequired,
  // Action props
  addNewItem: func.isRequired,
  removeNewItem: func.isRequired,
  create: func.isRequired,
  edit: func.isRequired,
  remove: func.isRequired,
  save: func.isRequired,
  cancel: func.isRequired,
  sortChange: func.isRequired,
  resizeColumn: func.isRequired,
  invalidate: func.isRequired,
  cellSelectionChange: func.isRequired,
  itemSelectionChange: func.isRequired,
  toggleFiltering: func.isRequired,
  editCellValueChange: func.isRequired,
  createCellValueChange: func.isRequired,
  filterCellValueChange: func.isRequired,
  editCellValueValidate: func.isRequired,
  createCellValueValidate: func.isRequired,
  validateEditedRows: func.isRequired,
  validateCreatedRows: func.isRequired,
  // State props
  isBusy: bool.isRequired,
  isEditing: bool.isRequired,
  isCreating: bool.isRequired,
  isFiltering: bool.isRequired,
  sortColumn: oneOfType([string, number]),
  sortOrder: string,
  visibleColumns: list.isRequired,
  columnWidths: map.isRequired,
  selectedCell: map.isRequired,
  selectedItems: list.isRequired,
  data: list.isRequired,
  editData: map.isRequired,
  createData: list.isRequired,
  filterData: map.isRequired,
  cellMessages: map.isRequired,
  createCellMessages: map.isRequired,
  language: string.isRequired,
  region: string.isRequired,
  thousandSeparator: string.isRequired,
  decimalSeparator: string.isRequired,
  allDataSize: number.isRequired,
  // Required component properties
  grid: gridShape.isRequired,
  columns: arrayOf(columnShape.isRequired).isRequired,
  // Optional component properties
  rowsCount: number,
  gridHeader: node,
  actionBar: node,
  actionBarLeft: node,
  cellSelect: bool,
  disableDropdown: bool, // Don't use dropdown menu in the action bar
  disableFilteringControls: bool, // Don't display the filtering controls (only valid if disableDropdown is true)
  dropdownMenuItems: arrayOf(shape({
    id: string,
    title: node,
    icon: node,
    onClick: func,
    disabled: oneOfType([bool, func])
  })),
  inlineEdit: bool,
  inlineAdd: bool,
  filtering: bool,
  removing: bool,
  columnSettings: bool,
  rowSelect: bool,
  rowSelectCheckboxColumn: bool,
  multiSelect: bool,
  selectComponentOptions: mapOf(arrayOf(shape({ // Options data for the react-select components
    value: oneOfType([number, string, bool]).isRequired,
    label: oneOfType([number, string]).isRequired
  }))),
  selectComponentTranslations: shape({ // Options for react-select text translations
    placeholder: string.isRequired,
    noResultsText: string.isRequired
  }),
  disableActions: bool, // Disable actions in the action bar
  disableActionsMessage: shape({
    messageId: string,
    messageValues: shape({})
  }),
  disableActionBar: bool,
  disableActionSave: bool,
  enableArrowNavigation: bool,
  onSave: func,
  onRemove: func,
  onCancel: func,
  onAddClick: func,
  onEditClick: func,
  onLastCellTabPress: func,
  tabIndex: number, // tabIndex value for inputs in cells
  extraColumn: shape({ // Extra fixed column that can't be re-ordered or hidden
    width: string,
    valueRender: func,
    cellEdit: func,
    cellCreate: func,
    cellFilter: func,
    isResizable: bool
  }),
  contextMenuItems: arrayOf(shape({ // Context menu items to display when row is right-clicked
    value: node,
    onClick: func,
    title: string,
    header: bool,
    disabled: oneOfType([bool, func]),
    divider: bool
  })),
  // Fixed data table built-in features
  headerHeight: number,
  filterRowHeight: number,
  rowHeight: number,
  containerStyle: object,
  scrollToColumn: number,
  scrollTop: number,
  scrollToRow: number,
  onRowClick: func,
  onRowDoubleClick: func,
  onRowMouseDown: func,
  onRowMouseEnter: func,
  onRowMouseLeave: func,
  onScrollStart: func,
  onScrollEnd: func,
  rowClassNameGetter: func,
  rowHeightGetter: func,
  onContentHeightChange: func,
  className: string,
  focusType: map.isRequired,
  pagination: shape({
    pageSize: number.isRequired,
    totalSize: number.isRequired,
    getData: func.isRequired
  })
};

/* eslint-enable max-len, prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

export var defaultProps = {
  cellSelect: false,
  columnSettings: false,
  children: undefined,
  containerStyle: {},
  disableActionSave: false,
  enableArrowNavigation: false,
  headerHeight: 40,
  filterRowHeight: 40,
  rowHeight: 40,
  onSave: function onSave() {},
  onRemove: function onRemove() {},
  onCancel: function onCancel() {},
  tabIndex: 1,
  disableFilteringControls: false,
  className: ''
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5wcm9wcy5qcyJdLCJuYW1lcyI6WyJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9iamVjdCIsIm5vZGUiLCJhcnJheSIsInNoYXBlIiwiYW55Iiwib25lT2ZUeXBlIiwiYXJyYXlPZiIsImxpc3QiLCJtYXAiLCJtYXBPZiIsImNvbmZpZ1N0b3JhZ2VTaGFwZSIsImxvYWQiLCJpc1JlcXVpcmVkIiwic2F2ZSIsImdyaWRTaGFwZSIsImlkIiwiaWRLZXlQYXRoIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJkZWZhdWx0U29ydENvbHVtbiIsImRlZmF1bHRTb3J0T3JkZXIiLCJkaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsImxhbmd1YWdlIiwicmVnaW9uIiwiZGF0ZUZvcm1hdCIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImNvbmZpZ1N0b3JhZ2UiLCJwYWdpbmF0aW9uIiwiY29sdW1uU2hhcGUiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJ2YWx1ZVR5cGUiLCJ2YWx1ZU9wdGlvbnMiLCJjdXJyZW5jeUtleVBhdGgiLCJkZWNpbWFscyIsImNvbXBvbmVudFR5cGUiLCJ2YWx1ZVJlbmRlciIsImVkaXRWYWx1ZVJlbmRlciIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjZWxsIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImFsaWduIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVJlc2l6aW5nIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlU29ydGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJtYXRjaFZhbHVlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJuZXdWYWx1ZSIsImZsZXhHcm93IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJzb3J0VmFsdWVHZXR0ZXIiLCJzb3J0Q29tcGFyYXRvciIsImZpbHRlck1hdGNoZXIiLCJkZWZhdWx0VmFsdWUiLCJpc0hpZGRlbiIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQmx1ciIsIm9uRWRpdEJsdXIiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwidmFsdWUiLCJsYWJlbCIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwibm9SZXN1bHRzVGV4dCIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwiaW50bCIsImFkZE5ld0l0ZW0iLCJyZW1vdmVOZXdJdGVtIiwiY3JlYXRlIiwiZWRpdCIsInJlbW92ZSIsImNhbmNlbCIsInNvcnRDaGFuZ2UiLCJyZXNpemVDb2x1bW4iLCJpbnZhbGlkYXRlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJ0b2dnbGVGaWx0ZXJpbmciLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwiaXNCdXN5IiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzRmlsdGVyaW5nIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsInZpc2libGVDb2x1bW5zIiwiY29sdW1uV2lkdGhzIiwic2VsZWN0ZWRDZWxsIiwic2VsZWN0ZWRJdGVtcyIsImRhdGEiLCJlZGl0RGF0YSIsImNyZWF0ZURhdGEiLCJmaWx0ZXJEYXRhIiwiY2VsbE1lc3NhZ2VzIiwiY3JlYXRlQ2VsbE1lc3NhZ2VzIiwiYWxsRGF0YVNpemUiLCJncmlkIiwiY29sdW1ucyIsInJvd3NDb3VudCIsImdyaWRIZWFkZXIiLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJMZWZ0IiwiY2VsbFNlbGVjdCIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImRyb3Bkb3duTWVudUl0ZW1zIiwidGl0bGUiLCJpY29uIiwib25DbGljayIsImRpc2FibGVkIiwiaW5saW5lRWRpdCIsImlubGluZUFkZCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiY29sdW1uU2V0dGluZ3MiLCJyb3dTZWxlY3QiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsIm11bHRpU2VsZWN0IiwiZGlzYWJsZUFjdGlvbnMiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJtZXNzYWdlSWQiLCJtZXNzYWdlVmFsdWVzIiwiZGlzYWJsZUFjdGlvbkJhciIsImRpc2FibGVBY3Rpb25TYXZlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwib25TYXZlIiwib25SZW1vdmUiLCJvbkNhbmNlbCIsIm9uQWRkQ2xpY2siLCJvbkVkaXRDbGljayIsIm9uTGFzdENlbGxUYWJQcmVzcyIsInRhYkluZGV4IiwiZXh0cmFDb2x1bW4iLCJpc1Jlc2l6YWJsZSIsImNvbnRleHRNZW51SXRlbXMiLCJkaXZpZGVyIiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0IiwiY29udGFpbmVyU3R5bGUiLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsInNjcm9sbFRvUm93Iiwib25Sb3dDbGljayIsIm9uUm93RG91YmxlQ2xpY2siLCJvblJvd01vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsInJvd0NsYXNzTmFtZUdldHRlciIsInJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImNsYXNzTmFtZSIsImZvY3VzVHlwZSIsInBhZ2VTaXplIiwidG90YWxTaXplIiwiZ2V0RGF0YSIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLE9BQU9BLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7O0lBRVFDLEksR0FBb0ZGLFMsQ0FBcEZFLEk7SUFBTUMsTSxHQUE4RUgsUyxDQUE5RUcsTTtJQUFRQyxNLEdBQXNFSixTLENBQXRFSSxNO0lBQVFDLEksR0FBOERMLFMsQ0FBOURLLEk7SUFBTUMsTSxHQUF3RE4sUyxDQUF4RE0sTTtJQUFRQyxJLEdBQWdEUCxTLENBQWhETyxJO0lBQU1DLEssR0FBMENSLFMsQ0FBMUNRLEs7SUFBT0MsSyxHQUFtQ1QsUyxDQUFuQ1MsSztJQUFPQyxHLEdBQTRCVixTLENBQTVCVSxHO0lBQUtDLFMsR0FBdUJYLFMsQ0FBdkJXLFM7SUFBV0MsTyxHQUFZWixTLENBQVpZLE87SUFDeEVDLEksR0FBcUJaLGtCLENBQXJCWSxJO0lBQU1DLEcsR0FBZWIsa0IsQ0FBZmEsRztJQUFLQyxLLEdBQVVkLGtCLENBQVZjLEs7OztBQUVuQixPQUFPLElBQU1DLHFCQUFxQlAsTUFBTTtBQUN0Q1EsUUFBTVosS0FBS2EsVUFEMkI7QUFFdENDLFFBQU1kLEtBQUthO0FBRjJCLENBQU4sQ0FBM0I7O0FBS1A7QUFDQSxPQUFPLElBQU1FLFlBQVlYLE1BQU07QUFDN0JZLE1BQUlqQixPQUFPYyxVQURrQjtBQUU3QkksYUFBV1YsUUFB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dUl2Qm1CLGNBQVk1QixNQUFNO0FBQ2hCb0wsY0FBVTFMLE9BQU9lLFVBREQ7QUFFaEI0SyxlQUFXM0wsT0FBT2UsVUFGRjtBQUdoQjZLLGFBQVMxTCxLQUFLYTtBQUhFLEdBQU47QUF2SVcsQ0FBbEI7O0FBOElQOztBQUVBLE9BQU8sSUFBTThLLGVBQWU7QUFDMUJ4RCxjQUFZLEtBRGM7QUFFMUJZLGtCQUFnQixLQUZVO0FBRzFCeEQsWUFBVXFHLFNBSGdCO0FBSTFCcEIsa0JBQWdCLEVBSlU7QUFLMUJoQixxQkFBbUIsS0FMTztBQU0xQkMseUJBQXVCLEtBTkc7QUFPMUJZLGdCQUFjLEVBUFk7QUFRMUJDLG1CQUFpQixFQVJTO0FBUzFCQyxhQUFXLEVBVGU7QUFVMUJiLFVBQVEsa0JBQU0sQ0FBRSxDQVZVO0FBVzFCQyxZQUFVLG9CQUFNLENBQUUsQ0FYUTtBQVkxQkMsWUFBVSxvQkFBTSxDQUFFLENBWlE7QUFhMUJJLFlBQVUsQ0FiZ0I7QUFjMUIzQiw0QkFBMEIsS0FkQTtBQWUxQmlELGFBQVc7QUFmZSxDQUFyQiIsImZpbGUiOiJkYXRhZ3JpZC5wcm9wcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzLCByZWFjdC9mb3JiaWQtcHJvcC10eXBlcywgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3BhY2VzLCBvYmplY3QtY3VybHktbmV3bGluZSAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5cbmNvbnN0IHsgYm9vbCwgbnVtYmVyLCBzdHJpbmcsIGZ1bmMsIG9iamVjdCwgbm9kZSwgYXJyYXksIHNoYXBlLCBhbnksIG9uZU9mVHlwZSwgYXJyYXlPZiB9ID0gUHJvcFR5cGVzO1xuY29uc3QgeyBsaXN0LCBtYXAsIG1hcE9mIH0gPSBJbW11dGFibGVQcm9wVHlwZXM7XG5cbmV4cG9ydCBjb25zdCBjb25maWdTdG9yYWdlU2hhcGUgPSBzaGFwZSh7XG4gIGxvYWQ6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgc2F2ZTogZnVuYy5pc1JlcXVpcmVkLFxufSk7XG5cbi8vIEdyaWQgb2JqZWN0IGhvbGRzIGRhdGEgdGhhdCBhbHNvIGFjdGlvbnMgdXNlc1xuZXhwb3J0IGNvbnN0IGdyaWRTaGFwZSA9IHNoYXBlKHtcbiAgaWQ6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBpZEtleVBhdGg6IGFycmF5T2Yoc3RyaW5nKS5pc1JlcXVpcmVkLCAvLyBrZXlQYXRoIHRvIGlkIGRhdGFcbiAgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IGJvb2wsICAgICAgICAgLy8gaXMgZmlsdGVyaW5nIHJvdyBzaG93biBhcyBkZWZhdWx0XG4gIGRlZmF1bHRTb3J0Q29sdW1uOiBzdHJpbmcsICAgICAgICAgICAgIC8vIGNvbHVtbktleSBvZiBjb2x1bW4gdGhhdCBpcyBzb3J0ZWQgYnkgZGVmYXVsdFxuICBkZWZhdWx0U29ydE9yZGVyOiBzdHJpbmcsICAgICAgICAgICAgICAvLyBkZWZhdWx0IHNvcnQgb3JkZXIgW2FzYy9kZXNjXVxuICBkaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHM6IGJvb2wsXG4gIGRpc2FibGVSZW1lbWJlclNvcnREYXRhOiBib29sLFxuICBkaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZzogYm9vbCxcbiAgZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhOiBib29sLFxuICBkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zOiBib29sLFxuICBsYW5ndWFnZTogc3RyaW5nLFxuICByZWdpb246IHN0cmluZyxcbiAgZGF0ZUZvcm1hdDogc3RyaW5nLFxuICB0aG91c2FuZFNlcGFyYXRvcjogc3RyaW5nLFxuICBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcsXG4gIGNvbmZpZ1N0b3JhZ2U6IGNvbmZpZ1N0b3JhZ2VTaGFwZSxcbiAgcGFnaW5hdGlvbjogYm9vbCxcbn0pO1xuXG5leHBvcnQgY29uc3QgY29sdW1uU2hhcGUgPSBzaGFwZSh7XG4gIGhlYWRlcjogbm9kZSxcbiAgY29sdW1uS2V5OiBzdHJpbmcsICAgICAgICAgICAgICAvLyBVc2UgdmFsdWVLZXlQYXRoIGlmIHBvc3NpYmxlLCB0aGlzIGlzIGNhbGN1bGF0ZWQgZnJvbSB0aGVyZVxuICB2YWx1ZUtleVBhdGg6IGFycmF5LCAgICAgICAgICAgIC8vIGtleSBwYXRoIGZvciB0aGUgY2VsbCBkYXRhIHZhbHVlLCByZXF1aXJlZCBpZiBubyBjb2x1bW5LZXkgaXMgZ2l2ZW5cbiAgdmFsdWVUeXBlOiBzdHJpbmcsICAgICAgICAgICAgICAvLyBkYXRhIHZhbHVlIHR5cGUgW3RleHQvbnVtYmVyL2Zsb2F0L2Jvb2xlYW4vZGF0ZV1cbiAgdmFsdWVPcHRpb25zOiBzaGFwZSh7ICAgICAgICAgICAvLyBvcHRpb25zIGZvciB0aGUgdmFsdWUgdHlwZVxuICAgIGN1cnJlbmN5S2V5UGF0aDogYXJyYXksICAgICAgIC8vIGtleSBwYXRoIHRvIGN1cnJlbmN5IGNvZGUgKG9ubHkgZm9yIGN1cnJlbmN5IGRhdGEgdHlwZSlcbiAgICBkZWNpbWFsczogbnVtYmVyLCAgICAgICAgICAgICAvLyBudW1iZXIgb2YgZGVjaW1hbHMgb3ZlcnJpZGVcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogc3RyaW5nLCAgICAvLyB0aG91c2FuZCBzZXBhcmF0b3Igb3ZlcnJpZGVcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcsICAgICAvLyBkZWNpbWFsIHNlcGFyYXRvciBvdmVycmlkZVxuICB9KSxcbiAgY29tcG9uZW50VHlwZTogc3RyaW5nLCAgICAgICAgICAvLyBlZGl0IGNvbXBvbmVudCB0eXBlIFt0ZXh0L251bWJlci9mbG9hdC9zZWxlY3QvYm9vbGVhbi9kYXRlXVxuICB2YWx1ZVJlbmRlcjogZnVuYywgICAgICAgICAgICAgIC8vIGN1c3RvbSByZW5kZXJlciBmb3IgdGhlIHZhbHVlLCBkYXRhIGFzIHBhcmFtZXRlclxuICBlZGl0VmFsdWVSZW5kZXI6IGZ1bmMsICAgICAgICAgIC8vIGN1c3RvbSByZW5kZXJlciBmb3IgdGhlIGVkaXQgdmFsdWUsIGRhdGEgYXMgcGFyYW1ldGVyXG4gIGNyZWF0ZVZhbHVlUmVuZGVyOiBmdW5jLCAgICAgICAgLy8gY3VzdG9tIHJlbmRlcmVyIGZvciB0aGUgY3JlYXRlIHZhbHVlLCBkYXRhIGFzIHBhcmFtZXRlclxuICBmaWx0ZXJWYWx1ZVJlbmRlcjogZnVuYywgICAgICAgIC8vIGN1c3RvbSByZW5kZXJlciBmb3IgdGhlIGZpbHRlciB2YWx1ZSwgZGF0YSBhcyBwYXJhbWV0ZXJcbiAgY2VsbDogZnVuYywgICAgICAgICAgICAgICAgICAgICAvLyBvdmVycmlkZSBjZWxsIHJlbmRlcmVyLCByb3dJbmRleCBhcyBwYXJhbWV0ZXJcbiAgY2VsbEVkaXQ6IGZ1bmMsICAgICAgICAgICAgICAgICAvLyBvdmVycmlkZSBjZWxsRWRpdCByZW5kZXJlciwgcm93SW5kZXggYXMgcGFyYW1ldGVyXG4gIGNlbGxDcmVhdGU6IGZ1bmMsICAgICAgICAgICAgICAgLy8gb3ZlcnJpZGUgY2VsbENyZWF0ZSByZW5kZXJlciwgcm93SW5kZXggYXMgcGFyYW1ldGVyXG4gIGNlbGxGaWx0ZXI6IGZ1bmMsICAgICAgICAgICAgICAgLy8gb3ZlcnJpZGUgY2VsbEZpbHRlciByZW5kZXJlciwgcm93SW5kZXggYXMgcGFyYW1ldGVyXG4gIHJlbmRlckNvbXBvbmVudFByb3BzOiBvYmplY3QsICAgLy8gYWRkaXRpb25hbCBwcm9wcyB0byB0aGUgcmVuZGVyIGNvbXBvbmVudFxuICBlZGl0Q29tcG9uZW50UHJvcHM6IG9iamVjdCwgICAgIC8vIGFkZGl0aW9uYWwgcHJvcHMgdG8gdGhlIGVkaXQgY29tcG9uZW50XG4gIGNyZWF0ZUNvbXBvbmVudFByb3BzOiBvYmplY3QsICAgLy8gYWRkaXRpb25hbCBwcm9wcyB0byB0aGUgY3JlYXRlIGNvbXBvbmVudFxuICBmaWx0ZXJDb21wb25lbnRQcm9wczogb2JqZWN0LCAgIC8vIGFkZGl0aW9uYWwgcHJvcHMgdG8gdGhlIGZpbHRlciBjb21wb25lbnRcbiAgd2lkdGg6IG51bWJlcixcbiAgbWluV2lkdGg6IG51bWJlcixcbiAgbWF4V2lkdGg6IG51bWJlcixcbiAgYWxpZ246IHN0cmluZywgICAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNhbCBjZWxsIGFsaWdubWVudCwgZGVmYXVsdHMgdG8gJ2xlZnQnXG4gIGZpeGVkOiBib29sLCAgICAgICAgICAgICAgICAgICAgLy8gaXMgY29sdW1uIGZpeGVkXG4gIGFsbG93Q2VsbHNSZWN5Y2xpbmc6IGJvb2wsICAgICAgLy8gYWxsb3cgY2VsbHMgdG8gYmUgcmVjeWNsZWQgZm9yIGJldHRlciBob3Jpem9udGFsIHNjcm9sbGluZyBwZXJmXG4gIGRpc2FibGVSZXNpemluZzogYm9vbCwgICAgICAgICAgLy8gZGlzYWJsZSBjb2x1bW4gcmVzaXppbmdcbiAgZGlzYWJsZUVkaXRpbmc6IGJvb2wsICAgICAgICAgICAvLyBkaXNhYmxlIGlucHV0IGNvbXBvbmVudCAobWFrZSByZWFkLW9ubHkpIHdoZW4gZWRpdGluZy9jcmVhdGluZ1xuICBkaXNhYmxlU29ydGluZzogYm9vbCwgICAgICAgICAgIC8vIGRpc2FibGUgZmlsdGVyaW5nIG9uIHRoaXMgY29sdW1uXG4gIGRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoOiBzaGFwZSh7IC8vIGRpc2FibGUgZWRpdGluZy9jcmVhdGluZyBpbnB1dCB3aGVuIG90aGVyIGNvbHVtbnMgdmFsdWUgbWF0Y2hcbiAgICBtYXRjaFZhbHVlS2V5UGF0aDogYXJyYXksXG4gICAgbWF0Y2hWYWx1ZTogYW55LFxuICB9KSxcbiAgb25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWU6IHNoYXBlKHsgLy8gQ2hhbmdlIG90aGVyIGNvbHVtbiB2YWx1ZSB3aGVuIGRhdGEgbWF0Y2hlc1xuICAgIG1hdGNoVmFsdWU6IGFueSxcbiAgICBuZXdWYWx1ZUtleVBhdGg6IGFycmF5LFxuICAgIG5ld1ZhbHVlOiBhbnksXG4gIH0pLFxuICBmbGV4R3JvdzogbnVtYmVyLFxuICB2YWx1ZUVtcHR5Q2hlY2tlcjogZnVuYywgICAgICAgIC8vIG92ZXJyaWRlIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXMgZW1wdHlcbiAgc29ydFZhbHVlR2V0dGVyOiBmdW5jLCAgICAgICAgICAvLyBvdmVycmlkZSBzb3J0IHZhbHVlIGdldHRlciwgZGVmYXVsdHMgdG8gZ2V0SW4odmFsdWVLZXlQYXRoKVxuICBzb3J0Q29tcGFyYXRvcjogZnVuYywgICAgICAgICAgIC8vIG92ZXJyaWRlIHNvcnQgY29tcGFyYXRvciBmdW5jdGlvbiwgZGVmYXVsdCBzb3J0cyBieSB2YWx1ZVR5cGVcbiAgZmlsdGVyTWF0Y2hlcjogZnVuYywgICAgICAgICAgICAvLyBvdmVycmlkZSBmaWx0ZXIgbWF0Y2hlciBmdW5jdGlvbiwgdGhhdCBkZWZpbmVkIHdoZW4gZmlsdGVyIG1hdGNoZXMgZGF0YVxuICBkZWZhdWx0VmFsdWU6IGFueSwgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBjb2x1bW4gd2hlbiBjcmVhdGluZyBuZXcgaXRlbVxuICBpc1JlcXVpcmVkOiBib29sLCAgICAgICAgICAgICAgIC8vIGlzIGNvbHVtbiB2YWx1ZSByZXF1aXJlZFxuICBpc0hpZGRlbjogYm9vbCwgICAgICAgICAgICAgICAgIC8vIGlzIGNvbHVtbiBoaWRkZW4gYnkgZGVmYXVsdFxuICBvbkVkaXRWYWx1ZUNoYW5nZTogZnVuYywgICAgICAgIC8vIGNhbGxiYWNrIHdpdGggKHZhbHVlLCB2YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpXG4gIG9uQ3JlYXRlVmFsdWVDaGFuZ2U6IGZ1bmMsICAgICAgLy8gY2FsbGJhYyB3aXRoICh2YWx1ZSwgdmFsdWVLZXlQYXRoLCByb3dJbmRleClcbiAgb25DcmVhdGVCbHVyOiBmdW5jLCAgICAgICAgICAgICAvLyBjYWxsYmFjayB3aXRoICh2YWx1ZSwgcm93SW5kZXgpXG4gIG9uRWRpdEJsdXI6IGZ1bmMsICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgd2l0aCAodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpXG4gIHNlbGVjdENvbXBvbmVudE9wdGlvbnM6IGFycmF5T2Yoc2hhcGUoe1xuICAgIHZhbHVlOiBvbmVPZlR5cGUoW251bWJlciwgc3RyaW5nLCBib29sXSkuaXNSZXF1aXJlZCxcbiAgICBsYWJlbDogb25lT2ZUeXBlKFtudW1iZXIsIHN0cmluZ10pLmlzUmVxdWlyZWQsXG4gIH0pKSxcbiAgc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zOiBzaGFwZSh7IC8vIGN1c3RvbWl6ZSBzZWxlY3QgY29tcG9uZW50cyBwbGFjZWhvbGRlciBhbmQgbm9SZXN1bHRzIHRleHRzLlxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcsXG4gICAgbm9SZXN1bHRzVGV4dDogc3RyaW5nLFxuICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgcHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZSxcbiAgLy8gQXBwIHByb3BzXG4gIGludGw6IG9iamVjdC5pc1JlcXVpcmVkLFxuICAvLyBBY3Rpb24gcHJvcHNcbiAgYWRkTmV3SXRlbTogZnVuYy5pc1JlcXVpcmVkLFxuICByZW1vdmVOZXdJdGVtOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGNyZWF0ZTogZnVuYy5pc1JlcXVpcmVkLFxuICBlZGl0OiBmdW5jLmlzUmVxdWlyZWQsXG4gIHJlbW92ZTogZnVuYy5pc1JlcXVpcmVkLFxuICBzYXZlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGNhbmNlbDogZnVuYy5pc1JlcXVpcmVkLFxuICBzb3J0Q2hhbmdlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIHJlc2l6ZUNvbHVtbjogZnVuYy5pc1JlcXVpcmVkLFxuICBpbnZhbGlkYXRlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGNlbGxTZWxlY3Rpb25DaGFuZ2U6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgaXRlbVNlbGVjdGlvbkNoYW5nZTogZnVuYy5pc1JlcXVpcmVkLFxuICB0b2dnbGVGaWx0ZXJpbmc6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgZWRpdENlbGxWYWx1ZUNoYW5nZTogZnVuYy5pc1JlcXVpcmVkLFxuICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2U6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGVkaXRDZWxsVmFsdWVWYWxpZGF0ZTogZnVuYy5pc1JlcXVpcmVkLFxuICBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZTogZnVuYy5pc1JlcXVpcmVkLFxuICB2YWxpZGF0ZUVkaXRlZFJvd3M6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgdmFsaWRhdGVDcmVhdGVkUm93czogZnVuYy5pc1JlcXVpcmVkLFxuICAvLyBTdGF0ZSBwcm9wc1xuICBpc0J1c3k6IGJvb2wuaXNSZXF1aXJlZCxcbiAgaXNFZGl0aW5nOiBib29sLmlzUmVxdWlyZWQsXG4gIGlzQ3JlYXRpbmc6IGJvb2wuaXNSZXF1aXJlZCxcbiAgaXNGaWx0ZXJpbmc6IGJvb2wuaXNSZXF1aXJlZCxcbiAgc29ydENvbHVtbjogb25lT2ZUeXBlKFtcbiAgICBzdHJpbmcsXG4gICAgbnVtYmVyLFxuICBdKSxcbiAgc29ydE9yZGVyOiBzdHJpbmcsXG4gIHZpc2libGVDb2x1bW5zOiBsaXN0LmlzUmVxdWlyZWQsXG4gIGNvbHVtbldpZHRoczogbWFwLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkQ2VsbDogbWFwLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkSXRlbXM6IGxpc3QuaXNSZXF1aXJlZCxcbiAgZGF0YTogbGlzdC5pc1JlcXVpcmVkLFxuICBlZGl0RGF0YTogbWFwLmlzUmVxdWlyZWQsXG4gIGNyZWF0ZURhdGE6IGxpc3QuaXNSZXF1aXJlZCxcbiAgZmlsdGVyRGF0YTogbWFwLmlzUmVxdWlyZWQsXG4gIGNlbGxNZXNzYWdlczogbWFwLmlzUmVxdWlyZWQsXG4gIGNyZWF0ZUNlbGxNZXNzYWdlczogbWFwLmlzUmVxdWlyZWQsXG4gIGxhbmd1YWdlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgcmVnaW9uOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgYWxsRGF0YVNpemU6IG51bWJlci5pc1JlcXVpcmVkLFxuICAvLyBSZXF1aXJlZCBjb21wb25lbnQgcHJvcGVydGllc1xuICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgY29sdW1uczogYXJyYXlPZihjb2x1bW5TaGFwZS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICAvLyBPcHRpb25hbCBjb21wb25lbnQgcHJvcGVydGllc1xuICByb3dzQ291bnQ6IG51bWJlcixcbiAgZ3JpZEhlYWRlcjogbm9kZSxcbiAgYWN0aW9uQmFyOiBub2RlLFxuICBhY3Rpb25CYXJMZWZ0OiBub2RlLFxuICBjZWxsU2VsZWN0OiBib29sLFxuICBkaXNhYmxlRHJvcGRvd246IGJvb2wsICAgICAgICAgICAgICAvLyBEb24ndCB1c2UgZHJvcGRvd24gbWVudSBpbiB0aGUgYWN0aW9uIGJhclxuICBkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHM6IGJvb2wsICAgICAvLyBEb24ndCBkaXNwbGF5IHRoZSBmaWx0ZXJpbmcgY29udHJvbHMgKG9ubHkgdmFsaWQgaWYgZGlzYWJsZURyb3Bkb3duIGlzIHRydWUpXG4gIGRyb3Bkb3duTWVudUl0ZW1zOiBhcnJheU9mKHNoYXBlKHtcbiAgICBpZDogc3RyaW5nLFxuICAgIHRpdGxlOiBub2RlLFxuICAgIGljb246IG5vZGUsXG4gICAgb25DbGljazogZnVuYyxcbiAgICBkaXNhYmxlZDogb25lT2ZUeXBlKFtib29sLCBmdW5jXSksXG4gIH0pKSxcbiAgaW5saW5lRWRpdDogYm9vbCxcbiAgaW5saW5lQWRkOiBib29sLFxuICBmaWx0ZXJpbmc6IGJvb2wsXG4gIHJlbW92aW5nOiBib29sLFxuICBjb2x1bW5TZXR0aW5nczogYm9vbCxcbiAgcm93U2VsZWN0OiBib29sLFxuICByb3dTZWxlY3RDaGVja2JveENvbHVtbjogYm9vbCxcbiAgbXVsdGlTZWxlY3Q6IGJvb2wsXG4gIHNlbGVjdENvbXBvbmVudE9wdGlvbnM6IG1hcE9mKGFycmF5T2Yoc2hhcGUoeyAgLy8gT3B0aW9ucyBkYXRhIGZvciB0aGUgcmVhY3Qtc2VsZWN0IGNvbXBvbmVudHNcbiAgICB2YWx1ZTogb25lT2ZUeXBlKFtudW1iZXIsIHN0cmluZywgYm9vbF0pLmlzUmVxdWlyZWQsXG4gICAgbGFiZWw6IG9uZU9mVHlwZShbbnVtYmVyLCBzdHJpbmddKS5pc1JlcXVpcmVkLFxuICB9KSkpLFxuICBzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnM6IHNoYXBlKHsgIC8vIE9wdGlvbnMgZm9yIHJlYWN0LXNlbGVjdCB0ZXh0IHRyYW5zbGF0aW9uc1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBub1Jlc3VsdHNUZXh0OiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgfSksXG4gIGRpc2FibGVBY3Rpb25zOiBib29sLCAgICAgICAgICAgICAgIC8vIERpc2FibGUgYWN0aW9ucyBpbiB0aGUgYWN0aW9uIGJhclxuICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IHNoYXBlKHtcbiAgICBtZXNzYWdlSWQ6IHN0cmluZyxcbiAgICBtZXNzYWdlVmFsdWVzOiBzaGFwZSh7fSksXG4gIH0pLFxuICBkaXNhYmxlQWN0aW9uQmFyOiBib29sLFxuICBkaXNhYmxlQWN0aW9uU2F2ZTogYm9vbCxcbiAgZW5hYmxlQXJyb3dOYXZpZ2F0aW9uOiBib29sLFxuICBvblNhdmU6IGZ1bmMsXG4gIG9uUmVtb3ZlOiBmdW5jLFxuICBvbkNhbmNlbDogZnVuYyxcbiAgb25BZGRDbGljazogZnVuYyxcbiAgb25FZGl0Q2xpY2s6IGZ1bmMsXG4gIG9uTGFzdENlbGxUYWJQcmVzczogZnVuYyxcbiAgdGFiSW5kZXg6IG51bWJlciwgICAgICAgICAgICAgICAgICAgLy8gdGFiSW5kZXggdmFsdWUgZm9yIGlucHV0cyBpbiBjZWxsc1xuICBleHRyYUNvbHVtbjogc2hhcGUoeyAgICAgICAgICAgICAgICAvLyBFeHRyYSBmaXhlZCBjb2x1bW4gdGhhdCBjYW4ndCBiZSByZS1vcmRlcmVkIG9yIGhpZGRlblxuICAgIHdpZHRoOiBzdHJpbmcsXG4gICAgdmFsdWVSZW5kZXI6IGZ1bmMsXG4gICAgY2VsbEVkaXQ6IGZ1bmMsXG4gICAgY2VsbENyZWF0ZTogZnVuYyxcbiAgICBjZWxsRmlsdGVyOiBmdW5jLFxuICAgIGlzUmVzaXphYmxlOiBib29sLFxuICB9KSxcbiAgY29udGV4dE1lbnVJdGVtczogYXJyYXlPZihzaGFwZSh7ICAgLy8gQ29udGV4dCBtZW51IGl0ZW1zIHRvIGRpc3BsYXkgd2hlbiByb3cgaXMgcmlnaHQtY2xpY2tlZFxuICAgIHZhbHVlOiBub2RlLFxuICAgIG9uQ2xpY2s6IGZ1bmMsXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBoZWFkZXI6IGJvb2wsXG4gICAgZGlzYWJsZWQ6IG9uZU9mVHlwZShbYm9vbCwgZnVuY10pLFxuICAgIGRpdmlkZXI6IGJvb2wsXG4gIH0pKSxcbiAgLy8gRml4ZWQgZGF0YSB0YWJsZSBidWlsdC1pbiBmZWF0dXJlc1xuICBoZWFkZXJIZWlnaHQ6IG51bWJlcixcbiAgZmlsdGVyUm93SGVpZ2h0OiBudW1iZXIsXG4gIHJvd0hlaWdodDogbnVtYmVyLFxuICBjb250YWluZXJTdHlsZTogb2JqZWN0LFxuICBzY3JvbGxUb0NvbHVtbjogbnVtYmVyLFxuICBzY3JvbGxUb3A6IG51bWJlcixcbiAgc2Nyb2xsVG9Sb3c6IG51bWJlcixcbiAgb25Sb3dDbGljazogZnVuYyxcbiAgb25Sb3dEb3VibGVDbGljazogZnVuYyxcbiAgb25Sb3dNb3VzZURvd246IGZ1bmMsXG4gIG9uUm93TW91c2VFbnRlcjogZnVuYyxcbiAgb25Sb3dNb3VzZUxlYXZlOiBmdW5jLFxuICBvblNjcm9sbFN0YXJ0OiBmdW5jLFxuICBvblNjcm9sbEVuZDogZnVuYyxcbiAgcm93Q2xhc3NOYW1lR2V0dGVyOiBmdW5jLFxuICByb3dIZWlnaHRHZXR0ZXI6IGZ1bmMsXG4gIG9uQ29udGVudEhlaWdodENoYW5nZTogZnVuYyxcbiAgY2xhc3NOYW1lOiBzdHJpbmcsXG4gIGZvY3VzVHlwZTogbWFwLmlzUmVxdWlyZWQsXG4gIHBhZ2luYXRpb246IHNoYXBlKHtcbiAgICBwYWdlU2l6ZTogbnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgdG90YWxTaXplOiBudW1iZXIuaXNSZXF1aXJlZCxcbiAgICBnZXREYXRhOiBmdW5jLmlzUmVxdWlyZWQsXG4gIH0pLFxufTtcblxuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzLCByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBjZWxsU2VsZWN0OiBmYWxzZSxcbiAgY29sdW1uU2V0dGluZ3M6IGZhbHNlLFxuICBjaGlsZHJlbjogdW5kZWZpbmVkLFxuICBjb250YWluZXJTdHlsZToge30sXG4gIGRpc2FibGVBY3Rpb25TYXZlOiBmYWxzZSxcbiAgZW5hYmxlQXJyb3dOYXZpZ2F0aW9uOiBmYWxzZSxcbiAgaGVhZGVySGVpZ2h0OiA0MCxcbiAgZmlsdGVyUm93SGVpZ2h0OiA0MCxcbiAgcm93SGVpZ2h0OiA0MCxcbiAgb25TYXZlOiAoKSA9PiB7fSxcbiAgb25SZW1vdmU6ICgpID0+IHt9LFxuICBvbkNhbmNlbDogKCkgPT4ge30sXG4gIHRhYkluZGV4OiAxLFxuICBkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHM6IGZhbHNlLFxuICBjbGFzc05hbWU6ICcnLFxufTtcbiJdfQ==