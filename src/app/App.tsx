import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "@/components/layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
     <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
