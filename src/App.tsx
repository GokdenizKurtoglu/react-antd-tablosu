import { Table, Tag, Button, Modal } from "antd";
import { useState } from "react";
import { users } from "./data/users";
import {type User } from "./types/User";
import { Layout } from "antd";
const { Content } = Layout;

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "fullName",
    },

    {
        title: "cinsiyet",
        dataIndex: "gender",
    },

    {
      title:"yaş",
      dataIndex:"ages"
    },
    {
      title:"şehir",
      dataIndex:"city"
    },
    {title:"departman",
      dataIndex:"departman"
    },
    {title:"pozisyon",
     dataIndex:"çalışmaDurumu"
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
    },
    {title:"kullanılan izin",
     dataIndex:"kullanınlanIzin"
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="green">Aktif</Tag>
        ) : (
          <Tag color="red">Pasif</Tag>
        ),
    },
    {
      title: "İşlem",
      render: (_: unknown, record: User) => (
        <Button
          onClick={() => {
            setSelectedUser(record);
            setIsModalOpen(true);
          }}
        >
          Detay
        </Button>
      ),
    },
  ];

return (
  <Layout style={{ minHeight: "100vh" }}>
    <Content style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
          style={{ width: "100%" }}

      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Kullanıcı Detayı"
      >
        {selectedUser && (
          <>
            <p><b>Ad Soyad:</b> {selectedUser.fullName}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Rol:</b> {selectedUser.role}</p>
            <p>
              <b>Durum:</b>{" "}
              {selectedUser.isActive ? "Aktif" : "Pasif"}
            </p>
            <p>
              <b>yaş:</b>{selectedUser.ages}</p>
              <p><b>cinsiyet:</b> {selectedUser.gender} </p>
              <p><b>kullanılan izin:</b>{selectedUser.kullanınlanIzin} </p>
          </>
        )}
      </Modal>
    </Content>
  </Layout>
);


}

export default App;
