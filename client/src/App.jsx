import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useSyncUser from "./hooks/useSyncUser";

function App() {
  useSyncUser();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;