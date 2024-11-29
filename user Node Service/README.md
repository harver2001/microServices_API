# OTP Generate, Verify and User Login/Signup

This is a user service application built using Node.js. It provides functionality to generate and send OTPs via email, verify them and login/signup users.

## Configuration

Before running the application, you need to set up some configuration variables. Copy the `.env.example` file and rename it to `.env`. Then, update the variables with your own values:

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The URI for your MongoDB database.
- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port.
- `SMTP_USER`: SMTP username (usually your email address).
- `SMTP_PASS`: SMTP password.
- `FROM_EMAIL`: Email address from which the OTP emails will be sent.
- `JWT_SECRET`: Secret key for JWT token generation.

## Usage

To start the server in development mode with automatic reloading:

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

## Endpoints

- `POST /generate-otp`: Generates and sends an OTP to the provided email address.

  - Request Body:

    ```json
    {
      "email": "recipient@example.com"
    }
    ```

- `POST /verify-otp`: Verifies the provided OTP.

  - Request Body:

    ```json
    {
      "email": "recipient@example.com",
      "otp": "123456"
    }
    ```
## Protocol Used
- SMTP (Simple Mail Transfer Protocol)

## Service
- Gmail 

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Nodemailer
- Randomstring
- Dotenv

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
