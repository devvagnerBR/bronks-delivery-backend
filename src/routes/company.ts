import { COMPANY_CONTROLLER } from '@/core/controller/company';
import { FastifyInstance } from 'fastify';

export async function companyRouter( app: FastifyInstance ) {

    const company = await COMPANY_CONTROLLER();

    app.post( '/company/create', company.registerCompany );

}