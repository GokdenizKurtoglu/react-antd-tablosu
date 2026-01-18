import { Card, Typography, Row, Col } from "antd";
import { TeamOutlined, FileTextOutlined, ArrowRightOutlined } from "@ant-design/icons"; 
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title level={2} style={{ color: "#2e3c87", marginBottom: "40px" }}>
        Hoş geldiniz
      </Title>

      <Row justify="center" gutter={[24, 24]}>
        
       
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => navigate("/kullanici-yonetimi")}
            style={{ 
              borderRadius: "12px", 
              border: "1px solid #f0f0f0", 
              height: "100%",
              cursor: "pointer"
            }}
          >
            <TeamOutlined style={{ fontSize: "48px", color: "#2e3c87", marginBottom: "16px" }} />
            <Title level={4} style={{ margin: "10px 0", color: "#2e3c87" }}>Kullanıcı Listesi</Title>
            <Text type="secondary">Personel kayıtlarını yönet.</Text>
            <div style={{ marginTop: "20px", color: "#2e3c87", fontWeight: 500 }}>
              Git <ArrowRightOutlined />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            onClick={() => navigate("/teklifler")} 
            style={{ 
              borderRadius: "12px", 
              border: "1px solid #f0f0f0", 
              height: "100%",
              cursor: "pointer"
            }}
          >
            <FileTextOutlined style={{ fontSize: "48px", color: "#2e3c87", marginBottom: "16px" }} />
            <Title level={4} style={{ margin: "10px 0", color: "#2e3c87" }}>Teklifler</Title>
            <Text type="secondary">Müşteri tekliflerini incele.</Text>
            <div style={{ marginTop: "20px", color: "#2e3c87", fontWeight: 500 }}>
              Git <ArrowRightOutlined />
            </div>
          </Card>
        </Col>

      </Row>
    </div>
  );
};