import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import WelcomeImage from "../../assets/images/welcome.png";
import env from '../../config/env';
import { verify } from '../../services/owner.service';
import { toast } from 'react-toastify';

function VerifyUser() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const url = new URL(window.location.href);
                const token = decodeURIComponent(url.searchParams.get('token'));
                if (!token) {
                    navigate('/404')
                    return;
                }
                const data = JSON.parse(CryptoJS.AES.decrypt(token, env.cryptoSecret).toString(CryptoJS.enc.Utf8));
                const keys = Object.keys(data);
                if (keys.length === 3 && keys.includes('email') && keys.includes('name') && keys.includes('expires')) {
                    setName(name);
                    const payload = { email: data.email, expires: data.expires };
                    const res = await verify(payload);
                    localStorage.setItem('token', res.token);
                    toast.success('Verified successfully');
                    navigate('/');
                }
            } catch (err) {
                toast.error(`Failed to verify email: ${err.message}`);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        name && <div className='view d-flex align-items-center m-0'>
            <Container className='d-flex justify-content-center'>
                <Card className='rounded-0 shadow-lg mx-5 col-6'>
                    <CardBody className='m-4 d-flex flex-column align-items-center'>
                        <img src={WelcomeImage} alt="Food" className="welcome-image m-4" />
                        <h4>Hey {name}</h4>
                        <h1 className="text-primary fw-bold">Welcome !!</h1>
                        <p className="text-muted text-center">Your email has been successfully verified. Please wait for a moment. You will be redirected to the dashboard shortly.</p>
                        <p className='small text-muted'>If you not redirected try login</p>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
};

export default VerifyUser;
