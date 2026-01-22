import { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  ConfigProvider,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { teklifler } from "../data/teklifler";
import { TeklifDetailModal } from "../components/TeklifDetailModal";
import { exportToExcel } from "../Araçlar/ExcelHelper";
import type { Teklif } from "../types/Teklif";

export const Teklifler = () => {
  const [aramaMetni, setAramaMetni] = useState("");
  const [selectedTeklif, setSelectedTeklif] = useState<Teklif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExcelClick = () => {
    const excelData = teklifler.map((t) => ({
      "Teklif No": t.id,
      "Müşteri": t.musteri,
      "Tutar": t.tutar,
      "Durum": t.durum,
    }));

    exportToExcel(excelData, "TeklifListesi", "Teklifler");
  };

  const columns: ColumnsType<Teklif> = [
    {
      title: "Teklif No",
      dataIndex: "id",
      key: "id",
      width: 120,
      align: "center",
    },
    {
      title: "Müşteri",
      dataIndex: "musteri",
      key: "musteri",
    },
    {
      title: "Tutar",
      dataIndex: "tutar",
      key: "tutar",
      align: "center",
    },
    {
      title: "Durum",
      dataIndex: "durum",
      key: "durum",
      align: "center",
      render: (durum: string) => {
        // 👇 Gelen metni büyük harfe çevirip garantili kontrol
        const status = durum.toUpperCase();

        let color = "geekblue"; // Varsayılan

        if (status.includes("ONAY")) color = "green";
        else if (status.includes("RED")) color = "volcano";
        else if (status.includes("BEK")) color = "geekblue";

        return (
          <Tag
            color={color}
            key={durum}
            style={{
              minWidth: 90,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "İşlemler",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedTeklif(record);
            setIsModalOpen(true);
          }}
          style={{
            backgroundColor: "#4b3f8f",
            borderColor: "#4b3f8f",
          }}
        >
          Detayları Gör
        </Button>
      ),
    },
  ];

  const filteredData = teklifler.filter(
    (item) =>
      item.musteri.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      item.id.toLowerCase().includes(aramaMetni.toLowerCase())
  );

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
            headerSplitColor: "#2e3c87",
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
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          border: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              color: "#3f2b96",
              fontWeight: "bold",
            }}
          >
            Teklif Listesi
          </h2>

          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExcelClick}
              style={{
                color: "#2e3c87",
                borderColor: "#2e3c87",
              }}
            >
              Excel'e Aktar
            </Button>

            <Input
              placeholder="Teklif No veya Müşteri Ara..."
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              onChange={(e) => setAramaMetni(e.target.value)}
              style={{ width: 250 }}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

        <TeklifDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teklif={selectedTeklif}
        />
      </div>
    </ConfigProvider>
  );
};
