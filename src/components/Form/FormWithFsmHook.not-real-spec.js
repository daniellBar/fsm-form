// i searched online on creating a client side mock server and found mswjs
// unfortunately the test couldn't run due to: ReferenceError: TextEncoder is not defined
// link: https://github.com/mswjs/msw/issues/1796  i didn't have the time to investigate further

// this was my intension
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { FormWithFsmHook } from "./FormWithFsmHook";

const server = setupServer(
  rest.post("/user", (req, res, ctx) => {
    const data = req.body; // i guess it would have been something like this, i couldn't run it and see how it works
    return res(ctx.status(200), ctx.json({ data }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the form", async () => {
  render(<FormWithFsmHook />);
});
