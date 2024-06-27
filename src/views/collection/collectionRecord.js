import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, InputGroup, Form, FormControl } from 'react-bootstrap';
import { Button, Table } from 'antd';
import CollectionDetails from '../../services/collection/collection.services';
import BranchDetails from '../../services/dashboard/branchDetail.services';
import DateValue from '../../components/getDate/date';
import { Label } from 'reactstrap';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { render } from '@testing-library/react';
import { data } from 'jquery';
import ChangePassword from '../changePassword/changePasswordModal';

function collectionRecord() {
  const [collestionServices] = useState(() => new CollectionDetails());
  const [brnachService] = useState(() => new BranchDetails());
  const [dateValue] = useState(() => new DateValue());
  const [branchDetails, setbranchDetails] = useState([]);
  const [drpPayMode, setdrpPayMode] = useState([]);
  const [inputs, setInputs] = useState({});
  const [yesturdayDate, setYesturdayDate] = useState();
  const [todayDate, setTodayDate] = useState();
  const [totalRecord, settotalRecord] = useState();
  const [defaultBranchname, setdefaultBranchname] = useState();
  const [totalBillAmount, setTotalBillAmount] = useState();
  const [totalPailAmount, setTotalPailAmount] = useState();
  const [totalBalanceAmount, setTotalBalanceAmount] = useState();
  var drpData = '';
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('token-info')) == null || JSON.parse(sessionStorage.getItem('token-info')) === '') {
      window.location.href = '/login';
    }
  }, []);

  const [listState, setListSate] = useState();
  const [loading, setLoading] = useState(false);

  const getColumns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName'
    },
    {
      title: 'Pay Mode',
      dataIndex: 'payMode'
    },
    {
      title: 'Bill Amount',
      dataIndex: 'billAmount'
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount'
    },
    {
      title: 'Balance Amount',
      dataIndex: 'balanceAmount'
    },
    {
      title: 'Collection Date',
      dataIndex: 'collectionDate'
    }
  ];

  var auth = JSON.parse(sessionStorage.getItem('token-info'));
  useEffect(() => {
    setYesturdayDate(dateValue.getDate(0));
    setTodayDate(dateValue.getDate(1));
    onbranchDetails();
    onPaymode();
  }, [yesturdayDate, todayDate]);

  const onPaymode = () => {
    collestionServices.getPayMode().then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setdrpPayMode(response.data.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  const onCollectionDetail = (props) => {
    if (props != null) {
      setLoading(true);
      collestionServices.getCollectionDetails(props).then((response) => {
        try {
          if (response.data.statusCode === 200) {
            setListSate(response.data.data);
            settotalRecord(response.data.totalRecords);
          }
          setLoading(false);
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  };

  function searchClick() {
    let param = {
      PartyCode: auth?.userId,
      BranchCode: inputs.branchName ? inputs.branchName : defaultBranchname,
      PayMode: inputs.payMode ? inputs.payMode || inputs.payMode !== undefined : '0',
      DateFrom: inputs.dateFrom ? inputs.dateFrom : yesturdayDate,
      DateTo: inputs.dateTo ? inputs.dateTo : todayDate
    };
    onCollectionDetail(param);
  }

  const handleSelectChange = (event) => {
    drpData = event.target.value;
    setInputs((inputs) => ({ ...inputs, branchName: drpData }));
  };
  const handleUserDrp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const onbranchDetails = () => {
    let params = {
      PartyCode: auth?.userId
    };
    brnachService.getBranchDetail(params).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setbranchDetails(response.data.data);
          setdefaultBranchname(response.data.data[0].code);
          let param = {
            PartyCode: auth?.userId,
            BranchCode: response.data.data[0].code,
            PayMode: '',
            DateFrom: yesturdayDate,
            DateTo: todayDate
          };
          onCollectionDetail(param);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  return (
    <>
      {auth?.pwd ? <ChangePassword /> : <></>}
      <Row>
        <Col sm={12}>
          <Card>
            {/* <Card.Header>
              <Card.Title as="h6">Filter</Card.Title>
            </Card.Header> */}
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-2" as={Col} md="3">
                    <Form.Label>Branch Name</Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl as="select" onChange={handleSelectChange} aria-describedby="custom-addons1" className="custom-select">
                        {branchDetails.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.branchName}
                          </option>
                        ))}
                      </FormControl>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="2" controlId="validationCustom02">
                    <Form.Label>Pay Mode</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        as="select"
                        aria-describedby="custom-addons1"
                        className="custom-select"
                        onChange={(event) => handleUserDrp({ target: { name: 'payMode', value: event.target.value } })}
                      >
                        <option className="mb-0 text-muted" value="0">
                          All
                        </option>
                        {drpPayMode.map((option) => (
                          <option key={option.payMode} value={option.payMode}>
                            {option.payMode}
                          </option>
                        ))}
                      </FormControl>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="3" controlId="validationCustomUsername">
                    <Form.Label>Date From</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="date"
                        id="dateFrom"
                        name="dateFrom"
                        defaultValue={yesturdayDate}
                        onChange={(event) => {
                          setInputs((input) => ({ ...input, dateFrom: event.target.value }));
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="3">
                    <Form.Label>Date To</Form.Label>
                    <InputGroup>
                      <FormControl
                        type="date"
                        id="dateTo"
                        name="dateTo"
                        defaultValue={todayDate}
                        onChange={(event) => {
                          setInputs((input) => ({ ...input, dateTo: event.target.value }));
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="1">
                    <SearchOutlined style={{ margin: '45px -3px 0px 0px' }} onClick={searchClick} />

                    {/* <Button style={{margin:'28px 0 0 -14px',height:'42px'}} icon={<SearchOutlined/>}  onClick={searchClick}>search</Button>  */}
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">Total Collection Record List : {totalRecord ? totalRecord : 0}</Card.Title>
              {/* <div class="col-md-12">
                <div class="row">
                  <div class="col-md-3">
                    <label for="dateFrom"></label>
                  </div>
                  <div class="col-md-3">
                    <label for="dateFrom">Total Bill Amount: 0</label>
                  </div>
                  <div class="col-md-3">
                    <label for="dateFrom">Total Paid Amount: 0</label>
                  </div>
                  <div class="col-md-3">
                    <label for="dateFrom">Total Balance Amount: 0</label>
                  </div>
                </div>
              </div> */}
            </Card.Header>
            <CardBody className="p-0">
              <Table
                responsive
                dataSource={listState}
                columns={getColumns}
                loading={loading}
                scroll={{ x: 'max-content' }}
                mobileBreakPoint={768}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default collectionRecord;
