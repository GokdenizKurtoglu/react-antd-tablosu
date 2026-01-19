import { useState } from "react";
import { Table, Input, Button, Space, ConfigProvider } from "antd";
import { SearchOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { getUserColumns } from "../constants/userColumns";
import { users } from "../data/users";
import { UserDetailModal } from "../components/UserDetailModal";
import type { User } from "../types/User";

export const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  
  const [aramaMetni, setAramaMetni] = useState("");

  const handleDetailClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns = getUserColumns(handleDetailClick);

  
  const filteredUsers = users.filter((user) => {
    const term = aramaMetni.toLowerCase(); 
    return (
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.city.toLowerCase().includes(term) ||
      user.departman.toLowerCase().includes(term)
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
            headerBg: "#5007a3", 
            headerColor: "#ffffff", 
            headerSplitColor: "#bc2d74", 
            cellPaddingBlock: 16, 
          },
          Pagination: {
            itemActiveBg: "#020c45",    
            itemActiveColor: "#ffffff",
            colorPrimary: "#0b2ff9",   
            borderRadius: 4,
          },
        },
      }}
    >
      <div style={{ background: "#fffffffb", padding: "24px", borderRadius: "8px", border: "1px solid #8a2525" }}>
        
      
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#c46464" }}>Kullanıcı Listesi</h2>
          
          <Space size="middle">
            <Button icon={<DownloadOutlined />}>Dışa Aktar</Button>
            <Button icon={<UploadOutlined />}>İçe Aktar</Button>
            
            <Input 
              placeholder="İsim, mail veya şehir ara..." 
              suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />} 
              style={{ width: 220 }} 
             
              onChange={(e) => setAramaMetni(e.target.value)}
              value={aramaMetni}
            />
          </Space>
        </div>

       
        <Table
          columns={columns}
          
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            pageSize: 6,
            
            total: filteredUsers.length,
            showTotal: (total, range) => (
              <span style={{ color: "#8c8c8c", fontWeight: 400 }}>
                {total} kayıt arasından {range[0]}-{range[1]} arası görüntüleniyor
              </span>
            ),
            showSizeChanger: false,
          }}
          bordered={false}
        />
      </div>

      <UserDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </ConfigProvider>
  );
};