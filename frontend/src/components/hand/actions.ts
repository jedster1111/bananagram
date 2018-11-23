export enum ActionTypes {
  moveSelector = "MOVE_SELECTOR"
}

export type HandActions = MoveSelectorAction;

export interface MoveSelectorAction {
  type: ActionTypes.moveSelector;
  payload: { steps: number };
}

export function createMoveSelectorAction(steps: number): MoveSelectorAction {
  return {
    type: ActionTypes.moveSelector,
    payload: { steps }
  };
}
