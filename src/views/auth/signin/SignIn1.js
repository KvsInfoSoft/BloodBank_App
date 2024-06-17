import React from 'react';
import { Card /*Button, Alert*/ } from 'react-bootstrap';
import { NavLink /*Link */ } from 'react-router-dom';
import Bg from '../../../assets/images/BgkKvs.jpg';

// import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

// import { CopyToClipboard } from 'react-copy-to-clipboard';

import AuthLogin from './FirebaseLogin';
import Logo from '../../../components/Logo/kvslogo';
const Signin1 = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <div className="auth-wrapper">
        {/* <img src={Bg} alt="E_BloodBank"/> */}

        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="s" />
          
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
                <hr></hr>
                <p>E-Blood Bank Login</p>
              </div>
              <AuthLogin />
              <br></br>
              <br></br>
              {/* <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Reset
                </NavLink>
              </p> */}
              {/* <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/auth/signup-1" className="f-w-400">
                  Signup
                </NavLink>
              </p> */}
            </Card.Body>
            {/* <h6 className="mb-2 text-muted" style={{ fontSize: '10px' }}>
              © E-Blood Bank Solutions
              <a href=" " target="_blank" style={{ color: '#0000FF' }}>
                &nbsp; &nbsp; <Logo />
              </a>
            </h6> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signin1;
