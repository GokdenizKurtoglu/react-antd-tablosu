export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "Admin" | "User";
  isActive: boolean;
  gender:"male"|"female";
  ages:number;
  city: string;
  departman: string;
  çalışmaDurumu:"full-time"|"stajyer";
  kullanınlanIzin:number;
}
