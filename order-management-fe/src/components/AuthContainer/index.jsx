import { Card, CardBody, Container } from "react-bootstrap"

function AuthContainer({ children, title = '' }) {
    return (
        <div className='view d-flex align-items-center m-0'>
            <Container className='d-flex justify-content-center'>
                <Card className='rounded-0 shadow-lg mx-5 col-6'>
                    <CardBody className='m-4 d-flex flex-column'>
                        <h2 className='custom-label text-center fw-bold'>{title}</h2>
                        {children}
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default AuthContainer