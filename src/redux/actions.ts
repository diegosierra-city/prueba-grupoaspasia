// actions.ts

export enum ActionTypes {
 SET_DATA = 'SET_DATA',
}

export interface SetDataAction {
 type: ActionTypes.SET_DATA;
 payload: string; 
}

export type AppActions = 
 | SetDataAction;