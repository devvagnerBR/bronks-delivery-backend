import fastify from "fastify";
import cors from '@fastify/cors'
import { CustomError } from "./entities/custom-error";
import { ZodError } from "zod";
import { companyRouter } from "./routes/company";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";


export const app = fastify();

app.register( cors, {
    origin: '*',
    credentials: true
} )


app.register( fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'token',
        signed: false
    },
    sign: {
        expiresIn: env.JWT_EXPIRES_IN
    }
} )


app.register( companyRouter );
app.register( fastifyCookie )

app.setErrorHandler( ( error, _, res ) => {

    if ( error instanceof ZodError ) {

        return res
            .status( 400 )
            .send( { message: error.format() } );
    } else if ( error instanceof CustomError ) {
        res.status( error.statusCode ).send( {
            statusCode: error.statusCode,
            message: error.message
        } );
    } else {

    }

    return res.status( 500 ).send( { message: error.message } );
} )