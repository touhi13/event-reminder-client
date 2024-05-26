import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  const authChecked = useAuthCheck();
  return (
    !authChecked ? (<>Checking authentication</>) :
      <RouterProvider router={router} />
  );
}

export default App;