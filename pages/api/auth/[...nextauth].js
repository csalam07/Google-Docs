import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../../../lib/firebase";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(db),
});
