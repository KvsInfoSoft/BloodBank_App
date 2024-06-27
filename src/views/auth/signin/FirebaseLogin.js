import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { notification } from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Loginservice from '../../../services/authentication/login.services';

const FirebaseLogin = ({ className, ...rest }) => {
  const [loginservice] = useState(() => new Loginservice());
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const openNotification = (title, message) => {
    api.info({
      message: title,
      description: message
    });
  };
  const onLogin = (values) => {
    let params = {
      UserID: values.email,
      Password: values.password
    };
    loginservice.getUserLogin(params).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          let sessionValue = {
            userId: response.data.data.userId,
            emailId: response.data.data.emailId,
            name: response.data.data.name,
            pwd: response.data.changePassword
          };
          sessionStorage.setItem('token-info', JSON.stringify(sessionValue));
          window.location.href = '/app/dashboard/default';
        } else {
          openNotification('E_BloodBank Login', response.data.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required('User-Id is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            onLogin(values);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                placeholder="Enter UserID"
                value={values.email}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            {/* <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                &nbsp; Save credentials.
              </label>
            </div> */}

            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary" enabled={isSubmitting} size="large" type="submit" variant="primary">
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
