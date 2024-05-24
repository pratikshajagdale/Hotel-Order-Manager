import { Form, Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import CustomFormGroup from '../CustomFormGroup';
import CustomButton from '../CustomButton';

function OTMModal({
    title,
    type = 'string',
    description,
    show = false,
    handleClose,
    handleSubmit = () => {},
    closeText,
    submitText,
    isFooter = true,
    size = 'sm',
    initialValues = {},
    validationSchema = ''
}) {
    const FormComponent = ({ description }) => (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {({ isSubmitting, isValid, dirty, setFieldValue }) => (
                <Form className="d-flex flex-column">
                    <div className="row mb-4">
                        {Object.entries(description).map(([key, property]) => {
                            return (
                                <CustomFormGroup
                                    key={key}
                                    className={property.className}
                                    name={property.name}
                                    type={property.type}
                                    label={property.label}
                                    options={property.options}
                                    setFieldValue={setFieldValue}
                                    disabled={property.disabled}
                                />
                            );
                        })}
                    </div>
                    <ModalFooter disabled={isSubmitting || !isValid || !dirty} />
                </Form>
            )}
        </Formik>
    );

    const ModalFooter = ({ disabled = false }) => (
        <Modal.Footer>
            {closeText && (
                <CustomButton
                    className="secondary-button"
                    onClick={() => {
                        handleClose(false);
                    }}
                    label={closeText}
                    disabled={false}
                />
            )}
            {submitText && type === 'form' && (
                <CustomButton type="submit" className="custom-button" disabled={disabled} label={submitText} />
            )}
            {submitText &&
                type === 'string' && ( // Add this condition
                    <CustomButton
                        type="submit"
                        onClick={handleSubmit}
                        className="custom-button"
                        disabled={disabled}
                        label={submitText}
                    />
                )}
        </Modal.Footer>
    );

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
                {type === 'string' && description}
                {type === 'form' && <FormComponent description={description} />}
            </Modal.Body>
            {isFooter && <ModalFooter />}
        </Modal>
    );
}

export default OTMModal;
