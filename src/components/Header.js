import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Segment, Menu, Container } from 'semantic-ui-react';

const Header = () => {
  return (
    <Segment inverted textAlign="center" vertical>
      <Menu inverted pointing secondary size="large">
        <Container>
          <Menu.Item
            as={Link}
            to="/"
            style={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            공적 마스크 판매처 안내
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Item as={NavLink} to="/store/list">
              목록
            </Menu.Item>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};

export default Header;
