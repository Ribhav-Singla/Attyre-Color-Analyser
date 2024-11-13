import Navbar from "./custom_components/Navbar";
import Homepage from "./pages/Homepage"
import PersonalizedPalette from "./pages/PersonalizedPalette"
import SelectColor from "./pages/SelectColor"
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <>
    <Navbar/>
    <div className="max-w-[1024px] w-full mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/selectcolor" element={<SelectColor/>}/>
          <Route path="/palette" element={<PersonalizedPalette/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
