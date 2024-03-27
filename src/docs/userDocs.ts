
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
 

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */
 




