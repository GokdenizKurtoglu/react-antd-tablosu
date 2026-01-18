import { Modal } from "antd";
import type { User } from "../types/User";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const UserDetailModal = ({ isOpen, onClose, user }: UserDetailModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Kullanıcı Detayı"
    >
      {user && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p><b>Ad Soyad:</b> {user.fullName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Rol:</b> {user.role}</p>
          <p>
            <b>Durum:</b> {user.isActive ? "Aktif" : "Pasif"}
          </p>
          <p><b>Yaş:</b> {user.ages}</p>
          <p><b>Cinsiyet:</b> {user.gender}</p>
          <p><b>Kullanılan İzin:</b> {user.kullanınlanIzin}</p>
        </div>
      )}
    </Modal>
  );
};