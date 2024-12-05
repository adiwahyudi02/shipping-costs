export interface CostBodyReq {
  origin: string;
  destination: string;
  weight: string;
  courier: string;
}

export interface CostRes {
  rajaongkir: Rajaongkir;
}

export interface Rajaongkir {
  query: CostBodyReq;
  status: Status;
  origin_details: OriginDetails;
  destination_details: DestinationDetails;
  results: CheckResults;
}

export interface Status {
  code: number;
  description: string;
}

export interface OriginDetails {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export interface DestinationDetails {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export interface CheckResult {
  code: string;
  name: string;
  costs: Couriers;
}

export interface Courier {
  service: string;
  description: string;
  cost: Costs;
}

export interface Cost {
  value: number;
  etd: string;
  note: string;
}

export type Costs = Cost[];
export type Couriers = Courier[];
export type CheckResults = CheckResult[];
