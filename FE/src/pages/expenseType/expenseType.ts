export interface ExpenseType {
    id: number;
    name: string;
    deleted: boolean;
}

export interface ExpenseTypesResponse {
    expenseTypes: ExpenseType[];
}
