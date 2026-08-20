import {
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";


import PetsPage from "../pages/pets/PetsPage";

import ProtectedRoute from "../components/common/ProtectedRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import MyRequestsPage from "../pages/adoptions/MyRequestsPage";
import AddPetPage from "../pages/admin/AddPetPage";
import ManageAdoptionsPage from "../pages/admin/ManageAdoptionsPage";
import PetRequestsPage from "../pages/admin/PetRequestsPage";
import PetEditPage from "../pages/admin/PetEditPage";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<PetsPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/** USER ROUTES */}
      <Route
        element={<ProtectedRoute
          requiredRole="USER"/>
        }
      >
        <Route
        path="/requests"
        element={<MyRequestsPage />}
        />

      </Route>

      

      {/** ADMIN ROUTES */}

      <Route
        element={
          <ProtectedRoute
            requiredRole="ADMIN"
          />
        }
      >

        <Route
          path="/admin/pets"
          element={<AddPetPage />}
        />

        <Route
          path="/admin/adoptions"
          element={<ManageAdoptionsPage />}
        />

        <Route
          path="/admin/pets/:tag/requests"
          element={<PetRequestsPage />}
        />

        <Route
          path="/admin/pets/:tag/edit"
          element={<PetEditPage />}
        />

      </Route>

    </Routes>

  );
}