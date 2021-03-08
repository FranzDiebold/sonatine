import Section from 'react-bulma-components/lib/components/section';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';
import Notification from 'react-bulma-components/lib/components/notification';

import './FontDownload.scss';

function FontDownload() {
  const fontDownloadUrl = 'https://github.com/FranzDiebold/sonatine/raw/main/font/dist/sonatine.zip';

  return (
    <Section>
      <Hero>
        <Hero.Body>
          <Container>
            <Columns centered>
              <Columns.Column
                tablet={{
                  size: 9,
                }}
                desktop={{
                  size: 7,
                }}
              >
                <div className="has-text-centered">
                  <Button
                    color="primary"
                    size="large"
                    renderAs="a"
                    href={fontDownloadUrl}
                    download={true}
                  >
                    <Icon>
                      <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                      </svg>
                    </Icon>
                    <span>
                      Schrift herunterladen
                    </span>
                  </Button>
                </div>
                <Notification className="howto">
                  <div>
                    Wie installiere ich eine Schrift?
                  </div>
                  <div>
                    <Button
                      outlined
                      className="howto-button"
                      renderAs="a"
                      href="https://support.apple.com/de-de/HT201749"
                      target="_blank"
                    >
                      <Icon>
                        <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                        </svg>
                      </Icon>
                      <span>Mac</span>
                    </Button>
                    <Button
                      outlined
                      className="howto-button"
                      renderAs="a"
                      href="https://support.microsoft.com/de-de/office/hinzuf%C3%BCgen-einer-schriftart-b7c5f17c-4426-4b53-967f-455339c564c1"
                      target="_blank"
                    >
                      <Icon>
                        <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
                        </svg>
                      </Icon>
                      <span>Windows</span>
                    </Button>
                  </div>
                </Notification>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
  );
}

export default FontDownload;
