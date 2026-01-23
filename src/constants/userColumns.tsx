import { Tag, Button, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, SwapOutlined } from "@ant-design/icons"; // ikonlar
import type { User } from "../types/User";
import type { ColumnsType } from "antd/es/table";

export const getUserColumns = (
  onDetailClick: (user: User) => void,
  onEditClick: (user: User) => void,
  onDeleteClick: (id: string) => void,
  onStatusChange: (id: string, currentStatus: boolean) => void 
): ColumnsType<User> => [
  {
    title: "Ad Soyad",
    dataIndex: "fullName",
    width: 180,
    align: "left",
  },
  {
    title: "Şehir",
    dataIndex: "city",
    align: "center",
  },
  {
    title: "Departman",
    dataIndex: "departman",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    align: "center",
  },
  {
    title: "Rol",
    dataIndex: "role",
    align: "center",
  },
  {
    title: "Durum",
    dataIndex: "isActive",
    align: "center",
    width: 120,

    render: (isActive: boolean) =>
      isActive ? <Tag color="green">Aktif</Tag> :
                 <Tag color="red">Pasif</Tag>,
  },
  {
    title: "İşlemler",
    align: "center",
    width: 200,
    render: (_: unknown, record: User) => (
      <Space>
        {/*  DURUM DEĞİŞTİRME BUTONU  */}
        <Tooltip title="Durumu Değiştir">
            <Button
            type="default"
            shape="circle"
            icon={<SwapOutlined />}
            onClick={() => onStatusChange(record.id, !record.isActive)} // Tersi duruma çevir
            style={{ color: "#096dd9", borderColor: "#096dd9" }}
            />
        </Tooltip>

        {/* DÜZENLE BUTONU */}
        <Button
          type="default"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => onEditClick(record)}
          style={{ color: "#faad14", borderColor: "#faad14" }}
        />

        {/* SİL BUTONU */}
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Bu kullanıcıyı silmek istediğinize emin misiniz?"
          onConfirm={() => onDeleteClick(record.id)}
          okText="Evet"
          cancelText="Hayır"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="default"
            shape="circle"
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
        
        {/* DETAY BUTONU */}
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