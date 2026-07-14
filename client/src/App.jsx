import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useSyncUser from "./hooks/useSyncUser";
import useSocket from "./hooks/useSocket";

function App() {
  useSocket();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;