import { COMPANY_CONTROLLER } from '@/core/controller/company';
import { FastifyInstance } from 'fastify';

export async function companyRouter( app: FastifyInstance ) {

    const company = COMPANY_CONTROLLER();

}