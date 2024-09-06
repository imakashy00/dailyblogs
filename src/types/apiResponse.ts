import { Journal } from "@/model/userModel";
export interface ApiResponse {
    success: boolean;
    message: string;
    Journals?: Journal[];
    Journal?: Journal;

}
