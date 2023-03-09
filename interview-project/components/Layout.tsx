import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <div className="bg-base-300 min-h-screen flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}