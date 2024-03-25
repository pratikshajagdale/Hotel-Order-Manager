import { ErrorMessage, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";

function CustomFormGroup({
    name = '',
    type = 'text',
    label = '',
    className = 'mt-2'
}) {
    return (
        <FormGroup className={className}>
            {label && <FormLabel htmlFor={name} className='small text-muted m-0'>{label}</FormLabel>}
            <Field data-testid={`${name}-input-${new Date().getTime()}`} type={type} name={name} className='form-control' />
            <ErrorMessage data-testid={`${name}-error-${new Date().getTime()}`} name={name} component='div' className='text-danger error-message' />
        </FormGroup>
    )
}

export default CustomFormGroup;
