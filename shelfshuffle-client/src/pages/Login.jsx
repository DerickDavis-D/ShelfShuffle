import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert,
  FormCheck 
} from "react-bootstrap";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    // Basic validation
    if (!formData.email.includes('@') || formData.password.length < 6) {
      setLoading(false);
      return setError("Please enter valid credentials");
    }
  
    try {
      const response = await axios.post('/api/users/login', {
        email: formData.email.trim(),
        password: formData.password
      });
  
      if (!response.data.token) {
        throw new Error("Authentication token missing");
      }
  
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      navigate('/dashboard'); // Redirect to protected route
    } catch (err) {
      let errorMessage = "Login failed";
      
      if (err.response) {
        // Backend returned an error
        errorMessage = err.response.data?.message || 
                      `Server error: ${err.response.status}`;
      } else if (err.request) {
        // No response received
        errorMessage = "Network error - is the server running?";
      } else {
        // Other errors
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error("Login failed:", {
        error: err,
        config: err.config,
        request: err.request,
        response: err.response
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4 h3">Welcome Back</Card.Title>
              
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email" // Better accessibility
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="current-password" // Better accessibility
                  />
                </Form.Group>

                <div className="d-flex justify-content-between mb-4">
                  <FormCheck 
                    type="checkbox" 
                    label="Remember me" 
                    className="text-muted"
                  />
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={loading} // Disable during loading
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;