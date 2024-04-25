import { z } from "zod";
import 'dotenv/config'

const envSchema = z.object( {

    PORT: z.coerce.number().default( Number( process.env.PORT ) ),
    PASSWORD_LENGTH: z.coerce.number().default( Number( process.env.PASSWORD_LENGTH ) ),
    PASSWORD_CHARSET: z.string().default( process.env.PASSWORD_CHARSET! ),
    API_KEY_ADMIN: z.string().default( process.env.API_KEY_ADMIN! ),
    JWT_SECRET: z.string().default( process.env.JWT_SECRET! ),
    JWT_EXPIRES_IN: z.string().default( process.env.JWT_EXPIRES_IN! ),
} )

const _env = envSchema.safeParse( process.env )

if ( !_env.success ) {
    console.log( '❌ Invalid environment variables', _env.error.format() )
    throw new Error( 'Invalid environment variables' )
}
export const env = _env.data
