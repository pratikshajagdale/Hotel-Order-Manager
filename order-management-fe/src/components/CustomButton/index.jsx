import { Button } from "react-bootstrap";

function CustomButton({
    disabled = true,
    label = '',
    type = 'button'
}) {
    return (
        <Button
            disabled={disabled}
            type={type}
            className='custom-button btn-block mx-auto my-4 px-4'
        >{label}</Button>
    )
}

export default CustomButton;
