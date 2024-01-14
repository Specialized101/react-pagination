import { useKeycloak } from "keycloak-react-web";
import { Link } from "react-router-dom";
import '../App.css'

export default function Navbar() {
  const { keycloak } = useKeycloak()

  const handleLogin = () => {
    keycloak.login()
  }

  const handleLogout = () => {
    const redirectUri = window.location.origin
    keycloak.logout({ redirectUri })
  }

  return (
    <nav>
      <ul>
        <li><Link to='/'><strong>FastService</strong></Link></li>
      </ul>
      <ul>
        <li>
          {!keycloak.authenticated ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </li>
      </ul>
    </nav>
  )
}