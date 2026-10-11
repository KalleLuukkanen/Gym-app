import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginOrRegister from './features/auth/LoginOrRegister'
import Layout from './layout/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOrRegister isLogin={true} />} />
        <Route path="/register" element={<LoginOrRegister isLogin={false} />} />
      </Route>
    </Routes>
  )
}
