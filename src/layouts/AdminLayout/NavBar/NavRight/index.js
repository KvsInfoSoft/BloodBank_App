import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ChatList from './ChatList';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);

  const handleLogout = async () => {
    window.location.href = '/Login';
  };
  var auth = JSON.parse(sessionStorage.getItem('token-info'));
  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <p>Welcome: {auth?.name}</p>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Link to="#" className="dud-logout" title="Logout" onClick={handleLogout}>
            <i className="feather icon-log-out" />
          </Link>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
