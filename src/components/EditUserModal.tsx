import { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import type { User } from "../types/User";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updatedValues: unknown) => void;
  user: User | null; 
}

// Kullanıcı bilgilerini düzenlediğimiz pencere
export const EditUserModal = ({ isOpen, onClose, onUpdate, user }: EditUserModalProps) => {
  const [form] = Form.useForm();

  // Modal açıldığında, seçili kullanıcının mevcut bilgilerini kutucuklara doldur
  useEffect(() => {
    if (user && isOpen) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        city: user.city,
        departman: user.departman,
        ages: user.ages, 
        gender: user.gender,
        isActive: user.isActive,
        kullanınlanIzin: user.kullanınlanIzin 
      });
    }
  }, [user, isOpen, form]);

  // Güncelle butonuna basılınca çalışır
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (user) {
        onUpdate(user.id, values); // Güncelleme fonksiyonunu çağır
        onClose(); // Pencereyi kapat
      }
    });
  };

  return (
    <Modal
      open={isOpen}
      title="Kullanıcıyı Düzenle"
      onCancel={onClose}
      footer={[
        <Button key="iptal" onClick={onClose}>İptal</Button>,
        <Button 
          key="kaydet" 
          type="primary" 
          onClick={handleOk} 
          style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: "#fff" }}
        >
          Güncelle
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="editUserForm">
        
        <Form.Item 
          name="fullName" 
          label="Ad Soyad" 
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item 
          name="email" 
          label="Email" 
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        {/* Rol ve Durum yan yana */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item 
              name="role" 
              label="Rol" 
              style={{ flex: 1 }} 
              rules={[{ required: true }]}
            >
              <Select>
                  <Select.Option value="Admin">Admin</Select.Option>
                  <Select.Option value="User">User</Select.Option>
                  <Select.Option value="Editor">Editor</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item 
              name="isActive" 
              label="Durum" 
              style={{ flex: 1 }} 
              rules={[{ required: true }]}
            >
                <Select>
                    <Select.Option value={true}>Aktif</Select.Option>
                    <Select.Option value={false}>Pasif</Select.Option>
                </Select>
            </Form.Item>
        </div>

        {/* Şehir ve Departman yan yana */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item 
              name="city" 
              label="Şehir" 
              style={{ flex: 1 }} 
              rules={[{ required: true }]}
            >
               <Input />
            </Form.Item>
            
            <Form.Item 
              name="departman" 
              label="Departman" 
              style={{ flex: 1 }}
            >
               <Input />
            </Form.Item>
        </div>

        {/* Yaş ve Cinsiyet yan yana */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item 
              name="ages" 
              label="Yaş" 
              style={{ flex: 1 }}
            >
               <Input type="number" />
            </Form.Item>

            <Form.Item 
              name="gender" 
              label="Cinsiyet" 
              style={{ flex: 1 }}
            >
                <Select>
                    <Select.Option value="male">Erkek</Select.Option>
                    <Select.Option value="female">Kadın</Select.Option>
                    <Select.Option value="Belirtilmemiş">Belirtilmemiş</Select.Option>
                </Select>
            </Form.Item>
        </div>

        {/* İzin güncelleme alanı */}
        <Form.Item 
          name="kullanınlanIzin" 
          label="Kullanılan İzin"
        >
           <Input type="number" />
        </Form.Item>

      </Form>
    </Modal>
  );
};