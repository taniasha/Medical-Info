import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Admin
import AdminSignin from "./components/admin/AdminSignin";
import AdminHome from "./components/admin/AdminHome";
import AddPharmacist from "./components/admin/AddPharmacist";

// Medicine
import AddMedicinePage from "./components/medicine/AddMedicinePage";
import UpdateMedicine from "./components/medicine/UpdateMedicine";
import OrderMedicine from "./components/user/OrderMedicine";
import MedicineDetail from "./components/medicine/MedicineDetail";

import PharmacistHome from "./components/pharmacist/PharmacistHome";

// User
import Signup from "./components/user/Signup";
import UserSignin from "./components/user/UserSignin";

// Utils
import Home from "./Home";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPass from "./components/user/ResetPass";
import AuthLayout from "./components/pages/AuthLayout";
import NeedAccess from "./components/pages/NeedAccess";
import PharmacistSignin from "./components/pharmacist/PharmacistSignin";
import ChatWithUser from "./components/pharmacist/ChatWithUser";

import ChatWithExpert from "./components/socket/ChatWithExpert";
import ExpertList from "./components/socket/ExpertList";
import SocketProvider from "./components/socket/SocketProvider";
import ChatProvider from "./components/context/ChatProvider";
import UserList from "./components/pharmacist/UserList";

function App() {
  return (
    <>
      <Router  future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/signin" element={<UserSignin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <AuthLayout>
                <NeedAccess>
                  <AdminHome />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/admin/create"
            element={
              <AuthLayout>
                <NeedAccess>
                  <AddMedicinePage />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/admin/update/:id"
            element={
              <AuthLayout>
                <NeedAccess>
                  <UpdateMedicine />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route path="/admin/pharmacist/add" element={<AddPharmacist />} />
          <Route
            path="/medicine/order"
            element={
              <AuthLayout>
                <OrderMedicine />
              </AuthLayout>
            }
          />

          <Route path="/reset-password/:id" element={<ResetPass />} />

          <Route path="/" element={<ChatProvider />}>
            <Route
              path="pharmacist"
              element={
                <AuthLayout>
                  <PharmacistHome />
                </AuthLayout>
              }
            />

            <Route
              path="pharmacist/user-list"
              element={
                <AuthLayout>
                  <UserList />
                </AuthLayout>
              }
            />
            
            <Route
              path="pharmacist/chat-with-user"
              element={
                <AuthLayout>
                  <ChatWithUser />
                </AuthLayout>
              }
            />

            <Route path="home" element={<Home />} />
            <Route path="medicine/:id" element={<MedicineDetail />} />

            <Route path="user/chat-with-expert" element={<ChatWithExpert />} />
            <Route path="user/chat/expert-list" element={<ExpertList />} />
          </Route>

          <Route path="/pharmacist/signin" element={<PharmacistSignin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
