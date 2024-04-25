import { Prisma } from "@prisma/client";
import { COMPANY_DATABASE } from "../database/company";
import { CustomError } from "@/entities/custom-error";
import { generatePassword } from "@/utils/generate-password";

export class COMPANY_BUSINESS {

    constructor(
        private companyDatabase: COMPANY_DATABASE
    ) { }

    async registerCompany( { companyName, email, phone, ownerName }: Omit<Prisma.CompanyCreateInput, 'code'> ) {

        const companyNameExists = await this.companyDatabase.getCompanyByName( companyName );
        if ( companyNameExists ) throw new CustomError( 409, 'Já existe uma empresa com esse nome', );

        const companyEmailExists = await this.companyDatabase.getCompanyByEmail( email );
        if ( companyEmailExists ) throw new CustomError( 409, 'Já existe uma empresa cadastrada com esse email', );

        const companyPhoneExists = await this.companyDatabase.getCompanyByPhone( phone );
        if ( companyPhoneExists ) throw new CustomError( 409, 'Já existe uma empresa cadastrada com esse telefone', );

        const code = await generatePassword();

        await this.companyDatabase.registerCompany( { companyName, email, phone, ownerName, code } );

    }

}