import { useRoutes, useLocation } from "react-router-dom";
import { NavBar } from "./components/nav-bar/nav-bar";
// import { Footer } from "./components/footer/footer";
import { routes } from "./routes/routes";
import NewFooter from "./components/footer/NewFooter";
import { ChatModal } from "./components/chat/chat-modal";
import { Footer } from "./components/footer/footer";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  // Pages où on veut afficher le NewFooter
  const showNewFooter = ["/", "/actualites", "/about"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen flex flex-col bg-blue-500 text-foreground">
      <NavBar />
      <main className="flex-grow">{element}</main>
      {showNewFooter ? <NewFooter /> : <Footer />}
      <ChatModal />
    </div>
  );
}

export default App;
