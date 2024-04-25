import { z } from "zod";
import 'dotenv/config'

const envSchema = z.object( {

    PORT: z.coerce.number().default( 3333 ),

} )

const _env = envSchema.safeParse( process.env )

if ( !_env.success ) {
    console.log( '❌ Invalid environment variables', _env.error.format() )
    throw new Error( 'Invalid environment variables' )
}
export const env = _env.data
