import { COMPANY_BUSINESS } from "@/core/business/company";
import { COMPANY_DATABASE } from "@/core/database/company";

export async function companyFactory() {

    const database = new COMPANY_DATABASE();
    const business = new COMPANY_BUSINESS( database );
    return business;

}