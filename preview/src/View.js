import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Nav } from "react-bootstrap";
import Video from "./components/Video";
import Network from "./components/Network";
import Request from "./components/Request";
import Response from "./components/Response";
import Console from "./components/Console/Console";

const components = {
  request: Request,
  response: Response
};

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "request",
      currentPlaybackTime: 0,
      recordingStartedDateTime: null,
      networkLogs: [],
      selectedRequest: null,
      consoleLogs: []
    };
  }

  async componentDidMount() {
    const { match: { params: { bugId } } } = this.props;
    try {
      const networkLogsResponse = await fetch(`https://web-shooter.s3.amazonaws.com/${bugId}/network.json`, {
        method: 'GET',
      });
      const consoleLogsResponse = await fetch(`https://web-shooter.s3.amazonaws.com/${bugId}/console.json`, {
        method: 'GET',
      });
      const networkLogsBody = await networkLogsResponse.json();
      const consoleLogsBody = await consoleLogsResponse.json();
      this.setState({ networkLogs: networkLogsBody.entries, recordingStartedDateTime: networkLogsBody.recordingStartedTime, consoleLogs: consoleLogsBody });
    } catch (error) {
      console.log('Error', error);
    }
  }

  handleSelect = eventKey => {
    this.setState({
      activeKey: eventKey
    });
  };

  onTimeUpdate = currentPlaybackTime => {
    this.setState({
      currentPlaybackTime
    });
  };

  setCurrentRequest = (currentPlaybackTime, request) => {
    const videoElement = document.getElementById('video');
    this.setState({
      currentPlaybackTime,
      selectedRequest: request
    }, () => {
      videoElement.currentTime = currentPlaybackTime;
      videoElement.pause();
    });
  };

  render() {
    const {
      activeKey,
      currentPlaybackTime,
      recordingStartedDateTime,
      selectedRequest,
      networkLogs,
      consoleLogs
    } = this.state;
    const ActiveComponent = components[activeKey];
    const { match: { params: { bugId } } } = this.props;
    const consoleMessages = consoleLogs.logs ? JSON.parse(consoleLogs.logs) : [];
    return (
      <div>
        <Container fluid>
          <Row className="vh-100">
            <Col
              xs
              lg="6"
              className="overflow-auto h-50 border-top border-right"
            >
              <Video onTimeUpdate={this.onTimeUpdate} currentPlaybackTime={currentPlaybackTime} videoSrc={`https://web-shooter.s3.amazonaws.com/${bugId}/video.webm`} />
            </Col>
            <Col
              xs
              lg="6"
              className="overflow-auto h-50 border-top border-right py-2"
            >
              <Console
                currentPlaybackTime={currentPlaybackTime}
                recordingStartedDateTime={recordingStartedDateTime}
                consoleLogs={consoleMessages}
              />
            </Col>
            <Col
              xs
              lg="4"
              className="overflow-auto h-50 border-top border-right py-2"
            >
              {networkLogs && <Network
                currentPlaybackTime={currentPlaybackTime}
                recordingStartedDateTime={recordingStartedDateTime}
                setCurrentRequest={this.setCurrentRequest}
                networkLogs={networkLogs}
              />}
            </Col>
            <Col
              xs
              lg="8"
              className="overflow-auto h-50 border-top border-right"
            >
              <Row className="networkTabs">
                <Nav
                  variant="tabs"
                  defaultActiveKey="request"
                  activeKey={activeKey}
                  onSelect={this.handleSelect}
                  className="bg-white"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="request">Request</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="response">Response</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>
              <div className="mt-5">
                {
                  selectedRequest &&
                  <ActiveComponent log={selectedRequest} />
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
