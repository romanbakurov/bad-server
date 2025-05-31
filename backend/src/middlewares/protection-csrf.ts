import { doubleCsrf, DoubleCsrfConfigOptions } from 'csrf-csrf'
import  { Request } from 'express';
import { CSRF_SECRET, CSRF_COOKIE_NAME } from '../config'

export const doubleCsrfConfigOptions: DoubleCsrfConfigOptions = {
    getSecret: () => CSRF_SECRET,
    getSessionIdentifier: (req: Request) => req.headers['x-csrf-token']?.toString() || 'anonymous',
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: {
        sameSite: 'strict',
        path: '/',
        secure: process.env.MODE === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    },
}

export const { doubleCsrfProtection, invalidCsrfTokenError, generateCsrfToken } =
    doubleCsrf(doubleCsrfConfigOptions)
