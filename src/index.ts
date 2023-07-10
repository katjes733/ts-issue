import next from "next";
import dnscache from "dnscache";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

dnscache({
  enable: true,
  ttl: 60,
  cachesize: 64,
});

const openDropdown = (): Promise<void> =>
  userEvent.click(screen.getByRole("textbox"));

async function start(): Promise<void> {
  const app = next({
    dev: true,
    quiet: true,
  });
  await app.prepare();
  const handle = app.getRequestHandler();
}

start().catch((error: Error) => {
  process.exit(1);
});
