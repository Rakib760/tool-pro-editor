import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { 
    Upload, 
    Download, 
    FileText, 
    File, 
    Code, 
    Type, 
    Image, 
    Archive,
    X,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const FileConverter = ({ darkMode }) => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('pdf');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionStatus, setConversionStatus] = useState(null);
    const [progress, setProgress] = useState(0);

    const supportedFormats = {
        pdf: { name: 'PDF', icon: FileText, color: '#FF6B6B' },
        docx: { name: 'DOCX', icon: File, color: '#4ECDC4' },
        txt: { name: 'TXT', icon: Type, color: '#45B7D1' },
        html: { name: 'HTML', icon: Code, color: '#96CEB4' },
        png: { name: 'PNG', icon: Image, color: '#FFEAA7' },
        jpg: { name: 'JPG', icon: Image, color: '#DDA0DD' },
        zip: { name: 'ZIP', icon: Archive, color: '#98D8C8' }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setConversionStatus(null);
            setProgress(0);
        }
    };

    const handleFormatChange = (e) => {
        setFormat(e.target.value);
        setConversionStatus(null);
    };

    const removeFile = () => {
        setFile(null);
        setConversionStatus(null);
        setProgress(0);
    };

    const simulateConversion = () => {
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    resolve();
                }
                setProgress(progress);
            }, 200);
        });
    };

    const convertToPDF = async (file) => {
        // Simple PDF conversion simulation
        const text = await file.text();
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        doc.text(text, 10, 10);
        return doc.output('blob');
    };

    const convertToTXT = async (file) => {
        if (file.type === 'text/plain') return file;
        const text = await file.text();
        return new Blob([text], { type: 'text/plain' });
    };

    const convertImageFormat = async (file, targetFormat) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(resolve, `image/${targetFormat}`);
            };
            
            img.src = URL.createObjectURL(file);
        });
    };

    const handleConvert = async () => {
        if (!file) {
            setConversionStatus({ type: 'error', message: 'Please upload a file first.' });
            return;
        }

        setIsConverting(true);
        setProgress(0);
        setConversionStatus(null);

        try {
            await simulateConversion();

            let convertedBlob;
            const fileName = file.name.split('.')[0];

            switch (format) {
                case 'pdf':
                    convertedBlob = await convertToPDF(file);
                    break;
                case 'txt':
                    convertedBlob = await convertToTXT(file);
                    break;
                case 'png':
                case 'jpg':
                    if (file.type.startsWith('image/')) {
                        convertedBlob = await convertImageFormat(file, format);
                    } else {
                        throw new Error('Please upload an image file for image conversion');
                    }
                    break;
                case 'zip':
                    // Simple zip simulation - in real app, use JSZip library
                    convertedBlob = new Blob([file], { type: 'application/zip' });
                    break;
                case 'docx':
                case 'html':
                    // For demo purposes - in real app, use proper conversion libraries
                    convertedBlob = new Blob([file], { type: `application/${format}` });
                    break;
                default:
                    throw new Error('Unsupported format');
            }

            saveAs(convertedBlob, `${fileName}.${format}`);
            
            setConversionStatus({ 
                type: 'success', 
                message: `File successfully converted to ${format.toUpperCase()}!` 
            });
        } catch (error) {
            setConversionStatus({ 
                type: 'error', 
                message: error.message || 'Conversion failed. Please try again.' 
            });
        } finally {
            setIsConverting(false);
            setProgress(100);
        }
    };

    const FormatIcon = supportedFormats[format]?.icon || FileText;

    return (
        <Card className={`h-100 ${darkMode ? 'card-glass-dark' : 'card-glass-light'} border-0 shadow-lg hover-lift`}>
            <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                    <div className="icon-wrapper bg-info bg-opacity-10 p-3 rounded-circle me-3">
                        <Upload size={24} className="text-info" />
                    </div>
                    <div>
                        <Card.Title className="mb-0 fw-bold">File Converter</Card.Title>
                        <small className="text-muted">Convert files to various formats</small>
                    </div>
                </div>

                {/* File Upload Area */}
                <div className="mb-4">
                    <Form.Group>
                        <Form.Label className="fw-semibold mb-3">
                            <Upload size={18} className="me-2" />
                            Upload File
                        </Form.Label>
                        {!file ? (
                            <div 
                                className={`border-dashed rounded-3 p-4 text-center cursor-pointer ${
                                    darkMode ? 'border-light bg-dark' : 'border-dark bg-light'
                                }`}
                                style={{ border: '2px dashed', minHeight: '120px' }}
                                onClick={() => document.getElementById('file-upload').click()}
                            >
                                <Upload size={32} className="text-muted mb-2" />
                                <p className="text-muted mb-2">
                                    Click to upload or drag and drop
                                </p>
                                <small className="text-muted">
                                    Supports: PDF, DOCX, TXT, HTML, Images, etc.
                                </small>
                            </div>
                        ) : (
                            <div className={`p-3 rounded-3 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <FileText size={20} className="text-primary me-2" />
                                        <div>
                                            <div className="fw-semibold">{file.name}</div>
                                            <small className="text-muted">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </small>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={removeFile}
                                        className="rounded-circle p-1"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            </div>
                        )}
                        <Form.Control
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="d-none"
                            accept=".pdf,.docx,.txt,.html,.jpg,.jpeg,.png,.zip"
                        />
                    </Form.Group>
                </div>

                {/* Format Selection */}
                <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold mb-3">
                        <Download size={18} className="me-2" />
                        Convert To
                    </Form.Label>
                    <div className="row g-2">
                        {Object.entries(supportedFormats).map(([key, { name, icon: Icon, color }]) => (
                            <div key={key} className="col-6 col-sm-4">
                                <div
                                    className={`p-3 rounded-3 text-center cursor-pointer ${
                                        format === key 
                                            ? 'border-primary bg-primary bg-opacity-10' 
                                            : darkMode 
                                                ? 'bg-dark border-secondary' 
                                                : 'bg-light border'
                                    }`}
                                    onClick={() => setFormat(key)}
                                    style={{ 
                                        border: '2px solid',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Icon size={20} style={{ color }} className="mb-1" />
                                    <div className="small fw-semibold">{name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form.Group>

                {/* Progress Bar */}
                {isConverting && (
                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                            <small className="fw-semibold">Converting...</small>
                            <small>{Math.round(progress)}%</small>
                        </div>
                        <ProgressBar 
                            now={progress} 
                            variant="primary" 
                            animated 
                            className="rounded-pill"
                        />
                    </div>
                )}

                {/* Status Alert */}
                {conversionStatus && (
                    <Alert 
                        variant={conversionStatus.type === 'success' ? 'success' : 'danger'}
                        className="d-flex align-items-center"
                    >
                        {conversionStatus.type === 'success' ? (
                            <CheckCircle size={20} className="me-2" />
                        ) : (
                            <AlertCircle size={20} className="me-2" />
                        )}
                        {conversionStatus.message}
                    </Alert>
                )}

                {/* Convert Button */}
                <div className="d-grid">
                    <Button 
                        variant="info" 
                        onClick={handleConvert}
                        disabled={!file || isConverting}
                        className="rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center"
                        size="lg"
                    >
                        {isConverting ? (
                            <>
                                <div className="spinner-border spinner-border-sm me-2" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <Download size={18} className="me-2" />
                                Convert to {supportedFormats[format]?.name}
                            </>
                        )}
                    </Button>
                </div>

                {/* File Info */}
                {file && (
                    <div className="mt-3 p-3 rounded-3 bg-opacity-10 bg-primary">
                        <div className="row text-center">
                            <div className="col-4">
                                <div className="small text-muted">Format</div>
                                <div className="fw-semibold">{file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'}</div>
                            </div>
                            <div className="col-4">
                                <div className="small text-muted">Size</div>
                                <div className="fw-semibold">{(file.size / 1024).toFixed(1)} KB</div>
                            </div>
                            <div className="col-4">
                                <div className="small text-muted">Target</div>
                                <div className="fw-semibold">{format.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Card.Body>

            {/* Add custom styles */}
            <style jsx>{`
                .border-dashed {
                    border-style: dashed !important;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .hover-lift {
                    transition: all 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-2px);
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
                .icon-wrapper {
                    transition: all 0.3s ease;
                }
            `}</style>
        </Card>
    );
};

export default FileConverter;
