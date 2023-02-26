# A project for tracking tips as a delivery driver

Use the application to track tips and tours while you are working.

## Setup
For local usage run `npm run dev` to start the application.


### Environment Variables
To make API calls in the code, the environment variable `NEXT_PUBLIC_API_URL` is used. To use this variable, it must be defined first. The recommended way to define this variable is by creating a `.env.local` file in the root directory of the project. In this file, the following line of code needs to be added: `NEXT_PUBLIC_API_URL=http://localhost:3000/api/` (unless a different port is used). This will ensure that the `NEXT_PUBLIC_API_URL` variable is set to the correct value and can be used in the code to make API calls. The environment variable can also be used for deployment to Vercel - [more information](https://vercel.com/docs/concepts/projects/environment-variables).

### Databases
#### Firestore
By default **Firestore** will be used as datastorage. Create a firestore [here](https://firebase.google.com/) and add the credentials to the `.env.local` as follows: 

- API_KEY= *...*
- AUTH_DOMAIN= *...*
- DATABASE_URL= *...*
- PROJECT_ID= *...*
- STORAGE_BUCKET= *...*
- MESSAGING_SENDER_ID= *...*
- APP_ID= *...*

For deployment add the variables in Vercel accordingly.

#### Prisma
The project includes a Prisma schema. To use a local SQLite database, add a file called `trinkgeld.db` to the Prisma folder. For other databases supported by Prisma, create a file named `.env` with the connection credentials following the [tutorial]((https://www.prisma.io/docs/getting-started/quickstart), and then initialize the database by running `npx prisma migrate dev --name init`.

The API route `/api/workentries` is designed to handle Firebase usage, while the route `/api/entries` can be used with Prisma. If Prisma should be used, the routes will need to be adjusted accordingly in the client.

*This Readme.md was written with* _[Era.sh](https://era.sh/)_.
