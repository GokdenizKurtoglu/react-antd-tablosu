import { Tag, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { User } from "../types/User";
import type { ColumnsType } from "antd/es/table";

export const getUserColumns = (
  onDetailClick: (user: User) => void,
  onEditClick: (user: User) => void
): ColumnsType<User> => [
  { title: "Ad Soyad", dataIndex: "fullName", width: 180, align: "left" },
  { title: "Şehir", dataIndex: "city", align: "center" },
  { title: "Departman", dataIndex: "departman", align: "center" },
  { title: "Email", dataIndex: "email", align: "center" },
  { title: "Rol", dataIndex: "role", align: "center" },
  {
    title: "Durum",
    dataIndex: "isActive",
    align: "center",
    render: (isActive: boolean) =>
      isActive ? <Tag color="green">Aktif</Tag> : <Tag color="red">Pasif</Tag>,
  },
  {
    title: "İşlemler",
    align: "center",
    width: 200,
    render: (_: unknown, record: User) => (
      <Space>
       
        <Button
          type="default"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => onEditClick(record)}
          style={{ color: "#faad14", borderColor: "#faad14" }}
        />
        
       
        <Button
          type="primary"
          onClick={() => onDetailClick(record)}
          style={{
            backgroundColor: "#2e3c87",
            borderColor: "#2e3c87",
            fontWeight: 500,
          }}
        >
          Detay
        </Button>
      </Space>
    ),
  },
];