import { companyFactory } from "@/factories/company";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function COMPANY_CONTROLLER() {

    const company = await companyFactory();

    async function registerCompany( req: FastifyRequest, res: FastifyReply ) {

        const apiKeySchema = z.string( z.string( { required_error: "api-key é obrigatório" } ) )
        const apiKey = apiKeySchema.safeParse( req.headers['api-key'] );

        if ( apiKey.data !== process.env.API_KEY_ADMIN ) return res.status( 401 ).send( { message: "você não tem permissão para realizar essa ação" } )

        if ( !apiKey.success ) return res.status( 400 ).send( { message: "api-key é obrigatório" } )

        const bodySchema = z.object( {
            companyName: z.string( { message: "campo obrigatório" } ).min( 3 ),
            email: z.string( { message: "campo obrigatório" } ).email().transform( v => v.toLowerCase() ),
            phone: z.string( { message: "campo obrigatório" } ),
            ownerName: z.string( { message: "campo obrigatório" } ).min( 3 )
        } );

        const body = bodySchema.safeParse( req.body );

        if ( !body.success ) return res.status( 400 ).send( body.error.format() );

        await company.registerCompany( {
            companyName: body.data.companyName,
            email: body.data.email,
            phone: body.data.phone,
            ownerName: body.data.ownerName
        } );

        return res.status( 201 ).send( { message: 'Empresa registrada com sucesso' } );
    }


    return {
        registerCompany
    }

}