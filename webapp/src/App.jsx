import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";

import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import Icon from 'react-bulma-components/lib/components/icon';
import Footer from 'react-bulma-components/lib/components/footer';
import Columns from 'react-bulma-components/lib/components/columns';

import './App.scss';

import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import MusicalSymbolsExplorer from 'components/musical-symbols-explorer/MusicalSymbolsExplorer';
import FontTest from 'components/font-test/FontTest';
import FontDownload from 'components/font-download/FontDownload';
import Imprint from 'components/imprint/Imprint';
import Privacy from 'components/privacy/Privacy';

function App() {
  const [navbarActive, setNavbarActive] = useState(false);

  function toggleNavbar() {
    setNavbarActive(!navbarActive);
  }

  function hideNavbar() {
    setNavbarActive(false);
  }

  return (
    <Router>
      <ScrollToTop />
      <Navbar active={navbarActive} fixed="top">
        <Container>
          <Navbar.Brand>
            <Navbar.Item to="/" renderAs={NavLink} onClick={hideNavbar}>
              <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
            </Navbar.Item>
            <Navbar.Burger onClick={toggleNavbar} />
          </Navbar.Brand>
          <Navbar.Menu >
            <Navbar.Container>
              <Navbar.Item to="/musikalische-symbole" renderAs={NavLink} activeClassName="is-active" onClick={hideNavbar}>
                <Icon>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3V13.55A4 4 0 1 0 14 17V7H18V3M16.5 20A1.5 1.5 0 1 1 18 18.5A1.5 1.5 0 0 1 16.5 20Z" />
                  </svg>
                </Icon>
                <span>
                  Musikalische Symbole
                </span>
              </Navbar.Item>
              <Navbar.Item to="/schrift-testen" renderAs={NavLink} activeClassName="is-active" onClick={hideNavbar}>
                <Icon>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z" />
                  </svg>
                </Icon>
                <span>
                  Schrift testen
                </span>
              </Navbar.Item>
              <Navbar.Item to="/schrift-herunterladen" renderAs={NavLink} activeClassName="is-active" onClick={hideNavbar}>
                <Icon>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                  </svg>
                </Icon>
                <span>
                  Schrift herunterladen
                </span>
              </Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
              <Navbar.Item href="https://github.com/FranzDiebold/musical-symbols" target="_blank" className="has-tooltip-left" data-tooltip="Dieses Projekt ist Open Source!">
                <Icon>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                </Icon>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Container>
      </Navbar>
      <div className="content-container" onClick={hideNavbar}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/musikalische-symbole" />
          </Route>
          <Route exact path="/musikalische-symbole">
            <MusicalSymbolsExplorer />
          </Route>
          <Route exact path="/schrift-testen">
            <FontTest />
          </Route>
          <Route exact path="/schrift-herunterladen">
            <FontDownload />
          </Route>
          <Route exact path="/impressum">
            <Imprint />
          </Route>
          <Route exact path="/datenschutz">
            <Privacy />
          </Route>
          <Route path="*">
            <Redirect to="/musikalische-symbole" />
          </Route>
        </Switch>
      </div>
      <Footer onClick={hideNavbar}>
        <Container>
          <Columns>
            <Columns.Column>
              Made with ❤️ by <a href="https://www.julia-diebold.de" target="_blank">Julia Diebold</a> &amp; <a href="https://www.diebold.io" target="_blank">Franz Diebold</a>
            </Columns.Column>
            <Columns.Column className="has-text-right">
              <Link to="/impressum" className="item">Impressum</Link>
              <Link to="/datenschutz" className="item">Datenschutz</Link>
            </Columns.Column>
          </Columns>
        </Container>
      </Footer>
    </Router>
  );
}

export default App;
