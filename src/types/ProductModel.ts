export interface ProductModel {
  Sno: number;
  impurityName: string;
  casNo: string;
  readyStock: string | null;
  parentAPI: string;
  leadTime: string;
  productStatus: string | null;
  category: string[];
  productImage: string;
  synonym: string | null;
  molecularFormula: string;
  molecularWeight: number;
  catlogNumber: string | null;
  desc: string | null;
  productImageLarge: string | null;
}
