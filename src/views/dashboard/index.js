import React, { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col, Card, CardBody, InputGroup, Form, FormControl } from 'react-bootstrap';
import { Button, Table } from 'antd';
import DashabordCardCountServices from '../../services/dashboard/dashboardCardCount.services';
import StockServices from '../../services/stockRecord/stockRecord.services';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import BranchDetails from '../../services/dashboard/branchDetail.services';
import { Link, Navigate, Route } from 'react-router-dom';
import { param } from 'jquery';

const DashDefault = () => {
  const [dashabordServices] = useState(() => new DashabordCardCountServices());
  const [brnachService] = useState(() => new BranchDetails());
  const [stockServices] = useState(() => new StockServices());
  const [cardcount, setRecordCount] = useState();
  const [branchDetails, setbranchDetails] = useState([]);
  const [listState, setListSate] = useState();

  const getColumns = [
    // {
    //   title: 'Branch Name',
    //   dataIndex: 'branchName'
    // },
    {
      title: 'Component',
      dataIndex: 'component'
    },
    {
      title: 'Blood Group',
      dataIndex: 'bloodGroup'
    },
    {
      title: 'Qty',
      dataIndex: 'qty'
    }
  ];
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('token-info')) == null || JSON.parse(sessionStorage.getItem('token-info')) === '') {
      window.location.href = '/login';
    }
  }, []);
  var auth = JSON.parse(sessionStorage.getItem('token-info'));

  const onStockDetails = (param) => {
    // setLoading(true);
    let data = {
      PartyCode: auth.userId,
      BranchCode: param
    };
    stockServices.getStockRecordDetails(data).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setListSate(response.data.data);
        }
        // setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    });
  };
  const onDashbaordCardCount = (params) => {
    let data = {
      PartyCode: auth.userId,
      BranchCode: params
    };
    dashabordServices.getDashboardCardCount(data).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setRecordCount(response.data.data);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };
  useEffect(() => {
    onbranchDetails();
    // onStockDetails();
  }, []);

  const handleSelectChange = (event) => {
    onDashbaordCardCount(event.target.value);
    onStockDetails(event.target.value);
  };
  const onbranchDetails = () => {
    let params = {
      PartyCode: auth.userId
    };
    brnachService.getBranchDetail(params).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setbranchDetails(response.data.data);
          onStockDetails(response.data.data[0].code);
          onDashbaordCardCount(response.data.data[0].code);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  function redirectCollectiont() {
    window.location.assign('/collection/collectionRecord');
  }
  function redirectDonor() {
    window.location.assign('/donor/donorRecord');
  }
  function redirectIssue() {
    window.location.assign('/issue/issueRecord');
  }
  function redirectStock() {
    window.location.assign('/stock/stockRecord');
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <CardBody>
            <Form>
              <Row>
                <Form.Group className="mb-2" as={Col} md="4">
                  <Form.Label>Branch Name</Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl as="select" onChange={handleSelectChange} className="custom-select">
                      {branchDetails.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.branchName}
                        </option>
                      ))}
                    </FormControl>
                  </InputGroup>
                </Form.Group>
              </Row>
            </Form>
          </CardBody>
        </Col>
      </Row>

      {/* <span>Branch Name: </span>
      <select onChange={handleSelectChange}>
        {branchDetails.map((option) => (
          <option key={option.code} value={option.code}>
            {option.branchName}
          </option>
        ))}
      </select>
      <hr></hr> */}
      <Row>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4"> Total Collection Record</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  {cardcount?.totalCollectionRecord >= 50 ? (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-up text-c-green f-30 m-r-5`} />
                    </h3>
                  ) : (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-down text-c-red f-30 m-r-5`} />
                    </h3>
                  )}
                </div>
                <div className="col-3 text-end">
                  <Link className="m-b-0" onClick={redirectCollectiont}>
                    {cardcount?.totalCollectionRecord || 0} ₹
                  </Link>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar progress-c-theme2`}
                  role="progressbar"
                  style={{ width: `${cardcount?.totalCollectionRecord}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Total Doner Record</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  {cardcount?.totalDonerRecord >= 50 ? (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-up text-c-green f-30 m-r-5`} />
                    </h3>
                  ) : (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-down text-c-red f-30 m-r-5`} />
                    </h3>
                  )}
                </div>
                <div className="col-3 text-end">
                  <Link className="m-b-0" onClick={redirectDonor}>
                    {cardcount?.totalDonerRecord || 0}{' '}
                  </Link>

                  {/* <p className="m-b-0">{cardcount?.totalDonerRecord} </p> */}
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar progress-c-theme`}
                  role="progressbar"
                  style={{ width: `${cardcount?.totalDonerRecord}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Total Issue Record</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  {cardcount?.totalIssuedRecord >= 50 ? (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-up text-c-green f-30 m-r-5`} />
                    </h3>
                  ) : (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-down text-c-red f-30 m-r-5`} />
                    </h3>
                  )}
                </div>
                <div className="col-3 text-end">
                  <Link className="m-b-0" onClick={redirectIssue}>
                    {cardcount?.totalIssuedRecord || 0}{' '}
                  </Link>
                  {/* <p className="m-b-0">{cardcount?.totalIssuedRecord} </p> */}
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar progress-c-theme `}
                  role="progressbar"
                  style={{ width: `${cardcount?.totalIssuedRecord}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Total Stock Record</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  {cardcount?.totalStockRecord >= 50 ? (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-up text-c-green f-30 m-r-5`} />
                    </h3>
                  ) : (
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather icon-arrow-down text-c-red f-30 m-r-5`} />
                    </h3>
                  )}
                </div>
                <div className="col-3 text-end">
                  <Link className="m-b-0" onClick={redirectStock}>
                    {cardcount?.totalStockRecord || 0}{' '}
                  </Link>
                  {/* <p className="m-b-0">{cardcount?.totalStockRecord} </p> */}
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar progress-c-theme `}
                  role="progressbar"
                  style={{ width: `${cardcount?.totalStockRecord}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={12}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">Stock List</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive dataSource={listState} columns={getColumns} scroll={{ x: 'max-content' }} mobileBreakPoint={768} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
