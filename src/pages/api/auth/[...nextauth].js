import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongoose"; // Replace this with your MongoDB client export

// import Providers from "next-auth/providers";

export const authOptions = {
  strategy: "database",
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     const email = user.email;
  //     const name = user.name;
  //     const image = user.image;
  //     const provider = account.provider;
  //     const providerId = profile.id;

  //     const existingUser = await User.findOne({ email });

  //     if (existingUser) {
  //       existingUser.name = name;
  //       existingUser.image = image;
  //       existingUser.provider = provider;
  //       existingUser.providerId = providerId;
  //       await existingUser.save();
  //       return Promise.resolve(true);
  //     }

  //     const newUser = await User.create({
  //       name,
  //       email,
  //       image,
  //       provider,
  //       providerId,
  //       favorites: [],
  //     });

  //     if (newUser) {
  //       return Promise.resolve(true);
  //     } else {
  //       return Promise.resolve(false);
  //     }
  //   },
  // },
  // database: process.env.MONGODB_URI,
};

export default NextAuth(authOptions);
