import { PRISMA } from "@/data-providers/prisma";
import { Prisma } from "@prisma/client";

export class COMPANY_DATABASE {

    //queries company

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

    //queries product

    async getProductByName( name: string ) {
        return await PRISMA.product.findFirst( {
            where: { name }
        } );
    }

    //endpoints

    async registerCompany( { companyName, ownerName, email, phone, code }: Prisma.CompanyCreateInput ) {
        await PRISMA.company.create( {
            data: { companyName, ownerName, email, phone, code }
        } );
    }

    async authenticate( email: string, code: string ) {
        return await PRISMA.company.findFirst( {
            where: { email, code }
        } );
    }

    async addNewProduct( body: Prisma.ProductCreateWithoutCompanyInput, companyId: string ) {
        await PRISMA.product.create( {
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                slug: body.slug,
                category: body.category,
                companyId
            }
        } );
    }

    async listProducts( companyId: string ) {
        return await PRISMA.product.findMany( {
            where: { companyId },
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                description: true,
                category: true,
                image: true,
                isAvailable: true,
                createdAt: true,
            }
        } );
    }

    async getProductById( id: string ) {
        return await PRISMA.product.findFirst( {
            where: { id}
        } );
    }



}