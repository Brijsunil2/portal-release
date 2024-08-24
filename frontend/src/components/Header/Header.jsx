import "./Header.css";
import { Container, Navbar, Nav, NavDropdown, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { MdPerson } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import DateTimeSection from "../DateTimeSection/DateTimeSection";
import WeatherSection from "../WeatherSection/WeatherSection";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navagate = useNavigate();
  const [logoutAPI] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutAPI().unwrap();
      dispatch(logout());
      navagate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar>
        <Col>
          <Navbar.Brand className="d-flex align-items-center" href="/">
            <h1>Portal</h1>
          </Navbar.Brand>
        </Col>
        <Col>
          <DateTimeSection />
        </Col>
        <Col className="d-flex justify-content-end">
          {userInfo && (
            <>
              <Nav>
                <NavDropdown
                  title={
                    <>
                      <TiWeatherPartlySunny size={25} />
                      <p className="nav-btn-label">Weather</p>
                    </>
                  }
                >
                  <WeatherSection />
                </NavDropdown>
              </Nav>
              <Nav>
                <NavDropdown
                  title={
                    <>
                      <MdPerson size={25} />
                      <p className="nav-btn-label">Account</p>
                    </>
                  }
                >
                  <Container className="mx-1">
                    <p>Logged in as:</p>
                    <h3>{userInfo.username}</h3>
                    <h4>{userInfo.name}</h4>
                  </Container>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => navagate("/settings")}>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </Col>
      </Navbar>
    </header>
  );
};

export default Header;
