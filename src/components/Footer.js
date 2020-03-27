import React from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical>
    <Container textAlign="right">
      <Button
        size="small"
        icon="linkify"
        href="http://cloudstudio.kr"
        target="_blank"
      />
    </Container>
  </Segment>
);

export default Footer;
