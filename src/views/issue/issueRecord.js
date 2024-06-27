import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Card, CardBody, InputGroup, Form, FormControl } from 'react-bootstrap';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import IssueServices from '../../services/isueRecord/issueRecord.services';
import BranchDetails from '../../services/dashboard/branchDetail.services';
import DateValue from '../../components/getDate/date';
import ChangePassword from '../changePassword/changePasswordModal';

function issueRecord() {
  const [issueServices] = useState(() => new IssueServices());
  const [dateValue] = useState(() => new DateValue());
  const [listState, setListSate] = useState();
  const [brnachService] = useState(() => new BranchDetails());
  const [branchDetails, setbranchDetails] = useState([]);
  const [drpIssueReson, setdrpIssueReson] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [yesturdayDate, setYesturdayDate] = useState();
  const [todayDate, setTodayDate] = useState();
  const [totalRecord, settotalRecord] = useState();
  const [defaultBranchname, setdefaultBranchname] = useState();

  var drpData = '';
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('token-info')) == null || JSON.parse(sessionStorage.getItem('token-info')) === '') {
      window.location.href = '/login';
    }
  }, []);

  const getColumns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName'
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate'
    },
    {
      title: 'Issue Component',
      dataIndex: 'issueComponent'
    },
    {
      title: 'Issue Blood Group',
      dataIndex: 'issueBloodGroup'
    },
    {
      title: 'Issue Reason',
      dataIndex: 'issueReason'
    },
    {
      title: 'Issue Qty',
      dataIndex: 'issueQty'
    }
  ];

  var auth = JSON.parse(sessionStorage.getItem('token-info'));
  useEffect(() => {
    setYesturdayDate(dateValue.getDate(0));
    setTodayDate(dateValue.getDate(1));
    onbranchDetails();
    onIssueResonType();
  }, [yesturdayDate, todayDate]);

  const onIssueResonType = (params) => {
    issueServices.getIssueReason().then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setdrpIssueReson(response.data.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  const onIssueDetails = (params) => {
    setLoading(true);
    issueServices.getIssueRecordDetails(params).then((response) => {
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
  };

  function searchClick() {
    let param = {
      PartyCode: auth?.userId,
      BranchCode: inputs.branchName ? inputs.branchName : defaultBranchname,
      IssueReason: inputs.issueReason ? inputs.issueReason || inputs.issueReason !== undefined : '0',
      DateFrom: inputs.dateFrom ? inputs.dateFrom : yesturdayDate,
      DateTo: inputs.dateTo ? inputs.dateTo : todayDate
    };
    onIssueDetails(param);
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
            IssueReason: '',
            DateFrom: yesturdayDate,
            DateTo: todayDate
          };
          onIssueDetails(param);
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
            <CardBody>
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
                  <Form.Label>Issue Reason</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      as="select"
                      aria-describedby="custom-addons1"
                      className="custom-select"
                      onChange={(event) => handleUserDrp({ target: { name: 'issueReason', value: event.target.value } })}
                    >
                      <option className="mb-0 text-muted" value="0">
                        All
                      </option>
                      {drpIssueReson.map((option) => (
                        <option key={option.issueReason} value={option.issueReason}>
                          {option.issueReason}
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
                  {/* <Button style={{margin:'30px -3px 0px 0px'}} onClick={searchClick}>Search</Button> */}
                </Form.Group>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} xl={12}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">Total Issue Record List : {totalRecord ? totalRecord : 0}</Card.Title>
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

export default issueRecord;
