// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(<App/>, document.getElementById("root"));'
import { Provider } from "react-redux";
import { store } from "./redux-setup/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux-setup/store";

import React from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
        </PersistGate>
    </Provider>
);
