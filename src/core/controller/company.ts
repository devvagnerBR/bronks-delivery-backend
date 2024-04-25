import { env } from "@/env";
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

    async function authenticate( req: FastifyRequest, res: FastifyReply ) {

        const bodySchema = z.object( {
            email: z.string( { message: "campo obrigatório" } ).email().transform( v => v.toLowerCase() ),
            code: z.string( { message: "campo obrigatório" } )
        } );

        const body = bodySchema.safeParse( req.body );

        if ( !body.success ) return res.status( 400 ).send( body.error.format() );

        const companyExists = await company.authenticate( body.data.email, body.data.code );

        if ( !companyExists ) return res.status( 401 ).send( { message: 'Credenciais inválidas' } );

        const token = await res.jwtSign( {
            sub: companyExists.id
        }, { expiresIn: env.JWT_EXPIRES_IN } )

        return res.setCookie( 'token', token, {
            path: '/',
            httpOnly: true,
            secure: false, // setar para true em produção
            sameSite: true
        } ).status( 200 ).send( { message: 'Autenticado com sucesso' } );
    }

    async function addNewProduct( req: FastifyRequest, res: FastifyReply ) {

        const apiKeySchema = z.string( z.string() )
        const apiKey = apiKeySchema.safeParse( req.headers['api-key'] );

        if ( !apiKey.success ) return res.status( 400 ).send( { message: "api-key é obrigatório" } );

        const bodySchema = z.object( {
            name: z.string( { message: "campo obrigatório" } ).min( 3 ),
            description: z.string( { message: "campo obrigatório" } ).min( 3 ),
            price: z.number( { message: "campo obrigatório" } ).positive(),
            category: z.string( { message: "campo obrigatório" } ).min( 3 )
        } );

        const body = bodySchema.safeParse( req.body );
        if ( !body.success ) return res.status( 400 ).send( body.error.format() );

        const companyId = req.user.sub;
        if ( !companyId ) return res.status( 401 ).send( { message: 'Você não tem permissão para realizar essa ação' } );

        await company.addNewProduct( body.data, companyId );

        return res.status( 201 ).send( { message: 'Produto cadastrado com sucesso' } );

    }

    async function listProducts( req: FastifyRequest, res: FastifyReply ) {

        const companyId = req.user.sub;
        if ( !companyId ) return res.status( 401 ).send( { message: 'Você não tem permissão para realizar essa ação' } );

        const products = await company.listProducts( companyId );

        return res.status( 200 ).send( products );

    }


    async function getProductById( req: FastifyRequest, res: FastifyReply ) {

        const productIdSchema = z.object( { productId: z.string() } )
        const { productId } = productIdSchema.parse( req.params );

        const product = await company.getProductById( productId );

        return res.status( 200 ).send( product );
    }

    
    return {
        registerCompany,
        authenticate,
        addNewProduct,
        listProducts,
        getProductById
    }

}