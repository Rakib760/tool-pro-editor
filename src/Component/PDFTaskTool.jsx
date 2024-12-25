import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Navbar, Nav } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import FileConverter from './FileConverter';

const PDFTaskTool = () => {
    const [task, setTask] = useState('');
    const [files, setFiles] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

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
        <div className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
            <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className='border-bottom bg-dark'>
                <Container className='shadow'>
                    <Navbar.Brand href="#home" className='text-white'>Tool Pro Editor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home" className='text-white'>Home</Nav.Link>
                            <Nav.Link href="#about" className='text-white'>About</Nav.Link>
                            <Nav.Link href="#contact" className='text-white'>Contact</Nav.Link>
                            <Nav.Link href="https://github.com/Rakib760" className='text-white'>Github</Nav.Link>


                        </Nav>
                        <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={toggleDarkMode}className='border-white'>
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container id="home" className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
                            <Card.Body>
                                <Card.Title className="text-center">PDF Task Tool</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3 shadow">
                                        <Form.Label>Task</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your task" 
                                            value={task} 
                                            onChange={handleChange} 
                                            className={darkMode ? "bg-secondary text-white" : "bg-light text-dark"}
                                        />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" onClick={generatePDF}>
                                            Generate PDF
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <Card className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
                            <Card.Body>
                                <Card.Title className="text-center">PDF Merge Tool</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Upload PDFs to Merge</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            multiple 
                                            onChange={handleFileChange} 
                                            className={darkMode ? "bg-secondary text-white" : "bg-light text-dark"}
                                        />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" onClick={mergePDFs}>
                                            Merge PDFs
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <FileConverter darkMode={darkMode} />
                    </Col>
                </Row>
            </Container>

            <Container id="about" className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
                            <Card.Body>
                                <Card.Title className="text-center">About Us</Card.Title>
                                <Card.Text>
                                    Tool Pro Editor is a versatile tool designed to help you manage and convert your documents effortlessly. From generating PDFs to merging documents and converting files to various formats, we've got you covered. Our mission is to provide seamless and efficient document management solutions for everyone.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container id="contact" className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className={darkMode ? "bg-dark text-white" : "bg-light text-dark"}>
                            <Card.Body>
                                <Card.Title className="text-center">Contact Us</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" className={darkMode ? "bg-secondary text-white" : "bg-light text-dark"} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email" className={darkMode ? "bg-secondary text-white" : "bg-light text-dark"} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter your message" className={darkMode ? "bg-secondary text-white" : "bg-light text-dark"} />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <footer className="bg-dark text-white mt-5 p-4 text-center border-bottom">
                <Container>
                    <Row>
                        <Col>© 2024 Tool Pro Editor</Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default PDFTaskTool;
