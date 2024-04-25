import { COMPANY_CONTROLLER } from '@/core/controller/company';
import { verifyCompanyId } from '@/middlewares/verify-company-id';
import { FastifyInstance } from 'fastify';

export async function companyRouter( app: FastifyInstance ) {

    const company = await COMPANY_CONTROLLER();


    //sessions
    app.post( '/company/create', company.registerCompany );
    app.post( '/company/authenticate', company.authenticate );

    //products
    app.post( '/company/product/new', { onRequest: [verifyCompanyId] }, company.addNewProduct );
    app.get( '/company/product/list', { onRequest: [verifyCompanyId] }, company.listProducts );
    app.get( '/company/product/:productId', { onRequest: [verifyCompanyId] }, company.getProductById );

}