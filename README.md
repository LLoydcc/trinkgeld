# A project for tracking tips as a delivery driver

Run `npm run dev` to start the application. 

There are multiple ways to use different databases. 
The default connection is **aws-firestore**. It will be necessary to add a personal configuration at `/firebase/config.js`. To use a **prisma** database add either a `trinkgeld.db` to `/prisma` or add a `.env` file and connect to a prisma supported database of choice - [follow tutorial here](https://www.prisma.io/docs/getting-started/quickstart).  
