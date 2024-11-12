import Homepage from "./pages/Homepage"
import PersonalizedPalette from "./pages/PersonalizedPalette"
import SelectColor from "./pages/SelectColor"

function App() {

  return (
    <>
    <div className="max-w-[1280px] w-full mx-auto">
      <Homepage/>
      <SelectColor/>
      <PersonalizedPalette/>
    </div>
    </>
  )
}

export default App
