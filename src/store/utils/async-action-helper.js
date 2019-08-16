import { Observable, of, pipe } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

// interface Action<TType extends string = string> {
//   type: TType;
// }
//
// interface PayloadAction<PType, TType extends string = string> extends Action<TType> {
//   payload: PType;
// }
//
// interface PayloadMetaAction<PType, TType extends string = string, MType extends string = string>
// extends PayloadAction<PType, TType> {
//   meta: MType;
// }

// export enum AsyncActionStatus {
//   Succeeded,
//     Failed,
//     Canceled,
//     Pending,
//     Initial,
// }
//
// export interface AsyncActionState {
//   loading: boolean;
//   loaded: boolean;
//   status: AsyncActionStatus;
//   data?: any;
// }

export const asyncActionInitialState = {
  loading: false,
  loaded: false,
  status: "Initial",
  data: null,
};

export function asyncActionHandlerFactory(
  type,
  concurrencyType,
) {
  const { Actions, ActionTypes } = createActions(type);

  // e.g. mergeMap, switchMap, concatMap;
  const concurrencyOperator = getConcurrencyOperator(concurrencyType);

  const effect = (action$, requestFn) =>
    action$.pipe(
      filter((action) => action.type === ActionTypes.ACTION),
      concurrencyOperator((action) =>
        requestFn(action.payload).pipe(
          map((response) => Actions.success(response, action.meta)),
          catchError(
            pipe(
              (error) => Actions.failure(error, action.meta),
              of,
            ),
          ),
          takeUntil(action$.pipe(filter((cancelAction) => cancelAction.type === ActionTypes.ACTION_CANCELED))),
        ),
      ),
    );

  const reducer = (state = asyncActionInitialState,  action,  ) => {
    switch (action.type) {
      case ActionTypes.ACTION:
        return {
          ...state,
          loading: true,
          loaded: false,
          status: "Pending",
          data: null,
        };

      case ActionTypes.ACTION_SUCCEEDED:
        return {
          ...state,
          loading: false,
          loaded: true,
          status: "Succeeded",
          data: action.payload,
        };

      case ActionTypes.ACTION_FAILED:
        return {
          ...state,
          loading: false,
          loaded: false,
          status: "Failed",
          data: action.payload,
        };

      case ActionTypes.ACTION_CANCELED:
        return {
          ...state,
          loading: false,
          loaded: false,
          status: "Canceled",
        };

      default:
        return state;
    }
  };

  return { ActionTypes, Actions, effect, reducer };
}

const ConcurrencyType = 'merge' | 'switch' | 'concat';

// const ConcurrencyOperator = typeof mergeMap | typeof switchMap | typeof concatMap;

function getConcurrencyOperator(type = ConcurrencyType) {
  switch (type) {
    case 'concat': {
      return concatMap;
    }
    case 'merge': {
      return mergeMap;
    }
    case 'switch': {
      return switchMap;
    }
    default: {
      return mergeMap;
    }
  }
}

function createActions(type) {
  const ActionTypes = {
    ACTION: `${type}`,
    ACTION_SUCCEEDED: `${type}_SUCCEEDED`,
    ACTION_FAILED: `${type}_FAILED`,
    ACTION_CANCELED: `${type}_CANCELED`,
  };

  const Actions = {
    action: (payload, meta) => ({ type: ActionTypes.ACTION, payload, meta }),
      success: (payload, meta) => ({ type: ActionTypes.ACTION_SUCCEEDED, payload, meta }),
      failure: (payload, meta) => ({ type: ActionTypes.ACTION_FAILED, payload, meta }),
      cancel: (payload, meta) => ({ type: ActionTypes.ACTION_CANCELED, payload, meta }),
        };

        return { ActionTypes, Actions };
        }
