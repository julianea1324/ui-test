import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { dispatchItems, updatedItem } from "../../../application/actions/Items";
import { CardDetails } from ".";
import { DateText } from "../../../application/Hooks/DateText";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
describe("vote component", () => {
    
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it("Test load items", () => {
    store.dispatch(dispatchItems());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "[ITEMS] load success",
      payload: expect.any(Array),
    });
  });

  it("Test edit vote items", () => {
    store.dispatch(
      updatedItem({
        votes: { positive: 2, negative: 3 },
        name: "Kanye West",
        vote: true,
      })
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "[ITEMS] updated item",
      payload: {
        votes: expect.any(Object),
        name: expect.any(String),
        vote: expect.any(Boolean),
      },
    });
  });

  it("Test custom hook date text", () => {
    const { result } = renderHook(() => DateText("2020-03-10T23:08:57.892Z"));
    expect(result.all).toEqual(expect.any(Array));
  });

  it("Test disabled button vote now", () => {
    render(
      <Provider store={store}>
        <CardDetails />
      </Provider>
    );
    const vote_now = screen.getByText(/vote now/i);
    expect(vote_now).toBeDisabled();
  });

  it("Test not disabled button vote now", () => {
    const rendered = render(
      <Provider store={store}>
        <CardDetails />
      </Provider>
    );
    const vote_now = screen.getByText(/vote now/i);
    const up = rendered.container.querySelector(".card-item__button-up");
    userEvent.click(up);
    expect(vote_now).not.toBeDisabled();
  });
  it("Test vote success", () => {
    const rendered = render(
      <Provider store={store}>
        <CardDetails />
      </Provider>
    );
    const vote_now = screen.getByText(/vote now/i);
    const up = rendered.container.querySelector(".card-item__button-up");
    userEvent.click(up);
    userEvent.click(vote_now);
    const vote_success =  rendered.container.querySelector('.card-item__content-button--messaje')
    const vote_again = screen.getByText(/vote again/i);
    expect(vote_success).toContainHTML('Thank you for your vote!');
    expect(vote_again).not.toBeDisabled();
  });
});
