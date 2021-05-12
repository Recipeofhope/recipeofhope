const {
  loginUser,
  createUser,
  deleteUser,
  getUser,
  getAccessToken,
  logout,
  updateUser,
} = require('./user');

var router = require('express').Router();

router.put('/:id', (req, res) => {
  console.log(`Updating user with id ${req.params.id}`);
  return updateUser(req.params.id, req.body, req.decodedUser, res);
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

router.get('/user-details', function(req, res) {
  return getUser(req.decodedUser, res);
});

router.get('/access-token', function(req, res) {
  return getAccessToken(req.headers['x-refresh-token'], res);
});

router.post('/logout', async function(req, res) {
  return logout(req.headers['x-refresh-token'], res);
});

/**
 *  @swagger
 *  /login:
 *    post:
 *      summary: Logs in a user.
 *      description: Logs in the given user and returns an access token valid for 15 min, and a refresh token valid for 7 days.
 *      tags:
 *        - User
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                    example: tarunnurat
 *                  password:
 *                    type: string
 *                    format: password
 *                    example: password
 *      responses:
 *        '200':
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  access_token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlNjQ0Y2YxLTg3YzMtNDBhZi05YzMzLTYyNjZjY2U1MzlhZSIsImZpcnN0X25hbWUiOiJUYXJ1biAyIiwibGFzdF9uYW1lIjoiU2hhcm1hIiwidXNlcm5hbWUiOiJ0YXJ1bm51cmF0NCIsImFwcHJvdmVkIjpmYWxzZSwicGFzc3dvcmQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlszNiw1MCw5OCwzNiw0OSw1MCwzNiw4Miw1Myw1NCw3MCw2OSwxMTcsMTExLDg2LDEwMSwxMTYsMTE0LDQ3LDExMywxMTEsOTAsNjgsOTgsMTAxLDcwLDk4LDg3LDExNywxMDEsNjYsMTA3LDExMSw4Miw2OSwxMTcsMTA3LDY2LDg0LDUwLDcwLDQ5LDcyLDEwMSwxMTksNzYsMTIxLDkwLDExOSw3MCwxMTksMTAwLDgzLDgwLDEwNCwxMTcsNzQsNzIsNTQsNjddfSwicGhvbmVfbnVtYmVyIjoiMTIzNDU2Nzg5MCIsInVzZXJfdHlwZSI6IkFkbWluIiwiaWF0IjoxNjIwNDY3MDM5LCJleHAiOjE2MjA0Njc5Mzl9.Rccx_e67Ki2ExF3Pa5KZfTyyd74fBZvyJ-2dP6AA7XI
 *                  refresh_token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlNjQ0Y2YxLTg3YzMtNDbhZi05YzMzLTYyNjZjY2U1MzlhZSIsImZpcnN0X25hbWUiOiJUYXJ1biAyIiwibGFzdF9uYW1lIjoiU2hhcm1hIiwidXNlcm5hbWUiOiJ0YXJ1bm51cmF0NCIsImFwcHJvdmVkIjpmYWxzZSwicGFzc3dvcmQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlszNiw1MCw5OCwzNiw0OSw1MCwzNiw4Miw1Myw1NCw3MCw2OSwxMTcsMTExLDg2LDEwMSwxMTYsMTE0LDQ3LDExMywxMTEsOTAsNjgsOTgsMTAxLDcwLDk4LDg3LDExNywxMDEsNjYsMTA3LDExMSw4Miw2OSwxMTcsMTA3LDY2LDg0LDUwLDcwLDQ5LDcyLDEwMSwxMTksNzYsMTIxLDkwLDExOSw3MCwxMTksMTAwLDgzLDgwLDEwNCwxMTcsNzQsNzIsNTQsNjddfSwicGhvbmVfbnVtYmVyIjoiMTIzNDU2Nzg5MCIsInVzZXJfdHlwZSI6IkFkbWluIiwiaWF0IjoxNjIwNDY3MDM5LCJleHAiOjE2MjEwNzE4Mzl9.WywCKkOsag6cNobWwxhM8gqRhEKczHNDK_onOXqnUu4
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Username 'tarunnurat' not found.
 */
// Login a user.
router.post('/login', async function(req, res) {
  return loginUser(req.body, res);
});

/**
 *  @swagger
 *  /{id}:
 *    delete:
 *      summary: Deletes a user.
 *      description: Deletes the given user and returns their id. Only admins can delete other users.
 *      tags:
 *        - User
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: JWT access token to authenticate the user.
 *      - in: path
 *        name: id
 *        schema:
 *          type: uuid
 *        required: true
 *        description: id of the user to be deleted.
 *      responses:
 *        '200':
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
 *                    example: Only Admins can delete other users..
 */
router.delete('/:id', function(req, res) {
  console.log('reached delete user/:id with id: ' + req.params.id);
  return deleteUser(req.params.id, req.decodedUser, res);
});

module.exports = router;
