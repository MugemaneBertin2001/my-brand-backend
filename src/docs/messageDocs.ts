
/**
 * @swagger
 * /message:
 *   post:
 *     summary: Create a new message
 *     description: Endpoint to create a new message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       '201':
 *         description: Message created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Get all messages
 *     description: Endpoint to retrieve all messages.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all messages
 *       '401':
 *         description: Unauthorized - user not authenticated
 *       '403':
 *         description: Forbidden - insufficient permissions
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Endpoint to delete a message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the message to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '400':
 *         description: Invalid message ID
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */