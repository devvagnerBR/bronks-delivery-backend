import { companyFactory } from "@/factories/company";

export async function COMPANY_CONTROLLER() {

    const company = await companyFactory();

}