import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS = '[INGRESO EGRESO] Set items';
export const UNSET_ITEMS = '[INGRESO EGRESO] Unset items';

export class SetItemsAction implements Action {

  readonly type = SET_ITEMS;
  constructor(public items: IngresoEgreso[]) {}

}

export class UnsetItemsAction implements Action {

  readonly type = UNSET_ITEMS;

}

export type acciones = SetItemsAction | UnsetItemsAction;