export enum ActionTypes {
  AddSquare = "AddSquare",
  RemoveSquare = "RemoveSquare"
}

export type Action =
  | {
      type: ActionTypes.AddSquare;
      payload: { value: string };
    }
  | {
      type: ActionTypes.RemoveSquare;
      payload: { id: string };
    };

export function addSquare(value: string): Action {
  return {
    type: ActionTypes.AddSquare,
    payload: { value }
  };
}

export function removeSquare(id: string): Action {
  return {
    type: ActionTypes.RemoveSquare,
    payload: { id }
  };
}
