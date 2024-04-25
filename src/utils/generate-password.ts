import { env } from "../env"

export async function generatePassword() {
    let password = "";
    for ( let i = 0, n = env.PASSWORD_CHARSET.length; i < env.PASSWORD_LENGTH; ++i ) {
        password += env.PASSWORD_CHARSET[Math.floor( Math.random() * n )];
    }
    return password;
}