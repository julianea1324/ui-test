import { LOAD_ITEMS_SUCCESS, UPDATED_ITEM } from "../../types/Items";

  
  const initialState = {
    items: [],
    error: null,
  };
  
  const Itemsreducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ITEMS_SUCCESS:
        return { items: action.payload, error: null };     
      case UPDATED_ITEM:
        const indexU = state.items.findIndex((e) => e.id === action.payload.id);
        state.items[indexU] = { ...action.payload };
        return {
          ...state,
          items: state.items,
        };
      default:
        return state;
    }
  };
  
  export default Itemsreducer;
  