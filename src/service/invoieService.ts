import type { ExchangeRate } from "../type.ts";
import { api } from "./api.ts";

export const getDefaultCurrencies = async () => {
    const data = await api.get<ExchangeRate[]>(`invoice/default-currencies`).json();
    return data;
}

