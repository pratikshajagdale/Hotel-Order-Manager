import { Button, Modal } from "react-bootstrap";

function OTMModal({
    title,
    description,
    show=false,
    handleClose,
    handleSubmit,
    closeText,
    submitText
}) {
    return (
        <Modal show={show} onHide={() => { handleClose(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer>
                {
                    closeText &&
                    <Button
                        className="secondary-button"
                        onClick={() => { handleClose(false) }}>
                        {closeText}
                    </Button>
                }
                {
                    submitText &&
                    <Button className="custom-button" onClick={handleSubmit}>
                        {submitText}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default OTMModal;
