import items from "../../infrastructure/data";
import { LOAD_ITEMS_FAILURE, LOAD_ITEMS_SUCCESS, UPDATED_ITEM } from "../types/Items";

export const dispatchItems = () => {
    return (dispatch) => {
      const resp = items.getItems()
      dispatch(loadItemsSuccess(resp.data));
    };
  };
export const loadItemsSuccess = items => ({
    type: LOAD_ITEMS_SUCCESS,
    payload: items,
});

export const loadItemsFailure = error => ({
    type: LOAD_ITEMS_FAILURE,
    payload: error,
});

export const updatedItem = items => ({
    type: UPDATED_ITEM,
    payload: items,
});
