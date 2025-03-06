import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import store from "../src/App/store.js";
import { Provider } from "react-redux";
import {
  fetchEMAILs,
  setFROMLocalStorage,
} from "../src/Features/EmailSlice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      let favoriteEmail = localStorage.getItem(`favoriteEmail`);
      let readEmail = localStorage.getItem(`readEmail`);
      let unreadEmail = localStorage.getItem(`unreadEmail`);
      let MetaData = localStorage.getItem(`MetaData`);
      if (favoriteEmail || readEmail || unreadEmail || MetaData) {
        console.log(`no fetch`);
        store.dispatch(
          setFROMLocalStorage({
            favoriteEmail: favoriteEmail ? JSON.parse(favoriteEmail) : [],
            readEmail: readEmail ? JSON.parse(readEmail) : [],
            unreadEmail: unreadEmail ? JSON.parse(unreadEmail) : [],
            MetaData: MetaData ? JSON.parse(MetaData) : null,
          })
        );
      } else {
        console.log(`fetching`);
        localStorage.removeItem(`favoriteEmail`);
        localStorage.removeItem(`readEmail`);
        localStorage.removeItem(`unreadEmail`);
        localStorage.removeItem(`MetaData`);
        store.dispatch(fetchEMAILs());
      }
    },
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
