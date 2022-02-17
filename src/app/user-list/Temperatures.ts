
import { User } from "../models/User";
import { Support } from "./Support";

export interface Temperatures {
    data: User;
    page: number;
    per_page: number;
    support: Support;
    total: number;
    total_pages: number;
}