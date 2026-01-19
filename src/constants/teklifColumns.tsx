
import { Tag, Button } from "antd";
import type { Teklif } from "../types/Teklif";
import type { ColumnsType } from "antd/es/table";

export const getTeklifColumns = (
  onDetailClick: (teklif: Teklif) => void
): ColumnsType<Teklif> => [
  {
    title: "Teklif No",
    dataIndex: "id",
    align: "center",
    width: 120,
  },
  {
    title: "Müşteri",
    dataIndex: "musteri",
    align: "left",
  },
  {
    title: "Tutar",
    dataIndex: "tutar",
    align: "center",
  },
  {
    title: "Durum",
    dataIndex: "durum",
    align: "center",
    render: (durum: string) => {
    
      let color = 'geekblue'; 
      if (durum === 'Reddedildi') color = 'volcano'; 
      if (durum === 'Onaylandı') color = 'green'; 

      return (
        <Tag color={color} style={{ width: "90px", textAlign: "center" }}>
          {durum.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "İşlemler",
    align: "center",
    width: 180,
    render: (_: unknown, record: Teklif) => (
      <Button
        type="primary"
        onClick={() => onDetailClick(record)}
        style={{
          backgroundColor: "#5007a3", 
          borderColor: "#2e3c87",
          borderRadius: "4px",
          width: "100%",
          fontWeight: 500,
        }}
      >
        Detayları Gör
      </Button>
    ),
  },
];