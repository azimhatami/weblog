/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API for managing post likes with authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 123
 *         postId:
 *           type: integer
 *           example: 456
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 * 
 *     LikeResponse:
 *       type: object
 *       properties:
 *         action:
 *           type: string
 *           enum: [liked, unliked]
 *           example: "liked"
 *         likeCount:
 *           type: integer
 *           example: 15
 *         postId:
 *           type: integer
 *           example: 456
 * 
 *     LikeStatusResponse:
 *       type: object
 *       properties:
 *         postId:
 *           type: integer
 *           example: 456
 *         likeCount:
 *           type: integer
 *           example: 15
 *         isLiked:
 *           type: boolean
 *           example: true
 * 
 *     UserLikedPost:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         post:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 456
 *             title:
 *               type: string
 *               example: "Post Title"
 *             content:
 *               type: string
 *               example: "Post content here"
 *             author:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 fullname:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Error message here"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/likes/{postId}/toggle:
 *   post:
 *     summary: Toggle like/unlike on a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to like/unlike
 *         example: 456
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LikeResponse'
 *       400:
 *         description: Invalid post ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/likes/{postId}:
 *   get:
 *     summary: Get like count and user's like status for a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to check likes
 *         example: 456
 *     responses:
 *       200:
 *         description: Like information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LikeStatusResponse'
 *       400:
 *         description: Invalid post ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/likes/users/me:
 *   get:
 *     summary: Get all posts liked by the current user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's liked posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likedPosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserLikedPost'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
