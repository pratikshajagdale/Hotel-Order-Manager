import { ErrorMessage, Field } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";

function CustomFormGroup({
    name = '',
    type = 'text',
    label = ''
}) {
    return (
        <FormGroup className='mt-2'>
            <FormLabel htmlFor={name} className='small text-muted m-0'>{label}</FormLabel>
            <Field type={type} name={name} className='form-control' />
            <ErrorMessage name={name} component='div' className='text-danger error-message' />
        </FormGroup>
    )
}

export default CustomFormGroup;
