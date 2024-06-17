import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Card, CardBody, InputGroup, Form, FormControl } from 'react-bootstrap';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import StockServices from '../../services/stockRecord/stockRecord.services';
import BranchDetails from '../../services/dashboard/branchDetail.services';

function stockRecord() {
  const [stockServices] = useState(() => new StockServices());
  const [listState, setListSate] = useState();
  const [brnachService] = useState(() => new BranchDetails());
  const [branchDetails, setbranchDetails] = useState([]);
  const [drpComponent, setdrpComponent] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalRecord, settotalRecord] = useState();
  const [defaultBranchname, setdefaultBranchname] = useState();
  var drpData = '';
  const getColumns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName'
    },
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
  useEffect(() => {
    onbranchDetails();
    onComponent();
  }, []);

  const onComponent = () => {
    stockServices.getComponent().then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setdrpComponent(response.data.data);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  const onStockDetails = (params) => {
    setLoading(true);
    stockServices.getStockRecordDetails(params).then((response) => {
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

  const searchClick = () => {
    let param = {
      PartyCode: auth.userId,
      BranchCode: inputs.branchName ? inputs.branchName : defaultBranchname,
      Component: inputs.component ? inputs.component : ''
    };
    onStockDetails(param);
  };

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
      PartyCode: auth.userId
    };
    brnachService.getBranchDetail(params).then((response) => {
      try {
        if (response.data.statusCode === 200) {
          setbranchDetails(response.data.data);
          setdefaultBranchname(response.data.data[0].code);
          let param = {
            PartyCode: auth.userId,
            BranchCode: response.data.data[0].code,
            Component: ''
          };
          onStockDetails(param);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };
  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <Row>
                <Form.Group className="mb-2" as={Col} md="3">
                  <Form.Label>Branch Name</Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl as="select" aria-describedby="custom-addons1" className="custom-select">
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
                      onChange={(event) => handleUserDrp({ target: { name: 'component', value: event.target.value } })}
                    >
                      <option className="mb-0 text-muted" value="">
                        All
                      </option>
                      {drpComponent.map((option) => (
                        <option key={option.component} value={option.component}>
                          {option.component}
                        </option>
                      ))}
                    </FormControl>
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
              <Card.Title as="h5">Total Stock Record List : {totalRecord ? totalRecord : 0}</Card.Title>
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

export default stockRecord;
