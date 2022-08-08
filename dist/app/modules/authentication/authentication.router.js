"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const controller = __importStar(require("./authentication.controller"));
const router = (0, express_1.Router)();
/**
 * Register new user.
 *
 * @openapi
 *
 * /authentication/register:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Sign up"
 *     description: "Adds a new user account and sends a confirmation email"
 *     requestBody:
 *       description: "Sign up user"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - "email"
 *               - "password"
 *               - "firstName"
 *               - "lastName"
 *               - "redirectUrl"
 *             properties:
 *               email:
 *                 type: "string"
 *                 format: "email"
 *               password:
 *                 type: "string"
 *                 format: "password"
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *               phoneNumber:
 *                 type: "string"
 *               redirectUrl:
 *                 type: "string"
 *                 format: "uri"
 *     responses:
 *       "204":
 *         description: "User created successfully"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "422":
 *         description: "Unprocessable entity"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               emailExists:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Unprocessable Entity
 *                   message: Your request was understood but could not be completed due to semantic errors
 *                   details: An account with the given email already exists
 *                   summary: Email exists
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.post('/register', controller.registerUser);
/**
 * Resend confirmation email.
 *
 * @openapi
 *
 * /authentication/resend-confirmation-email:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Resend confirmation email"
 *     description: "Resends a confirmation email to the given email address"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "email"
 *               - "redirectUrl"
 *             properties:
 *               email:
 *                 type: "string"
 *                 format: "email"
 *               redirectUrl:
 *                 type: "string"
 *                 format: "uri"
 *     responses:
 *       "204":
 *         description: "Email sent successfully"
 *       "404":
 *         description: "Not Found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               emailExists:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Not Found
 *                   message: The requested item was not found
 *                   details: The requested user does not exist, or the account is already confirmed
 *                   summary: User not found or account confirmed
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.post('/resend-confirmation-email', controller.resendConfirmationEmail);
/**
 * Confirm account.
 *
 * @openapi
 *
 * /authentication/confirmation:
 *   put:
 *     tags:
 *       - "Authentication"
 *     summary: "Confirm account"
 *     description: "Sets user confirmation level to 'confirmed'"
 *     parameters:
 *       - name: "token"
 *         in: "query"
 *         description: "User confiramation token"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       "204":
 *         description: "Account confirmed successfully"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "404":
 *         description: "Not Found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               emailExists:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Not Found
 *                   message: The requested item was not found
 *                   details: The requested user does not exist, or the account is already confirmed
 *                   summary: User not found or account confirmed
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.put('/confirmation', controller.confirmAccount);
/**
 * Login user.
 *
 * @openapi
 *
 * /authentication/login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Log in"
 *     description: "Authenticate with email and password"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "email"
 *               - "password"
 *             properties:
 *               email:
 *                 type: "string"
 *                 format: "email"
 *               password:
 *                 type: "string"
 *                 format: "password"
 *     responses:
 *       "200":
 *         description: "User authenticated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: "#/components/schemas/User"
 *               properties:
 *                 token:
 *                   type: string
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         description: Not Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               userNotFound:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Not Authenticated
 *                   message: Missing authentication or invalid credentials
 *                   details: The requested user does not exist in our database
 *                 summary: User not found
 *               invalidPassword:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Not Authenticated
 *                   message: Missing authentication or invalid credentials
 *                   details: The provided password is incorrect
 *                 summary: Invalid password
 *               notConfirmed:
 *                 value:
 *                   code: ckgjkxvgl000431pp4xlpew2g
 *                   name: Not Authenticated
 *                   message: Missing authentication or invalid credentials
 *                   details: Your account is not confirmed
 *                 summary: Account not confirmed
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.post('/login', controller.logIn);
/**
 * Request new password.
 *
 * @openapi
 *
 * /authentication/request-new-password:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Request new password"
 *     description: "Sends an email with the reset password instructions"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "email"
 *               - "redirectUrl"
 *             properties:
 *               email:
 *                 type: "string"
 *                 format: "email"
 *               redirectUrl:
 *                 type: "string"
 *                 format: "uri"
 *     responses:
 *       "204":
 *         description: "Email sent successfully"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "404":
 *         description: "Not Found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               userNotFound:
 *                 $ref: "#/components/examples/UserNotFound"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.post('/request-new-password', controller.requestNewPassword);
/**
 * Reset password.
 *
 * @openapi
 *
 * /authentication/password:
 *   put:
 *     tags:
 *       - "Authentication"
 *     summary: "Reset password"
 *     description: "Reset the user password"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "token"
 *               - "password"
 *             properties:
 *               token:
 *                 type: "string"
 *               password:
 *                 type: "string"
 *     responses:
 *       "204":
 *         description: "Password updated successfully"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "404":
 *         description: "Not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               userNotFound:
 *                 $ref: "#/components/examples/UserNotFound"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.put('/password', controller.resetPassword);
/**
 * Initialize two factor authentication.
 *
 * @openapi
 *
 * /authentication/two-factor-auth/initialization:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       -  "Authentication"
 *     summary: "Initialize two-factor authentication"
 *     description: "Generates a QR code and returns it to the client."
 *     responses:
 *       "200":
 *         description: "QR code generated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               description: "Base64 representation of the QR code"
 *               type: string
 *               format: base64
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         description: "Not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               userNotFound:
 *                 $ref: "#/components/examples/UserNotFound"
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.put('/two-factor-auth/initialization', passport_1.default.authenticate('jwt', { session: false }), controller.initTwoFactorAuthentication);
/**
 * Activate two factor authentication.
 *
 * @openapi
 *
 * /authentication/two-factor-auth/activation:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       -  "Authentication"
 *     summary: "Activate two-factor authentication"
 *     description: "Receives a token from the user and validates it. If the token is valid, the two-factor authentication becomes active."
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - "token"
 *             properties:
 *               token:
 *                 description: Token generated from a third party app (e.g. Google Authenticator)
 *                 type: string
 *     responses:
 *       "204":
 *         description: "Two-factor-authentication activated successfully"
 *       "400":
 *         $ref: "#/components/responses/400"
 *       "401":
 *         $ref: "#/components/responses/401"
 *       "404":
 *         description: "Not found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               userNotFound:
 *                 $ref: "#/components/examples/UserNotFound"
 *       "422":
 *         description: Unprocessable Entity
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               examples:
 *                 noTwoFactorAuth:
 *                   value:
 *                     code: ckgjkxvgl000431pp4xlpew2g
 *                     name: Unprocessable Entity
 *                     message: Your request was understood but could not be completed due to semantic errors
 *                     details: Two-factor authentication is not enabled for your account
 *                   summary: No two-factor-auth enabled
 *                 invalidToken:
 *                   value:
 *                     code: ckgjkxvgl000431pp4xlpew2g
 *                     name: Unprocessable Entity
 *                     message: Your request was understood but could not be completed due to semantic errors
 *                     details: The provided token is not valid
 *                   summary: Invalid token
 *       "500":
 *         $ref: "#/components/responses/500"
 */
router.put('/two-factor-auth/activation', passport_1.default.authenticate('jwt', { session: false }), controller.completeTwoFactorAuthentication);
/**
 * Verificate two factor authentication.
 *
 * @openapi
 *
 * /authentication/two-factor-auth/verification:
 *   head:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       -  "Authentication"
 *     summary: "verify two-factor authentication"
 *     description: "Receives a token from the user and validates it."
 *     parameters:
 *       - in: "query"
 *         name: "token"
 *         description: "Token generated from a third party app (e.g. Google Authenticator)"
 *         required: true
 *         schema:
 *           type: "string"
 *     responses:
 *       "200":
 *         description: "Token is valid"
 *       "400":
 *         description: "Bad request"
 *       "401":
 *         description: "Not Authenticated"
 *       "404":
 *         description: "Not found"
 *       "422":
 *         description: "Unprocessable Entity"
 *       "500":
 *         description: "Internal Server Error"
 */
router.head('/two-factor-auth/verification', passport_1.default.authenticate('jwt', { session: false }), controller.verifyTwoFactorAuthToken);
exports.default = router;
