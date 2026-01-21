import { Routes, Route } from "react-router-dom";
import { UserList } from "./pages/UserList";
import { Home } from "./pages/home"; 
import { Teklifler } from "./pages/Teklifler"; 
import { MainLayout } from "./components/MainLayout"; 
function App() {
  return (
    
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kullanici-yonetimi" element={<UserList />} />
        <Route path="/teklifler" element={<Teklifler />} />
      </Routes>
    </MainLayout>
  );
}

export default App;