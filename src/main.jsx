import ReactDOM from 'react-dom/client'
import Router from './components/Router'
import { KeycloakProvider } from "keycloak-react-web"
import Keycloak from 'keycloak-js'

const keycloakInstance = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'FastService',
  clientId: 'react'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <KeycloakProvider client={keycloakInstance}>
      <Router />
  </KeycloakProvider>
)
