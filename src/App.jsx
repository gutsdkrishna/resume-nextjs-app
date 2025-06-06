import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
