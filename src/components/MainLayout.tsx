import { useState } from "react";
import { Layout, theme } from "antd";
import { SubMenü } from "./SubMenü";

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sol menüyü çağırıyorum */}
      <SubMenü 
        collapsed={collapsed} 
        onCollapse={() => setCollapsed(!collapsed)} 
      />

      <Layout 
        style={{ 
          marginLeft: collapsed ? 80 : 250, // Menü durumuna göre içerik boşluğunu ayarla
          transition: "margin-left 0.2s" 
        }}
      > 
        <Header 
          style={{ 
            padding: 0, 
            background: colorBgContainer 
          }} 
        />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children} 
        </Content>
      </Layout>
    </Layout>
  );
};