import { useState } from "react";
import { Table, Tag, ConfigProvider, Typography, Input } from "antd"; 
import { SearchOutlined } from "@ant-design/icons";
import { teklifler } from "../data/teklifler"; 

const { Title } = Typography;


const columns = [
  { title: 'Teklif No', dataIndex: 'id', align: 'center' as const },
  { title: 'Müşteri', dataIndex: 'musteri', align: 'left' as const },
  { title: 'Tutar', dataIndex: 'tutar', align: 'center' as const },
  { 
    title: 'Durum', 
    dataIndex: 'durum', 
    align: 'center' as const,
    render: (durum: string) => {
      let color = 'geekblue';
      if (durum === 'Reddedildi') color = 'volcano';
      if (durum === 'Onaylandı') color = 'green';
      return <Tag color={color}>{durum.toUpperCase()}</Tag>;
    }
  },
];


export const Teklifler = () => {
  const [aramaMetni, setAramaMetni] = useState("");

  
  const filtrelenmisTeklifler = teklifler.filter((teklif) => {
    const term = aramaMetni.toLowerCase();
    return (
      teklif.id.toLowerCase().includes(term) ||
      teklif.musteri.toLowerCase().includes(term) ||
      teklif.durum.toLowerCase().includes(term)
    );
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Table: {
            headerBg: "#2e3c87", 
            headerColor: "#ffffff",
            headerSplitColor: "rgba(255, 255, 255, 0.2)",
            headerBorderRadius: 8,
          },
          Pagination: {
            itemActiveBg: "#2e3c87",    
            itemActiveColor: "#ffffff", 
            colorPrimary: "#2e3c87",    
            borderRadius: 4,
          },
        },
      }}
    >
      <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
 
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <Title level={3} style={{ margin: 0, color: "#2e3c87" }}>
            Teklif Listesi
          </Title>


          <Input 
            placeholder="Teklif No, Müşteri veya Durum ara..." 
            suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />} 
            style={{ width: 280 }} 
            onChange={(e) => setAramaMetni(e.target.value)}
            value={aramaMetni}
          />
        </div>
        

        <Table 
          dataSource={filtrelenmisTeklifler}
          columns={columns} 
          pagination={{ 
            pageSize: 5,
            total: filtrelenmisTeklifler.length,
            showTotal: (total, range) => (
              <span style={{ color: "#8c8c8c", fontWeight: 400 }}>
                {total} kayıt arasından {range[0]}-{range[1]} arası görüntüleniyor
              </span>
            ),
          }} 
        />
      </div>
    </ConfigProvider>
  );
};