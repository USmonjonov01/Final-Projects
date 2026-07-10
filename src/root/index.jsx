import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import SingUpForm from "../components/registration/singUP"
import SingInForm from "../components/registration/singIN"
import Data from "../utils/navbar"
import Sidebar from "../components/Sidebar"
import PrivateRoutes from "./privateRoutes"
import NotFound from "../components/NotFound"

function Root() {
     return <div>
          <Routes>
               <Route element={<Sidebar />}>
                    {
                         Data.map(({ path, element: Element }) => {
                              return <Route path={path} element={<PrivateRoutes> <Element /> </PrivateRoutes>} key={path} />
                         })
                    }
               </Route>

               <Route path="sign-in" element={<SingInForm />} />
               <Route path="sign-up" element={<SingUpForm />} />

               <Route path="/" element={<Navigate to="/dashboard" />} />
               <Route path="*" element={<NotFound/>} />
          </Routes>
     </div>

}

export default Root