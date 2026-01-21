import { Layout, theme } from "antd";
import { SubMenü } from "./SubMenü";

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      
      <SubMenü />

     
      <Layout style={{ marginLeft: 250 }}> 
        
        {}
        <Header style={{ padding: 0, background: colorBgContainer }} />

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