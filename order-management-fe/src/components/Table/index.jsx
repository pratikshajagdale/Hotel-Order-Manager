import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useRef } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { PiCaretDoubleRightFill, PiCaretDoubleLeftFill } from "react-icons/pi";
import "../../assets/styles/table.css";
import NoData from "../NoData";

const defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
}

function Table({
    data = [],
    columns = [],
    onPaginationChange,
    count,
    pagination = defaultPagination,
    onSortingChange,
    sorting,
    onFilterChange,
    filtering = {}
}) {
    const pageCount = Math.ceil(count / pagination.pageSize);
    const filterInputRefs = useRef({});
    useEffect(() => {
        if (filtering.field && filtering.value) {
            filterInputRefs.current[filtering.field].focus();
        }
    }, [filtering.field, filtering.value]);

    const filledData = [...data];
    const dataLength = filledData.length;
    if (dataLength < pagination.pageSize) {
        for (let i = 0; i < pagination.pageSize - dataLength; i++) {
            filledData.push({});
        }
    }

    const options = {
        columns,
        data: filledData,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        onPaginationChange,
        pageCount,
        manualSorting: true,
        onSortingChange,
        manualFiltering: true,
        getFilteredRowModel,
        state: {
            pagination,
            sorting
        }
    }
    const table = useReactTable(options)

    const ThComponent = ({ header }) => (
        <>
            <div onClick={header.column.toggleSorting} >
                {!header.isPlaceholder &&
                    flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                    )
                }
                {header.column.getIsSorted() === "asc" && (<TiArrowSortedUp size={20} />)}
                {header.column.getIsSorted() === "desc" && (<TiArrowSortedDown size={20} />)}
            </div>
            {
                filtering.field &&
                <input
                    type="text"
                    className="w-75 form-control mx-auto"
                    name={header.id}
                    value={filtering.field === header.id ? filtering.value : ''}
                    onChange={(e) => { onFilterChange(e) }}
                    ref={r => filterInputRefs.current[header.id] = r}
                />
            }
        </>
    )

    const Footer = () => (
        <div className="d-flex justify-content-between align-items-center p-2 table-footer">
            <div>
                Go to : {"  "}
                <input
                    type="number"
                    className="border p-1 rounded pagination-goto"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}
                />
            </div>
            <div className="d-flex align-items-center">
                <button
                    className="border rounded p-1 mx-1 pagination-btn"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <PiCaretDoubleLeftFill size={15} color="#49AC60" />
                </button>
                <button
                    className="border rounded p-1 mx-1 pagination-btn"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FaCaretLeft size={15} color="#49AC60" />
                </button>
                <div className="mx-2">
                    <span>Page</span>{"  "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </div>
                <button
                    className="border rounded p-1 mx-1 pagination-btn"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FaCaretRight size={15} color="#49AC60" />
                </button>
                <button
                    className="border rounded p-1 mx-1 pagination-btn"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <PiCaretDoubleRightFill size={15} color="#49AC60" />
                </button>
            </div>
            <div>
                <select
                    className="form-control"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
    
    if( !data.length ) {
        return ( <NoData /> )
    }

    return (
        <>
            <table className="w-100">
                <thead className="table-header">
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        className='text-center py-3 table-border'
                                        style={{ cursor: `${header.column.getIsSorted() ? 'pointer' : ''}` }}
                                        key={`${header.id}-${new Date()}`}
                                        id={header.id}
                                    >
                                        <ThComponent header={header} />
                                    </th>
                                ))}
                            </tr>
                        );
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} style={{ height: '50px' }}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td
                                        className="text-center py-2 table-border"
                                        style={{ background: `${row.id % 2 ? '#E8E8E8' : 'white'}` }}
                                        key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pageCount > 1 ? <Footer /> : <></>}
        </>
    )
}

export default Table;
