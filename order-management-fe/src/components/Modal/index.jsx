import { Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import CustomFormGroup from "../CustomFormGroup";
import CustomButton from "../CustomButton";

function OTMModal({
    title,
    description,
    show = false,
    handleClose,
    handleSubmit = () => {},
    closeText,
    submitText,
    isFooter = true,
    size = "sm",
    initialValues = {},
    validationSchema = "",
}) {
    return (
        <Modal
            show={show}
            onHide={() => {
                handleClose(false);
            }}
            size={size}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {typeof description === "string" ? (
                    description
                ) : (
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                        {({ isSubmitting, isValid, dirty }) => (
                            <Form className="d-flex flex-column">
                                <div className="row">
                                    {Object.entries(description).map(([key, property]) => {
                                        return (
                                            <div key={key} className={property.className}>
                                                <CustomFormGroup name={property.name} type={property.type} label={property.label} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <CustomButton type="submit" disabled={isSubmitting || !isValid || !dirty} label="Submit" className="ms-auto my-4" />
                            </Form>
                        )}
                    </Formik>
                )}
            </Modal.Body>
            {isFooter && (
                <Modal.Footer>
                    {closeText && (
                        <Button
                            className="secondary-button"
                            onClick={() => {
                                handleClose(false);
                            }}
                        >
                            {closeText}
                        </Button>
                    )}
                    {submitText && (
                        <Button className="custom-button" onClick={handleSubmit}>
                            {submitText}
                        </Button>
                    )}
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default OTMModal;
