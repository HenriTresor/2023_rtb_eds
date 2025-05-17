import { Routes, Route } from 'react-router-dom'
import { routes } from './constants/routes'

function App() {

  return (
    <>
      <Routes>
        {
          routes.map((route) => {
            return <Route key={route.path} path={route.path} element={route.component} />
          })
        }
      </Routes>
    </>
  )
}

export default App
