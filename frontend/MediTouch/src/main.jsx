import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async"; // ✅ Import HelmetProvider
import store from "./redux/store";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider> {/* ✅ Wrap everything with HelmetProvider */}
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);