import RoutesApp from "./Routes";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
