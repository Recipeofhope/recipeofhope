const { loginUser, createUser } = require('./user');

var router = require('express').Router();

router.get('/:id', function(req, res) {
  console.log('reached get user/:id with id: ' + req.params.id);
});

router.put('/:id', function(req, res) {
  console.log('reached put user/:id with id: ' + req.params.id);
});

router.delete('/:id', function(req, res) {
  console.log('reached delete user/:id with id: ' + req.params.id);
});

/**
 *  @swagger
 *  /:
 *    post:
 *      summary: Create a user.
 *      description: Creates the given user. A user can be of type Cook, Patient, Admin.
 *      tags:
 *        - User
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  first_name:
 *                    type: string
 *                    example: Tarun
 *                  last_name:
 *                    type: string
 *                    example: Sharma
 *                  username:
 *                    type: string
 *                    example: tarunnurat
 *                  approved:
 *                    type: boolean
 *                    example: false
 *                  password:
 *                    type: string
 *                    format: password
 *                    example: password
 *                  phone_number:
 *                    type: string
 *                    example: 9876543210
 *                  user_type:
 *                    type: string
 *                    enum:
 *                      - Cook
 *                      - Patient
 *                      - Admin
 *                    example: Patient
 *      responses:
 *        '201':
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: d2c5d53d-c98d-4be4-800b-a3c19708337a
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Username 'tarunnurat' already exists. Please choose another username.
 */
router.post('/', async function(req, res) {
  return createUser(req.body, res);
});

// Login a user.
router.post('/login', async function(req, res) {
  return loginUser(req.body, res);
});

module.exports = router;
