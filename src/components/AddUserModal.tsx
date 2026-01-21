
import { Modal, Form, Input, Select, Button } from "antd";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: unknown) => void; 
}

export const AddUserModal = ({ isOpen, onClose, onSave }: AddUserModalProps) => {
  const [form] = Form.useForm();

 
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

 
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields(); 
      })
      .catch((info) => {
        console.log("Doğrulama Hatası:", info);
      });
  };

  return (
    <Modal
      open={isOpen}
      title="Yeni Kullanıcı Ekle"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} style={{ backgroundColor: "#2e3c87" }}>
          Kaydet
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="userForm"
      >
        <Form.Item
          name="fullName"
          label="Ad Soyad"
          rules={[{ required: true, message: "Lütfen ad soyad giriniz!" }]}
        >
          <Input placeholder="Örn: Defne Boğaz" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Adresi"
          rules={[
            { required: true, message: "Lütfen email giriniz!" },
            { type: "email", message: "Geçerli bir email giriniz!" },
          ]}
        >
          <Input placeholder="orn@sirket.com" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Rol"
          rules={[{ required: true, message: "Lütfen bir rol seçiniz!" }]}
        >
          <Select placeholder="Rol seçiniz">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Şehir giriniz!" }]}>
           <Input placeholder="Örn: Ankara" />
        </Form.Item>

        <Form.Item name="departman" label="Departman">
           <Input placeholder="Örn: Yazılım" />
        </Form.Item>
      </Form>
    </Modal>
  );
};