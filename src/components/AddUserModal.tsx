
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
        // Eğer zorunlu alanlar boşsa veya hatalıysa buraya düşer (Konsola yazar, ekranda da kırmızı uyarı çıkar).
        console.log("Doğrulama Hatası:", info);
      });
  };

  return (
    <Modal
      open={isOpen}
      title="Yeni Kullanıcı Ekle"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>İptal</Button>,
        <Button key="submit" type="primary" onClick={handleOk} style={{ backgroundColor: "#2e3c87" }}>
          Kaydet
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="userForm">
        
        {/*  ZORUNLU ALAN ÖRNEĞİ */}
        <Form.Item 
          name="fullName" 
          label="Ad Soyad" 
          //  SAĞLAYAN KOMUT: 'required: true'
          // Ekranda çıkacak hata uyarısı da 'message' kısmında yazıyor.
          rules={[{ required: true, message: "Lütfen ad soyad giriniz!" }]}
        >
          <Input placeholder="Örn: Defne Boğaz" />
        </Form.Item>

        {/*  HEM ZORUNLU HEM FORMAT KONTROLÜ */}
        <Form.Item 
          name="email" 
          label="Email Adresi" 
          // 1. required: true -> Boş bırakılamaz.
          // 2. type: "email" -> @ işareti ve format kontrolü yapar. Yanlışsa mesajı gösterir.
          rules={[
            { required: true, message: "Lütfen email giriniz!" }, 
            { type: "email", message: "Geçerli bir email giriniz!" }
          ]}
        >
          <Input placeholder="orn@sirket.com" />
        </Form.Item>

        <Form.Item 
          name="role" 
          label="Rol" 
          // Sadece seçilmesi zorunlu,
          rules={[{ required: true, message: "Lütfen bir rol seçiniz!" }]}
        >
          <Select placeholder="Rol seçiniz">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
          </Select>
        </Form.Item>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Form.Item 
            name="city" 
            label="Şehir" 
            style={{ flex: 1 }} 
            // Şehir girmek zorunlu
            rules={[{ required: true, message: "Şehir giriniz!" }]}
          >
             <Input placeholder="Örn: Ankara" />
          </Form.Item>

          {/* 👇 ZORUNLU OLMAYAN (OPSİYONEL) ALAN */}
          <Form.Item 
            name="departman" 
            label="Departman" 
            style={{ flex: 1 }}
            
          >
             <Input placeholder="Örn: Yazılım" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>

          {/* Yaş girmek zorunlu değil (rules yok) */}
          <Form.Item name="ages" label="Yaş" style={{ flex: 1 }}>
             <Input type="number" placeholder="Yaş" />
          </Form.Item>

          {/* Cinsiyet seçmek zorunlu değil (rules yok) */}
          <Form.Item name="gender" label="Cinsiyet" style={{ flex: 1 }}>
            <Select placeholder="Seçiniz">
              <Select.Option value="male">Erkek</Select.Option>
              <Select.Option value="female">Kadın</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* İzin girmek zorunlu değil (rules yok) */}
        <Form.Item name="kullanınlanIzin" label="Kullanılan İzin">
           <Input type="number" placeholder="Örn: 5" />
        </Form.Item>

      </Form>
    </Modal>
  );
};