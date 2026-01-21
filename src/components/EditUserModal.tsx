
import { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import type { User } from "../types/User";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updatedValues: unknown) => void;
  user: User | null; 
}

export const EditUserModal = ({ isOpen, onClose, onUpdate, user }: EditUserModalProps) => {
  const [form] = Form.useForm();

  
  useEffect(() => {
    if (user && isOpen) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        city: user.city,
        departman: user.departman,
      });
    }
  }, [user, isOpen, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (user) {
          onUpdate(user.id, values); 
          onClose();
        }
      })
      .catch((info) => console.log("Hata:", info));
  };

  return (
    <Modal
      open={isOpen}
      title="Kullanıcıyı Düzenle"
      onCancel={onClose}
      footer={[
        <Button key="iptal" onClick={onClose}>İptal</Button>,
        <Button key="kaydet" type="primary" onClick={handleOk} style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: "#fff" }}>
          Güncelle
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="editUserForm">
        <Form.Item name="fullName" label="Ad Soyad" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Rol" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="city" label="Şehir" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="departman" label="Departman">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};