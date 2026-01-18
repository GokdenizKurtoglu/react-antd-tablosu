
export interface Teklif {
  key: string;      
  id: string;    
  musteri: string;  
  tutar: string;   
  durum: "Onaylandı" | "Bekliyor" | "Reddedildi"; 
};