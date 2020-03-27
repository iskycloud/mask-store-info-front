import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    <Container style={{ width: '100%' }}>{children}</Container>
    <Footer />
  </>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
