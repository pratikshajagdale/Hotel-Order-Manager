import { act, render, screen } from "@testing-library/react"
import Table from "../../../components/Table"
import { createColumnHelper } from "@tanstack/react-table";
import userEvent from "@testing-library/user-event";

describe('test table components', () => {
    test('test check table rendering', async () => {
        render(<Table />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const noData = screen.getByTestId('no-records');
        expect(noData).toBeInTheDocument();
    })

    test('test data rendering', async () => {
        const data = [{
            id: 'test-id-1',
            name: 'test-name-1'
        }, {
            id: 'test-id-2',
            name: 'test-name-2'
        }]
        const columnHelper = createColumnHelper();
        const columns = [
            columnHelper.display({
                id: 'id',
                header: 'Id',
                cell: ({ row }) => <div>{row.original.id}</div>,
            }),
            columnHelper.display({
                id: 'name',
                header: 'Name',
                cell: ({ row }) => <div>{row.original.ownerId}</div>,
            }),
        ]

        render(
            <Table
                columns={columns}
                data={data}
                count={data.length}
            />
        )

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const rows = screen.getAllByRole('row', { within: table });
        const noOfRows = rows.length - 1;
        expect(noOfRows).toEqual(10);
    })

    test('test table pagination', async () => {
        const data = [...Array(10)].map((item, i) => ({
            id: `test-id-${i}`,
            name: `test-name-${i}`
        }));

        const columnHelper = createColumnHelper();
        const columns = [
            columnHelper.display({
                id: 'id',
                header: 'Id',
                cell: ({ row }) => <div>{row.original.id}</div>,
            }),
            columnHelper.display({
                id: 'name',
                header: 'Name',
                cell: ({ row }) => <div>{row.original.ownerId}</div>,
            }),
        ]

        const onPaginationChange = jest.fn();
        const pagination = {
            pageIndex: 0,
            pageSize: 10,
        }

        render(
            <Table
                columns={columns}
                data={data}
                count={50}
                onPaginationChange={onPaginationChange}
                pagination={pagination}
            />
        )

        const table = screen.getByRole('table');
        const rows = screen.getAllByRole('row', table);

        const noOfRows = rows.length - 1;
        expect(noOfRows).toEqual(10);

        const pages = screen.getByTestId('page-count');
        expect(pages).toContainHTML('1 of 5');

        const nextBtn = screen.getByTestId('next-page');
        const lastBtn = screen.getByTestId('last-page');

        await act(async () => {
            userEvent.click(nextBtn);
            expect(onPaginationChange).toHaveBeenCalledTimes(1);

            userEvent.click(lastBtn);
            expect(onPaginationChange).toHaveBeenCalledTimes(2)
        })
    })

    test('test table sorting', async () => {
        const data = [...Array(5)].map((item, i) => ({
            id: `test-id-${i}`,
            name: `test-name-${i}`
        }));

        const columnHelper = createColumnHelper();
        const columns = [
            columnHelper.display({
                id: 'id',
                header: 'Id',
                cell: ({ row }) => <div>{row.original.id}</div>,
            }),
            columnHelper.display({
                id: 'name',
                header: 'Name',
                cell: ({ row }) => <div>{row.original.ownerId}</div>,
            }),
        ]

        const sorting = [];
        const onSortingChange = jest.fn();

        render(
            <Table
                columns={columns}
                data={data}
                count={data.length}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
        )

        const header = screen.getByText('Name');
        await act(async () => {
            userEvent.click(header);
            expect(onSortingChange).toHaveBeenCalled();
        })
    })

    test('test table filters', async () => {
        const data = [...Array(5)].map((item, i) => ({
            id: `test-id-${i}`,
            name: `test-name-${i}`
        }));

        const columnHelper = createColumnHelper();
        const columns = [
            columnHelper.display({
                id: 'id',
                header: 'Id',
                cell: ({ row }) => <div>{row.original.id}</div>,
            }),
            columnHelper.display({
                id: 'name',
                header: 'Name',
                cell: ({ row }) => <div>{row.original.ownerId}</div>,
            }),
        ]

        const filtering = [];
        const onFilterChange = jest.fn();

        render(
            <Table
                columns={columns}
                data={data}
                count={data.length}
                onFilterChange={onFilterChange}
                filtering={filtering}
            />
        )

        const input = screen.getByTestId('filter-input-name');
        await act( async () => {
            const value = 'testing filter';
            userEvent.type(input, value);
            expect(onFilterChange).toHaveBeenCalledTimes(value.length);
        })
    })
})
