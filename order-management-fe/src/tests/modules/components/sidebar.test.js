import { act, render, screen } from "@testing-library/react"
import Sidebar from "../../../components/Sidebar"
import RouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { activeClass, compressClass, compressId, dashboardId, expandClass, expandId, path, sidebarId } from "../../utils/components/dummy.sidebar";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('test sidebar component', () => {
    test('test check compress', async () => {
        await act( async () => {
            render(<Sidebar />)
        })

        const compress = screen.getByTestId(compressId);
        expect(compress).toBeInTheDocument();

        await act( async () => {
            userEvent.click(compress)
        })

        const sidebar = screen.getByTestId(sidebarId);
        expect(sidebar).toHaveClass(compressClass);
    })

    test('test check expand', async () => {
        await act( async () => {
            render(<Sidebar />)
        })

        const compress = screen.getByTestId(compressId);
        expect(compress).toBeInTheDocument();

        await act( async () => {
            userEvent.click(compress)
        })

        const sidebar = screen.getByTestId(sidebarId);
        expect(sidebar).toHaveClass(compressClass);

        const expand = screen.getByTestId(expandId);
        expect(expand).toBeInTheDocument();

        await act( async () => {
            userEvent.click(expand)
        })
        expect(sidebar).toHaveClass(expandClass);
    })

    test('test active option', async () => {
        const navigate = jest.fn();
        jest.spyOn(RouterDom, 'useNavigate').mockReturnValue(navigate);

        await act( async () => {
            render(<Sidebar />)
        })
        
        const option = screen.getByTestId(dashboardId);
        expect(option).not.toHaveClass(activeClass);

        await act( async () => {
            userEvent.click(option);   
        })

        expect(navigate).toHaveBeenCalledWith(path);
        expect(option).toHaveClass(activeClass);
    })
})
