/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Endpoint to create a new blog post.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Blog post created successfully
 *       '401':
 *         description: Unauthorized - user not authenticated or not authorized
 *       '500':
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all blog posts
 *     description: Endpoint to retrieve all blog posts.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all blog posts
 *       '500':
 *         description: Internal server error
 */

// Other endpoints omitted for brevity

/**
 * @swagger
 * /blogs/{blogId}/likes:
 *   get:
 *     summary: Get likes by blog ID
 *     description: Endpoint to retrieve likes for a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to retrieve likes for
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved likes for the blog post
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{blogId}/like:
 *   post:
 *     summary: Like a blog post
 *     description: Endpoint to like a specific blog post.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to like
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Blog post liked successfully
 *       '401':
 *         description: Unauthorized - user not authenticated
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /blogs/{blogId}/unlike:
 *   post:
 *     summary: Unlike a blog post
 *     description: Endpoint to unlike a specific blog post.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to unlike
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Like removed successfully
 *       '401':
 *         description: Unauthorized - user not authenticated
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /blogs/{blogId}/comment:
 *   get:
 *     summary: Get comments by blog ID
 *     description: Endpoint to retrieve comments for a specific blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to retrieve comments for
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved comments for the blog post
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a comment to a blog post
 *     description: Endpoint to add a comment to a specific blog post.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment to add to the blog post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Comment added successfully
 *       '401':
 *         description: Unauthorized - user not authenticated
 *       '500':
 *         description: Internal server error
 */
