import { signOut, useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Layout from "@/components/Layout";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return <div>loading...</div>;
  console.log("session", session);

  return (
    <div className="card">
      <div>Home</div>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>

      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

Home.layout = Layout;