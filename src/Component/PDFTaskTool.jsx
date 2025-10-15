import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Navbar, Nav, Badge } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import FileConverter from './FileConverter';
import { 
    Moon, 
    Sun, 
    FileText, 
    Merge, 
    Settings, 
    Github, 
    Mail, 
    User, 
    Send,
    Zap,
    Shield,
    Sparkles
} from 'lucide-react';

const PDFTaskTool = () => {
    const [task, setTask] = useState('');
    const [files, setFiles] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(20, 20, 'Task List');
        doc.text(20, 30, task);
        doc.save('task.pdf');
    };

    const mergePDFs = async () => {
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }
        const mergedPdfFile = await mergedPdf.save();
        const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? "bg-gradient-dark text-white min-vh-100" : "bg-gradient-light text-dark min-vh-100"}>
            {/* Modern Navbar */}
            <Navbar 
                bg={darkMode ? "dark" : "light"} 
                variant={darkMode ? "dark" : "light"} 
                expand="lg" 
                className={`border-bottom ${darkMode ? 'navbar-glass-dark' : 'navbar-glass-light'} sticky-top`}
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <Container>
                    <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold">
                        <Zap size={28} className="text-primary me-2" />
                        <span className="gradient-text">ToolPro Editor</span>
                        <Badge bg="primary" className="ms-2" style={{ fontSize: '0.6rem' }}>
                            PRO
                        </Badge>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link href="#home" className="fw-semibold mx-2 nav-link-hover">
                                Home
                            </Nav.Link>
                            <Nav.Link href="#about" className="fw-semibold mx-2 nav-link-hover">
                                About
                            </Nav.Link>
                            <Nav.Link href="#contact" className="fw-semibold mx-2 nav-link-hover">
                                Contact
                            </Nav.Link>
                            <Nav.Link href="https://github.com/Rakib760" className="fw-semibold mx-2">
                                <Github size={20} />
                            </Nav.Link>
                            <Button 
                                variant={darkMode ? "outline-light" : "outline-dark"} 
                                onClick={toggleDarkMode}
                                className="ms-3 d-flex align-items-center"
                                size="sm"
                            >
                                {darkMode ? <Sun size={16} className="me-2" /> : <Moon size={16} className="me-2" />}
                                {darkMode ? "Light" : "Dark"}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <Container id="home" className="mt-5">
                <Row className="justify-content-center text-center mb-5">
                    <Col md={8}>
                        <div className="mb-4">
                            <Sparkles size={48} className="text-primary mb-3" />
                            <h1 className="display-5 fw-bold gradient-text mb-3">
                                Ultimate PDF Toolkit
                            </h1>
                            <p className="lead text-muted">
                                Transform, merge, and manage your documents with our powerful suite of tools
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Tools Grid */}
                <Row className="g-4 justify-content-center">
                    {/* PDF Generator Card */}
                    <Col md={6} lg={4}>
                        <Card className={`h-100 ${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg hover-lift`}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                        <FileText size={24} className="text-primary" />
                                    </div>
                                    <Card.Title className="mb-0 fw-bold">PDF Generator</Card.Title>
                                </div>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Task Description</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your task..." 
                                            value={task} 
                                            onChange={handleChange} 
                                            className={`${darkMode ? 'bg-dark text-white border-dark' : 'bg-light text-dark'} rounded-pill px-3`}
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button 
                                            variant="primary" 
                                            onClick={generatePDF}
                                            className="rounded-pill fw-semibold py-2"
                                            size="lg"
                                        >
                                            Generate PDF
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* PDF Merger Card */}
                    <Col md={6} lg={4}>
                        <Card className={`h-100 ${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg hover-lift`}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="icon-wrapper bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                        <Merge size={24} className="text-success" />
                                    </div>
                                    <Card.Title className="mb-0 fw-bold">PDF Merger</Card.Title>
                                </div>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Select PDF Files</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            multiple 
                                            onChange={handleFileChange} 
                                            className={`${darkMode ? 'bg-dark text-white border-dark' : 'bg-light text-dark'} rounded-pill px-3`}
                                            accept=".pdf"
                                        />
                                        <Form.Text className="text-muted">
                                            Select multiple PDF files to merge
                                        </Form.Text>
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button 
                                            variant="success" 
                                            onClick={mergePDFs}
                                            className="rounded-pill fw-semibold py-2"
                                            size="lg"
                                            disabled={files.length === 0}
                                        >
                                            Merge PDFs ({files.length})
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* File Converter Card */}
                    <Col md={6} lg={4}>
                        <Card className={`h-100 ${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg hover-lift`}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="icon-wrapper bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                                        <Settings size={24} className="text-warning" />
                                    </div>
                                    <Card.Title className="mb-0 fw-bold">File Converter</Card.Title>
                                </div>
                                <FileConverter darkMode={darkMode} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* About Section */}
            <Container id="about" className="mt-5 py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className={`${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg`}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <Shield size={48} className="text-primary mb-3" />
                                    <Card.Title className="display-6 fw-bold gradient-text">About ToolPro Editor</Card.Title>
                                </div>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <div className="text-center p-3">
                                            <div className="icon-wrapper bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                                                <Zap size={24} className="text-primary" />
                                            </div>
                                            <h5 className="fw-bold">Lightning Fast</h5>
                                            <p className="text-muted">
                                                Process your documents in seconds with our optimized tools
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="text-center p-3">
                                            <div className="icon-wrapper bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                                                <Sparkles size={24} className="text-success" />
                                            </div>
                                            <h5 className="fw-bold">Secure & Private</h5>
                                            <p className="text-muted">
                                                Your files are processed locally and never stored on our servers
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Card.Text className="text-center mt-4 lead">
                                    ToolPro Editor is a cutting-edge toolkit designed to revolutionize your document workflow. 
                                    From generating professional PDFs to merging documents and converting files across formats, 
                                    we provide enterprise-grade solutions with a beautiful, intuitive interface.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Contact Section */}
            <Container id="contact" className="mt-5 py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className={`${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg`}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <Mail size={48} className="text-primary mb-3" />
                                    <Card.Title className="display-6 fw-bold gradient-text">Get In Touch</Card.Title>
                                    <p className="text-muted">We'd love to hear from you</p>
                                </div>
                                <Form>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            <User size={18} className="me-2" />
                                            Full Name
                                        </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your full name" 
                                            className={`${darkMode ? 'bg-dark text-white border-dark' : 'bg-light text-dark'} rounded-pill px-3 py-2`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            <Mail size={18} className="me-2" />
                                            Email Address
                                        </Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            className={`${darkMode ? 'bg-dark text-white border-dark' : 'bg-light text-dark'} rounded-pill px-3 py-2`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">Message</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            placeholder="Tell us about your project..." 
                                            className={`${darkMode ? 'bg-dark text-white border-dark' : 'bg-light text-dark'} rounded-3 px-3`}
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button 
                                            variant="primary" 
                                            type="submit"
                                            className="rounded-pill fw-semibold py-2"
                                            size="lg"
                                        >
                                            <Send size={18} className="me-2" />
                                            Send Message
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className={`${darkMode ? 'bg-dark' : 'bg-light'} mt-5 py-4 border-top`}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="d-flex align-items-center">
                                <Zap size={24} className="text-primary me-2" />
                                <span className="fw-bold">ToolPro Editor</span>
                            </div>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <span className="text-muted">
                                © 2024 ToolPro Editor. All rights reserved.
                            </span>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Add custom styles */}
            <style jsx>{`
                .bg-gradient-dark {
                    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                }
                .bg-gradient-light {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
                }
                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .navbar-glass-dark {
                    background: rgba(15, 15, 15, 0.8) !important;
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
                .navbar-glass-light {
                    background: rgba(255, 255, 255, 0.8) !important;
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
                }
                .card-glass-dark {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .card-glass-light {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                .hover-lift {
                    transition: all 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
                }
                .nav-link-hover {
                    transition: all 0.3s ease;
                    border-radius: 20px;
                    padding: 0.5rem 1rem !important;
                }
                .nav-link-hover:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                .icon-wrapper {
                    transition: all 0.3s ease;
                }
                .card:hover .icon-wrapper {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default PDFTaskTool;
