import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  ConfigProvider,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { getUserColumns } from "../constants/userColumns";
import { users as initialUsers } from "../data/users";
import { UserDetailModal } from "../components/UserDetailModal";
import { AddUserModal } from "../components/AddUserModal";
import { EditUserModal } from "../components/EditUserModal";
import type { User } from "../types/User";
import { exportToExcel } from "../Araçlar/ExcelHelper";

interface FormValues {
  fullName: string;
  email: string;
  role: string;
  city: string;
  departman: string;
  ages?: string;
  gender?: string;
  isActive?: boolean;
  kullanınlanIzin?: string;
}

export const UserList = () => {
  const [tumKullanicilar, setTumKullanicilar] = useState<User[]>(() => {
    const kaydedilmisVeri = localStorage.getItem("kullanici_listesi");

    if (kaydedilmisVeri) {
      return JSON.parse(kaydedilmisVeri);
    } else {
      return initialUsers;
    }
  });

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [aramaMetni, setAramaMetni] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "kullanici_listesi",
      JSON.stringify(tumKullanicilar)
    );
  }, [tumKullanicilar]);

  const handleDetailClick = (user: User) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    const yeniListe = tumKullanicilar.filter(
      (user) => user.id !== id
    );

    setTumKullanicilar(yeniListe);
    message.success("Kullanıcı başarıyla silindi!");
  };

  const handleStatusChange = (id: string, newStatus: boolean) => {
    const guncelListe = tumKullanicilar.map((user) =>
      user.id === id
        ? { ...user, isActive: newStatus }
        : user
    );

    setTumKullanicilar(guncelListe);

    if (newStatus) {
      message.success("Kullanıcı Aktif edildi!");
    } else {
      message.warning("Kullanıcı Pasife alındı!");
    }
  };

  const handleAddUser = (values: unknown) => {
    const formValues = values as FormValues;
    const { ages, gender, kullanınlanIzin, ...digerBilgiler } =
      formValues;

    const newUser: User = {
      id: Date.now().toString(),
      ...digerBilgiler,
      departman: formValues.departman || "Genel",
      gender: gender || "Belirtilmemiş",
      ages: ages ? Number(ages) : 0,
      kullanınlanIzin: kullanınlanIzin
        ? Number(kullanınlanIzin)
        : 0,
      çalışmaDurumu: "full-time",
      isActive: true,
      key: Date.now().toString(),
    };

    setTumKullanicilar([newUser, ...tumKullanicilar]);
    setIsAddOpen(false);

    message.success("Kullanıcı eklendi ve kaydedildi!");
  };

  const handleUpdateUser = (
    id: string,
    updatedValues: unknown
  ) => {
    const values = updatedValues as Partial<FormValues>;
    const {
      ages,
      gender,
      isActive,
      kullanınlanIzin,
      ...rest
    } = values;

    const guncelListe = tumKullanicilar.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...rest,
          ages: ages ? Number(ages) : user.ages,
          gender: gender || user.gender,
          isActive:
            isActive !== undefined
              ? isActive
              : user.isActive,
          kullanınlanIzin: kullanınlanIzin
            ? Number(kullanınlanIzin)
            : user.kullanınlanIzin,
        };
      }
      return user;
    });

    setTumKullanicilar(guncelListe);
    message.success("Kullanıcı güncellendi!");
  };

  const handleExcelClick = () => {
    const excelData = tumKullanicilar.map((user) => ({
      "Ad Soyad": user.fullName,
      Email: user.email,
      Rol: user.role,
      Şehir: user.city,
      Departman: user.departman,
      Durum: user.isActive ? "Aktif" : "Pasif",
      "Kullanılan İzin": user.kullanınlanIzin,
      Yaş: user.ages,
      Cinsiyet: user.gender,
    }));

    exportToExcel(
      excelData,
      "KullaniciListesi",
      "Kullanıcılar"
    );
  };

  const columns = getUserColumns(
    handleDetailClick,
    handleEditClick,
    handleDeleteUser,
    handleStatusChange
  );

  const filtrelenmisKullanicilar = tumKullanicilar.filter(
    (user) => {
      const term = aramaMetni.toLowerCase();

      return (
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.city.toLowerCase().includes(term) ||
        user.departman.toLowerCase().includes(term)
      );
    }
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Table: {
            headerBg: "#3f2b96",
            headerColor: "#ffffff",
            headerSplitColor: "#3f2b96",
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
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "600",
              color: "#262626",
            }}
          >
            Kullanıcı Listesi
          </h2>

          <Space size="middle">
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

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#2e3c87" }}
              onClick={() => setIsAddOpen(true)}
            >
              Yeni Kullanıcı Ekle
            </Button>

            <Input
              placeholder="Ara..."
              suffix={
                <SearchOutlined
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              }
              style={{ width: 220 }}
              onChange={(e) =>
                setAramaMetni(e.target.value)
              }
              value={aramaMetni}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filtrelenmisKullanicilar}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      <UserDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={selectedUser}
      />

      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </ConfigProvider>
  );
};
