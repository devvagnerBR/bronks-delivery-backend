import { PRISMA } from "@/data-providers/prisma";
import { Prisma } from "@prisma/client";

export class COMPANY_DATABASE {

    async registerCompany( { companyName, ownerName, email, phone, code }: Prisma.CompanyCreateInput ) {
        await PRISMA.company.create( {
            data: { companyName, ownerName, email, phone, code }
        } );
    }

    async getCompanyByName( companyName: string ) {
        return await PRISMA.company.findFirst( {
            where: { companyName }
        } );
    }

    async getCompanyById( id: string ) {
        return await PRISMA.company.findFirst( {
            where: { id }
        } );
    }

    async getCompanyByPhone( phone: string ) {
        return await PRISMA.company.findFirst( {
            where: { phone }
        } );
    }

    async getCompanyByEmail( email: string ) {
        return await PRISMA.company.findFirst( {
            where: { email }
        } );
    }

}