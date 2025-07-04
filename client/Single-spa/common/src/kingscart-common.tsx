import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import NavBar from "./nav-bar";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NavBar,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
