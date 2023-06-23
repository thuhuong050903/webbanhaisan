import './App.css';
import Header from './components/header';
import Show from './components/Show_product';
import Footer from './components/footer';
import { Routes,Route} from "react-router-dom";
import PageAdmin from './Admin/pageAdmin';
import Add from './Admin/Add';
import Edit from './Admin/Update';
import Cart from './components/Cart';
import Login from './Account/Login';
import History from './components/History'
import Signup from './Account/Signup';
import Delete from './Admin/Delete';
import ProductDetail from './components/ProductDetail';
function App() {
  
  return (
    <div>
         <Header/>
         <Routes>    
              <Route path='/' element={<Show/>}/>
              <Route path='/Admin' element={<PageAdmin/>}/>;
              <Route path='/Add' element={<Add></Add>} />
              <Route path="/Edit/:id" element={<Edit></Edit>}/>
              <Route path="/product/:id" element={<ProductDetail></ProductDetail>} />
              <Route path="/signup" element={<Signup></Signup>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/giohang" element={<Cart></Cart>} />
              <Route path="/lichsu" element={<History></History>} />

          </Routes>
         <Footer/>
         <Routes>   
         <Route path="/Delete/:id" element={<Delete></Delete>}/>
         </Routes>
    </div>
     
  );
}

export default App;
