import ReactDom from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./Context/AppContext.jsx";

ReactDom.createRoot(document.getElementById("root")).render(
<AppProvider>
    <App />
  </AppProvider>
);
