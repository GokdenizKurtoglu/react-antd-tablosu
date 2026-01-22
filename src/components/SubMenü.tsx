import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  TeamOutlined, 
  FileTextOutlined,
  MenuUnfoldOutlined, 
  MenuFoldOutlined 
} from "@ant-design/icons";

const { Sider } = Layout;

// Props tanımı: Ana sayfadan hangi verilerin geleceğini söylüyoruz
interface SubMenuProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export const SubMenü = ({ collapsed, onCollapse }: SubMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider 
      trigger={null} // Varsayılan alt tetiği kapattık
      collapsible 
      collapsed={collapsed} 
      width={250}
      collapsedWidth={80} // Kapandığında ne kadar genişlikte kalacağı
      style={{ 
        overflow: 'auto', 
        height: '100vh', 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0,
        background: '#001529',
        zIndex: 1000,
      }}
    >
      {/* AÇMA/KAPAMA BUTONU */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
        <Button 
          type="primary" 
          onClick={onCollapse} 
          style={{ marginBottom: 10 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} 
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Ana Sayfa',
          },
          {
            key: '/kullanici-yonetimi',
            icon: <TeamOutlined />,
            label: 'Kullanıcı Yönetimi',
          },
          {
            key: '/teklifler',
            icon: <FileTextOutlined />,
            label: 'Teklifler',
          },
        ]}
      />
    </Sider>
  );
};