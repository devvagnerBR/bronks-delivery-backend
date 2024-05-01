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

    async authenticate( email: string, code: string ) {

        return await this.companyDatabase.authenticate( email, code );
    }

    async addNewProduct( data: { name: string, description: string, priceP: number, priceM: number, priceG: number, category: string }, companyId: string ) {

        const nameExists = await this.companyDatabase.getProductByName( data.name );
        if ( nameExists ) throw new CustomError( 409, 'Já existe um produto com esse nome' );

        const slug = data.name.toLowerCase().replace( /\s/g, '-' );

        const body = {
            name: data.name,
            description: data.description,
            priceP: data.priceP,
            priceM: data.priceM,
            priceG: data.priceG,
            category: data.category,
            slug
        }



        await this.companyDatabase.addNewProduct( body, companyId );

    }

    async listProducts( companyId: string ) {
        return await this.companyDatabase.listProducts( companyId );
    }

    async getProductById( id: string ) {

        const product = await this.companyDatabase.getProductById( id );

        if ( !product ) throw new CustomError( 404, 'Produto não encontrado' );

        return product;
    }
}