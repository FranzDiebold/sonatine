import Section from 'react-bulma-components/lib/components/section';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';
import Icon from 'react-bulma-components/lib/components/icon';

import './Help.scss';

function Help() {
    return (
        <Section>
            <Hero>
                <Hero.Body>
                    <Container>
                        <Columns centered>
                            <Columns.Column
                                tablet={{
                                    size: 6,
                                }}
                                desktop={{
                                    size: 4,
                                }}
                            >
                                <Card style={{ width: 300, margin: 'auto' }}>
                                    <a
                                        href="doc/Übersicht der Noten- und Schriftzeichen von Sonatine.pdf"
                                        download={true}
                                    >
                                        <Card.Image
                                            src="img/cheatsheet-preview.png"
                                        />
                                        <Card.Footer>
                                            <Card.Footer.Item>
                                                <Icon>
                                                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12,10.5H13V13.5H12V10.5M7,11.5H8V10.5H7V11.5M20,6V18A2,2 0 0,1 18,20H6A2,2 0 0,1 4,18V6A2,2 0 0,1 6,4H18A2,2 0 0,1 20,6M9.5,10.5A1.5,1.5 0 0,0 8,9H5.5V15H7V13H8A1.5,1.5 0 0,0 9.5,11.5V10.5M14.5,10.5A1.5,1.5 0 0,0 13,9H10.5V15H13A1.5,1.5 0 0,0 14.5,13.5V10.5M18.5,9H15.5V15H17V13H18.5V11.5H17V10.5H18.5V9Z" />
                                                    </svg>
                                                </Icon>
                                                Kurzanleitung herunterladen
                                            </Card.Footer.Item>
                                        </Card.Footer>
                                    </a>
                                </Card>
                            </Columns.Column>
                            <Columns.Column
                                tablet={{
                                    size: 6,
                                }}
                                desktop={{
                                    size: 4,
                                }}
                            >
                                <Card style={{ width: 300, margin: 'auto' }}>
                                    <a
                                        href="https://juliadiebold.medium.com/musik-notieren-mit-sonatine-e06f6b55bbbc"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Card.Image
                                            src="img/medium-article-preview.png"
                                        />
                                        <Card.Footer>
                                            <Card.Footer.Item>
                                                <Icon>
                                                    <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                                    </svg>
                                                </Icon>
                                                Begleitartikel lesen
                                            </Card.Footer.Item>
                                        </Card.Footer>
                                    </a>
                                </Card>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>
        </Section >
    );
}

export default Help;
