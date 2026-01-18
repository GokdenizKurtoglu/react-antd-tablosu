import { Tag, Button } from "antd";
import type { User } from "../types/User";
import type { ColumnsType } from "antd/es/table";

export const getUserColumns = (
  onDetailClick: (user: User) => void
): ColumnsType<User> => [
  {
    title: "Ad Soyad",
    dataIndex: "fullName",
    width: 180,
    align: "left",
  },
  {
    title: "Cinsiyet",
    dataIndex: "gender",
    align: "center",
  },
  {
    title: "Yaş",
    dataIndex: "ages",
    align: "center",
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
    title: "Pozisyon",
    dataIndex: "çalışmaDurumu",
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
    title: "Kullanılan İzin",
    dataIndex: "kullanınlanIzin",
    align: "center",
  },
  {
    title: "Durum",
    dataIndex: "isActive",
    align: "center",
    render: (isActive: boolean) =>
      isActive ? (
        <Tag color="green" style={{ width: "50px", textAlign: "center" }}>
          Aktif
        </Tag>
      ) : (
        <Tag color="red" style={{ width: "50px", textAlign: "center" }}>
          Pasif
        </Tag>
      ),
  },
  {
    title: "İşlemler",
    align: "center",
    width: 180,
    render: (_: unknown, record: User) => (
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