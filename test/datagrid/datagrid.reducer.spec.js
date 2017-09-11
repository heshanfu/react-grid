/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Immutable, { Map, List } from 'immutable';
import datagridReducer from '../../src/datagrid/datagrid.reducer';
import { TYPES } from '../../src/datagrid/datagrid.actions';
import { INITIAL_STATE } from '../../src/datagrid/datagrid.constants';

describe('Datagrid reducers', () => {
  const id = 'TestGrid';
  const data = Immutable.fromJS([
    { id: 1, name: 'Mary', age: 11 },
    { id: 2, name: 'John', age: 99 },
  ]);

  it('invalidates data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.be.an('undefined');
    expect(newState.getIn([id, 'allData'])).to.be.an('undefined');
  });

  it('sets data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id,
      data,
      config: {},
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
    expect(newState.getIn([id, 'allData'])).to.eql(data);
  });

  it('sets busy state', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('sets ready state', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_READY,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets sorted data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
      id,
      data,
      allData: data,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
    expect(newState.getIn([id, 'allData'])).to.eql(data);
  });

  it('sets sorting data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id,
      sortColumn: 'name',
      sortOrder: 'desc',
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'sortingData', 'sortColumn'])).to.eql('name');
    expect(newState.getIn([id, 'config', 'sortingData', 'sortOrder'])).to.eql('desc');
  });

  it('sets column widths', () => {
    const columnWidths = Map({ name: 1234 });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id,
      columnWidths,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'columnWidths'])).to.eql(columnWidths);
  });

  it('sets grid in editing mode', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isEditing'])).to.be.true;
  });

  it('sets grid in create mode and creates first item with default values', () => {
    const columnDefaultValues = {      
      age: 50,
    };
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id,
      columnDefaultValues,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isCreating'])).to.be.true;
    expect(newState.getIn([id, 'createData'])).to.eql(Immutable.fromJS([columnDefaultValues]));
  });

  it('creates new item with default values', () => {
    const columnDefaultValues = {      
      age: 50,
    };
    const action = {
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id,
      columnDefaultValues,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createData'])).to.eql(Immutable.fromJS([columnDefaultValues]));
  });

  it('cancels edit/create operations', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isEditing'])).to.be.false;
    expect(newState.getIn([id, 'session', 'isCreating'])).to.be.false;
  });

  it('sets grid busy mode on save', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('sets new items on save success');
  it('sets new items on partial save success');

  it('sets grid ready mode on save fail', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets grid busy mode on remove', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('removes items on remove success');

  it('sets grid ready mode on remove fail', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets edit cell value', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id,
      dataId: 23,
      keyPath: ['name'],
      value: 'John',
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'editData', 23, 'name'])).to.eql('John');
  });

  it('sets create cell value', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id,
      rowIndex: 2,
      keyPath: ['age'],
      value: 65,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createData', 2, 'age'])).to.eql(65);
  });

  it('sets cell message', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id,
      messageType: 'error',
      dataId: 2,
      keyPath: ['age'],
      messageId: 'ValidationError',
      messageValues: null,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'cellMessages', 'error', 2, 'age'])).to.eql({
      id: 'ValidationError',
      values: null,
    });
  });

  it('hides cell message', () => {
    const state = INITIAL_STATE
      .setIn([id, 'cellMessages', 'error', 2, 'age'], {
        id: 'ValidationError',
        values: null,
      })
      .setIn([id, 'cellMessages', 'warning', 2, 'age'], {
        id: 'TooOld',
        values: null,
      });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id,
      messageType: 'error',
      dataId: 2,
      keyPath: ['age'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'cellMessages', 'error', 2, 'age'])).to.be.undefined;
  });

  it('sets create cell message', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id,
      messageType: 'error',
      rowIndex: 2,
      keyPath: ['age'],
      messageId: 'ValidationError',
      messageValues: null,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createCellMessages', 'error', 2, 'age'])).to.eql({
      id: 'ValidationError',
      values: null,
    });
  });

  it('hides create cell message', () => {
    const state = INITIAL_STATE
      .setIn([id, 'createCellMessages', 'error', 2, 'age'], {
        id: 'ValidationError',
        values: null,
      })
      .setIn([id, 'createCellMessages', 'warning', 2, 'age'], {
        id: 'TooOld',
        values: null,
      });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id,
      messageType: 'error',
      rowIndex: 2,
      keyPath: ['age'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'createCellMessages', 'error', 2, 'age'])).to.be.undefined;
  });

  it('sets selected items', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id,
      rowIndex: 1,
      shiftPressed: false,
      ctrlPressed: false,
      idKeyPath: ['id'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.eql(List([2]));
  });

  it('sets all items selected', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id,
      idKeyPath: ['id'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.eql(List([1, 2]));
  });

  it('sets selected items', () => {
    const state = INITIAL_STATE.setIn([id, 'selectedItems'], List([1, 2]));
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.be.undefined;
  });

  it('sets filtering', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id,
      isFiltering: true,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'filteringData', 'isFiltering'])).to.be.true;
  });

  it('sets filtering', () => {
    const filterData = Immutable.fromJS([{ age: 65 }]);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id,
      filterData,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'filteringData', 'filterData'])).to.eq(filterData);
  });

  it('set filtered data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
      id,
      data,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
  });

  it('set existing cell value', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id,
      dataId: 1,
      keyPath: ['name'],
      value: 'Edith',
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'data', 1, 'name'])).to.eql('Edith');
    expect(newState.getIn([id, 'allData', 1, 'name'])).to.eql('Edith');
  });
});
