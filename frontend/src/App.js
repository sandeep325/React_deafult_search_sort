
import './App.css';
import CreateUser from "./createUser"
import UserList from './userList';
import PageNotFound from './PageNotFound';
import { Routes, Route ,BrowserRouter} from "react-router-dom";
function App() {
  return (
    <div >
       
         {/* <CreateUser/> */}
         {/* <UserList/> */}

<BrowserRouter>
<Routes>
       {/* UNPROTECTTED ROUTES */}
       <Route path="/" element={<CreateUser />} />
       <Route path='*' exact={true}  element={<PageNotFound/>} />
       <Route path="/user_list" element={ <UserList/>} />
     </Routes>
</BrowserRouter>
        
    </div>
  );
}

export default App;
