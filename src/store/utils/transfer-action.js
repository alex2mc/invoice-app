import { ofType } from 'redux-observable';
// import { PayloadMetaAction } from 'typesafe-actions';

// import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// import { RootActions } from '../index';

export function transferActionEpicFactory(
  inputActionType,
  outputActionCreator,
  initialActionType,
) {
  return (action$) =>
    action$.pipe(
      ofType(inputActionType),
      filter((action) => (initialActionType ? initialActionType === action.meta : true)),
      map(({ payload, meta }) => outputActionCreator(payload, meta)),
    );
}
