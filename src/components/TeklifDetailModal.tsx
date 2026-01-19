
import { Modal } from "antd";
import type { Teklif } from "../types/Teklif";

interface TeklifDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  teklif: Teklif | null;
}

export const TeklifDetailModal = ({ isOpen, onClose, teklif }: TeklifDetailModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null} // Alt kısımdaki butonları kaldırdık
      title="Teklif Detayı"
    >
      {teklif && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
          <p><b>Teklif No:</b> {teklif.id}</p>
          <p><b>Müşteri:</b> {teklif.musteri}</p>
          <p><b>Tutar:</b> {teklif.tutar}</p>
          <p><b>Durum:</b> {teklif.durum}</p>
        </div>
      )}
    </Modal>
  );
};