import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const users = client.db("project_db").collection("users");
        const user = await users.findOne({ email: credentials?.email });
        console.log("Found user:", user);
        console.log("Password match:", user?.password === credentials?.password);

        // Simple check for speed (use bcrypt for production)
        if (user && user.password === credentials?.password) {
          return { id: user._id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  },
  pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };