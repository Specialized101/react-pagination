import { useKeycloak } from "keycloak-react-web";
import Users from "./components/Users"
import Navbar from "./components/Navbar";

const App = () => {
  const { keycloak } = useKeycloak()
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Welcome, {keycloak.authenticated ? keycloak.tokenParsed.preferred_username : 'Guest'}</h1>
        {keycloak.authenticated && <Users />}
      </main>
    </>
  )
}
export default App;