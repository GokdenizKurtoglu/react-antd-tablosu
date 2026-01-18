import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { UserList } from "./pages/UserList";
import { Home } from "./pages/home"; // 👈 BURAYI DÜZELTTİK (küçük 'h' ile)
import { Teklifler } from "./pages/Teklifler"; // Yeni sayfayı da ekledik

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kullanici-yonetimi" element={<UserList />} />
          <Route path="/teklifler" element={<Teklifler />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;