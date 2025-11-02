/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for managing weblog users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         fullname:
 *           type: string
 *           description: User's full name
 *           maxLength: 255
 *         email:
 *           type: string
 *           description: User's email address
 *           format: email
 *           maxLength: 255
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: User last update timestamp
 *       example:
 *         id: 1
 *         fullname: John Doe
 *         email: john.doe@example.com
 *         createdAt: 2023-10-01T12:00:00.000Z
 *         updatedAt: 2023-10-01T12:00:00.000Z
 * 
 *     RegisterUser:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         fullname:
 *           type: string
 *           description: User's full name
 *           maxLength: 255
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User's email address
 *           format: email
 *           maxLength: 255
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           minLength: 6
 *           maxLength: 255
 *           example: password123
 * 
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: password123
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: JWT authentication token
 *       example:
 *         message: User created successfully
 *         user:
 *           id: 1
 *           fullname: John Doe
 *           email: john.doe@example.com
 *           createdAt: 2023-10-01T12:00:00.000Z
 *           updatedAt: 2023-10-01T12:00:00.000Z
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         message: User already exists
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
