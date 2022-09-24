import { act, render, screen, waitFor } from "@testing-library/react";
import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { CurrentUser } from "./CurrentUser";

test("Current User", async () => {
  const env = createMockEnvironment();
  const { debug } = render(
    <RelayEnvironmentProvider environment={env}>
      <Suspense fallback="loading test of current user..">
        <CurrentUser />
      </Suspense>
    </RelayEnvironmentProvider>
  );

  let data: any;

  act(() => {
    env.mock.resolveMostRecentOperation((operation) => {
      data = MockPayloadGenerator.generate(operation);
      return data;
    });
  });
  //debug(); // eslint-disable-line testing-library/no-debugging-utils

  await waitFor(async () => {
    let user = data.data.currentPerson;
    expect(await screen.findByText(new RegExp(user.fullName))).not.toBe(null);
   // debug(); // eslint-disable-line testing-library/no-debugging-utils
  });

  await waitFor(async () => {
    let user = data.data.currentPerson;
    expect(await screen.findByText(new RegExp(user.email))).not.toBe(null);
  });
});
