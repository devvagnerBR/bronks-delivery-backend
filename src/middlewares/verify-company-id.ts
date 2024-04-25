import { COMPANY_DATABASE } from "@/core/database/company";
import { CustomError } from "@/entities/custom-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyCompanyId( req: FastifyRequest, _: FastifyReply ) {

    const companyDatabase = new COMPANY_DATABASE();

    try {

        const companyExists = await req.jwtVerify() as { sub: string };

        const company = await companyDatabase.getCompanyById( companyExists.sub );
        if ( !company ) throw new CustomError( 404, 'Empresa não encontrada' );

    } catch ( error ) {

        throw new CustomError( 401, 'Token de acesso inválido' )
    }

}