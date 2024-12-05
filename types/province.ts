export interface Province {
  province_id: string;
  province: string;
}

export type Provinces = Province[];

export interface Status {
  code: number;
  description: string;
}

export interface ProvincesRes {
  rajaongkir: Rajaongkir;
}

export interface Rajaongkir {
  status: Status;
  results: Provinces;
}
