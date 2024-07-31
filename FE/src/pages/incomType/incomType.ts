export interface IncomeType {
    id: number;
    name: string;
    deleted: boolean;
  }
  
  export interface IncomeTypesResponse {
    incomeTypes: IncomeType[];
  }
  