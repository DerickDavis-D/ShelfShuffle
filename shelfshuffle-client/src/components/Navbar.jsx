import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Added for loading state

const NavbarComponent = () => {
  const { user, logout, loading } = useAuth(); // Added loading destructuring

  // Show spinner while auth state is loading
  if (loading) {
    return (
      <Navbar bg="warning" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            ShelfShuffle
          </Navbar.Brand>
          <Spinner animation="border" size="sm" />
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="warning" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          ShelfShuffle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/create-shelf">Create a Shelf</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button 
                  variant="danger" 
                  onClick={logout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;