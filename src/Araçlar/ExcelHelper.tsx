import * as XLSX from "xlsx";

export const exportToExcel = (
  data: unknown[],
  fileName: string,
  sheetName: string = "Sayfa1"
) => {
  // JSON veriyi Excel sayfasına çeviriyor
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Yeni bir Excel dosyası oluşturuyor
  const workbook = XLSX.utils.book_new();

  // Sayfayı dosyaya ekliyor
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Dosyayı indiriyor
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
