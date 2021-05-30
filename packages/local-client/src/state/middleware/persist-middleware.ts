import { RootState } from './../reducers/index';
import { saveCells } from './../action-creators/index';
import { ActionType } from './../action-types/index';
import { Action } from './../actions/index';
import { Dispatch } from 'redux';


export const persisteMiddlware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      console.log("In Middleware");

      next(action);
      if ([
        ActionType.UPDATE_CELL,
        ActionType.MOVE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL
      ].includes(action.type)) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState)
        }, 250);
      }
    }
  }
}