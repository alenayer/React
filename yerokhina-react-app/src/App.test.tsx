import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

describe("App routing", () => {
  it("renders About page on /about", async () => {

    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("This is the About page")).toBeInTheDocument(); // проверка, что мы на About пейдже
  });

  it("renders Home page on /", async () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument(); // проверка, что мы на Хоум пейдже
  });
});