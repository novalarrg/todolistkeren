import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/drafts"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

export default function NavBar() {
  return <Router></Router>;
}
