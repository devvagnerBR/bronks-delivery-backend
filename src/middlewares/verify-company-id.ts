import { COMPANY_DATABASE } from "@/core/database/company";
import { CustomError } from "@/entities/custom-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function verifyCompanyId( req: FastifyRequest, _: FastifyReply ) {

    const companyDatabase = new COMPANY_DATABASE();

    try {
        const apiKeySchema = z.string( z.string() );
        const apiKey = apiKeySchema.safeParse( req.headers['api-key'] );
        if ( !apiKey.success ) throw new CustomError( 400, 'Token de acesso é obrigatório' );

        const company = await companyDatabase.getCompanyById( apiKey.data );
        if ( !company ) throw new CustomError( 404, 'Empresa não encontrada' );


    } catch ( error ) {
        throw new CustomError( 401, 'Token de acesso inválido' )
    }

}