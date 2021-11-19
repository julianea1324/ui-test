import items from "../../infrastructure/data";
import { store } from "../store";
import {
  LOAD_ITEMS_FAILURE,
  LOAD_ITEMS_SUCCESS,
  UPDATED_ITEM,
  REFRESH_ITEM
} from "../types/Items";

export const dispatchItems = () => {
  return (dispatch) => {
    const { items: itemsPersist } = store.getState();
    const { data } = items.getItems();
    const response = data.map((e) => ({ ...e, vote: false }));
    dispatch(
      loadItemsSuccess(
        itemsPersist.items.length === 0 ? response : itemsPersist.items
      )
    );
  };
};
export const dispatchRefreshItem = (item) => {
  return (dispatch) => {
    const { data } = items.getItems();
    const response = data.find((e) => e.name === item);
    dispatch(refreshItem(response));
  };
};

export const loadItemsSuccess = (items) => ({
  type: LOAD_ITEMS_SUCCESS,
  payload: items,
});
export const refreshItem = (item) => ({
  type: REFRESH_ITEM,
  payload: item,
});

export const loadItemsFailure = (error) => ({
  type: LOAD_ITEMS_FAILURE,
  payload: error,
});

export const updatedItem = (items) => ({
  type: UPDATED_ITEM,
  payload: items,
});
