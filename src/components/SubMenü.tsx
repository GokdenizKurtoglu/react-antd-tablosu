import { Layout, Menu, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  TeamOutlined, 
  FileTextOutlined,
  SearchOutlined 
} from "@ant-design/icons";

const { Sider } = Layout;

export const SubMenü = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider 
      width={250} 
      style={{ 
        overflow: 'auto', 
        height: '100vh', 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0,
        background: '#001529' 
      }}
    >
    
      
      {/* Arama Çubuğu */}
      <div style={{ padding: '0 16px', marginBottom: '16px', marginTop: '20px' }}> {}
        <Input 
          placeholder="Menüde ara..." 
          prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />} 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none', 
            color: 'white'
          }}
        />
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