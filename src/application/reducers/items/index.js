import {
  LOAD_ITEMS_SUCCESS,
  UPDATED_ITEM,
  REFRESH_ITEM,
} from "../../types/Items";

const initialState = {
  items: [],
};

const Itemsreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS_SUCCESS:
      return { ...state, items: action.payload };
    case REFRESH_ITEM:
      const indexRefresh = state.items.findIndex(
        (e) => e.name === action.payload.name
      );
      state.items[indexRefresh] = {
        ...action.payload,
      };
      return {
        ...state,
        items: state.items,
      };
    case UPDATED_ITEM:
      const indexU = state.items.findIndex(
        (e) => e.name === action.payload.name
      );
      state.items[indexU] = { ...state.items[indexU], ...action.payload };
      return {
        ...state,
        items: state.items,
      };
    default:
      return state;
  }
};

export default Itemsreducer;
