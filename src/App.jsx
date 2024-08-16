import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"

const App = () => {

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
