export interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export type Cities = City[];

export interface Status {
  code: number;
  description: string;
}

export interface CitiesReqParams {
  province: string;
}

export interface CitiesRes {
  rajaongkir: Rajaongkir;
}

export interface Rajaongkir {
  status: Status;
  results: Cities;
}
