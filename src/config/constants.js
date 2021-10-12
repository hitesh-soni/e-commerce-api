import fs from 'fs';

export default {
    requestLimit: 100, // limit each IP to 100 requests per windowMs
    blockRequest: 15 * 60 * 1000, // 15 minutes
    hashCount: 1, // Increase for better security but it will take more time to verify
    responseCode: {
        200: 200, // OK
        201: 201, // Created
        204: 204, // No Content
        304: 304, // Content Not Modified
        400: 400, // Bad Request
        401: 401, // Unauthorized
        403: 403, // Forbidden
        404: 404, // Not Found
        409: 409, // Conflict
        422: 422, // Validation Errors
        500: 500, // Internal Server Error
    },
    messages: {
        loginMessage: 'User successfully logged in.',
        tokenExpired: 'Token is invalid or expired',
        invalidRefreshToken: 'Invalid refresh token',
        pageNotFound:
            'The page or data you are requesting is not available on this server.',
        internalServerError: 'Internal server error please try after sometime',
        unauthorizedAccess: 'Unauthorized access to this module',
        validations: {
            singleEmailAllowed: 'This email id is already registeded ',
            loginError: 'Email or password not matched',
            invalidParentID: 'Invalid parent id',
            invalidCategory: 'Invalid category',
            invalidProduct: 'Invaid product',
            invalidObjectID: 'Invalid Object id',
        },
    },
    keys: {
        publicKEY: fs.readFileSync('./keys/public.pem', 'utf8'),
        privateKEY: fs.readFileSync('./keys/private.pem', 'utf8'),
    },
    authConfig: {
        expiresIn: '1h',
        algorithm: 'RS256',
        issuer: 'NodeES6 Demo',
    },
    refreshTokenAuthConfig: {
        expiresIn: '30d',
        algorithm: 'RS256',
        issuer: 'NodeES6 Demo',
    },
    path: {
        imagePath: 'public/images',
    },
};
