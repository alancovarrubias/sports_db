import React from 'react'
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap'

const Login = ({ attemptLogin, user, usernameChange, passwordChange }) => {
  return (
    <Row>
      <Col lgOffset={4} lg={4}>
        <h1>Database Login</h1>
        <form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={usernameChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={passwordChange}
            />
          </FormGroup>
          <Button onClick={attemptLogin}>
            Submit
          </Button>
        </form>
      </Col>
    </Row>
  )
}
export default Login
