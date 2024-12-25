import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { saveAs } from 'file-saver';

const FileConverter = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('pdf');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormatChange = (e) => {
        setFormat(e.target.value);
    };

    const handleConvert = async () => {
        if (!file) {
            alert("Please upload a file first.");
            return;
        }

        // Placeholder for actual file conversion logic
        alert(`Convert ${file.name} to ${format} format.`);
        const convertedBlob = new Blob([file], { type: `application/${format}` });
        saveAs(convertedBlob, `converted.${format}`);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">File Converter</Card.Title>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Upload File</Form.Label>
                                    <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Format</Form.Label>
                                    <Form.Select value={format} onChange={handleFormatChange}>
                                        <option value="pdf">PDF</option>
                                        <option value="docx">DOCX</option>
                                        <option value="txt">TXT</option>
                                        <option value="html">HTML</option>
                                        {/* Add more formats as needed */}
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" onClick={handleConvert}>
                                        Convert File
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FileConverter;
