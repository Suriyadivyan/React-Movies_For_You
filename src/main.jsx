import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContext from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import './css/index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <App/>
    <Toaster/>
  </AuthContext>
);
