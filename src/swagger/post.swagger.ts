/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: API for managing weblog posts
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        title:
 *          type: string
 *          example: Post Title
 *        content:
 *          type: string
 *          example: Post content
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: '2023-10-05T14:30:00.000Z'
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: '2023-10-05T14:30:00.000Z'
 *    CreatePost:
 *      type: object
 *      required: 
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *          example: New post title
 *        content:
 *          type: string
 *          example: New post content
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: message error desc
 */


/**
 * @swagger
 * /api/posts:
 *  get:
 *    summary: Retrieve all posts
 *    description: Get a list of all blog posts
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: API for managing weblog posts
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        title:
 *          type: string
 *          example: Post Title
 *        content:
 *          type: string
 *          example: Post content
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: '2023-10-05T14:30:00.000Z'
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: '2023-10-05T14:30:00.000Z'
 *    CreatePost:
 *      type: object
 *      required:
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *          example: New Post Title
 *        content:
 *          type: string
 *          example: New post content
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: message error desc
 */

/**
 * @swagger
 * /api/posts:
 *  get:
 *    summary: Retrieve all posts  # ✅ تصحیح: summery -> summary
 *    description: Get a list of all blog posts
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    summary: Get a post by ID
 *    description: Retrieve a specific post by its ID
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      200:
 *        description: Post found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: Post not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/posts:
 *  post:
 *    summary: Create a new post
 *    description: Create a new blog post
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatePost'
 *    responses:
 *      201:
 *        description: Post created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      400:
 *        description: Validation error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *  put:
 *    summary: Update a post
 *    description: Update an existing post
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        example: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatePost'
 *    responses:
 *      200:
 *        description: Post updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: Post not found
 */

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *    summary: Delete a post
 *    description: Delete a post by ID
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      200:
 *        description: Post deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: post deleted successfully
 *                post:
 *                  $ref: '#/components/schemas/Post'
 *      404:
 *        description: Post not found
 */
