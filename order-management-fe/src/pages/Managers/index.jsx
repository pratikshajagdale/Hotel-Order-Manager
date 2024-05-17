import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';
import Table from '../../components/Table';
import { Dropdown } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import OTMModal from '../../components/Modal';
import { managerSchema } from '../../validations/manager';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRemoveManager, setSelectedRow, setUpdateManagerModal } from '../../store/slice/manager.slice';

const rawData = [
    {
        id: '38d8a5e6-4f62-4e7d-a86e-ecfb5b69a8d1',
        name: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john@gmail.com',
        address: '123 Main Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Atithi' }
    },
    {
        id: '2f9d8d84-5f8e-4e1d-8977-3cf49d28df70',
        name: 'Jane Smith',
        phoneNumber: '2345678901',
        email: 'jane@gmail.com',
        address: '456 Elm Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Vitthal Kamat' }
    },
    {
        id: 'ec23e319-bb90-4a2f-8f45-b6d605b51d18',
        name: 'Michael Johnson',
        phoneNumber: '3456789012',
        email: 'michael@gmail.com',
        address: '789 Oak Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Vitthal Agastya' }
    },
    {
        id: '38f469ec-f73f-4cf4-b68e-41e9d3a7d6f0',
        name: 'Emily Davis',
        phoneNumber: '4567890123',
        email: 'emily@gmail.com',
        address: '890 Pine Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Garva' }
    },
    {
        id: 'a935ea9a-af49-4199-8583-127327e3698a',
        name: 'Christopher Brown',
        phoneNumber: '5678901234',
        email: 'christopher@gmail.com',
        address: '567 Cedar Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Sonai' }
    },
    {
        id: '8a738f97-1d42-4625-b92b-7b61f3b7e839',
        name: 'Jessica Wilson',
        ownerId: 'a70bd6b8-d04c-4c3d-b2a6-0321fc545abf',
        phoneNumber: '6789012345',
        email: 'jessica@gmail.com',
        address: '678 Maple Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Chirag' }
    },
    {
        id: 'a0d0550e-0f45-4f8a-bb80-988ae19731d8',
        name: 'Daniel Martinez',
        ownerId: 'a70bd6b8-d04c-4c3d-b2a6-0321fc545abf',
        phoneNumber: '7890123456',
        email: 'daniel@gmail.com',
        address: '345 Walnut Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'AS-59' }
    },
    {
        id: '2a2a2024-b65d-46c0-86b1-21719028f5c1',
        name: 'Ashley Taylor',
        ownerId: 'a70bd6b8-d04c-4c3d-b2a6-0321fc545abf',
        phoneNumber: '8901234567',
        email: 'ashley@gmail.com',
        address: '456 Pine Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'SK-49' }
    },
    {
        id: 'b4b153ec-cbb8-44e4-97a7-76b6b439c435',
        name: 'David Anderson',
        ownerId: 'a70bd6b8-d04c-4c3d-b2a6-0321fc545abf',
        phoneNumber: '9012345678',
        email: 'david@gmail.com',
        address: '123 Walnut Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Jaibhavani' }
    },
    {
        id: 'ed6af055-5670-482b-8e50-fc9c9d495076',
        name: 'Sarah Garcia',
        ownerId: 'a70bd6b8-d04c-4c3d-b2a6-0321fc545abf',
        phoneNumber: '0123456789',
        email: 'sarah@gmail.com',
        address: '789 Cedar Street, City, Country',
        hotelId: { id: '4cf66b64-30d7-45f7-aa42-9c4370af91cf', name: 'Satbara' }
    }
];

const columnHelper = createColumnHelper();
function Managers() {
    const { updateManagerModal, selectedRow, isRemoveManager } = useSelector((state) => state.manager);
    const dispatch = useDispatch();
    const initialValues = {
        name: selectedRow?.original?.name,
        phoneNumber: selectedRow?.original?.phoneNumber,
        email: selectedRow?.original?.email,
        hotelName: selectedRow?.original?.hotelId?.name,
        address: selectedRow?.original?.address
    };
    /**** pagination state ****/
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    /**** table pagination start ****/
    const onPaginationChange = (e) => {
        setPagination(e);
    };
    const handleDelete = () => {};
    const handleSubmit = () => {};

    const columns = [
        columnHelper.display({
            id: 'name',
            header: 'Name',
            cell: ({ row }) => <div>{row?.original?.name}</div>
        }),
        columnHelper.display({
            id: 'phoneNumber',
            header: 'Phone Number',
            cell: ({ row }) => <div>{row?.original?.phoneNumber}</div>
        }),
        columnHelper.display({
            id: 'hotelName',
            header: 'Hotel Name',
            cell: ({ row }) => <div>{row?.original?.hotelId?.name}</div>
        }),
        columnHelper.display({
            id: 'address',
            header: 'Address',
            cell: ({ row }) => <div>{row?.original?.address}</div>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    dispatch(setUpdateManagerModal());
                                    dispatch(setSelectedRow(row));
                                }}
                                className="d-flex align-items-center"
                            >
                                <FaEdit data-testid="plus-icon" size={20} color="#49ac60" className="mx-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    dispatch(setIsRemoveManager());
                                    dispatch(setSelectedRow(row));
                                }}
                                className="d-flex align-items-center"
                            >
                                <MdDeleteForever data-testid="plus-icon" size={25} color="#49ac60" className="mx-1" />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                );
            }
        })
    ];
    return (
        <>
            <div className="mx-4 my-4 pt-4 d-flex flex-column">
                <Table
                    columns={columns}
                    data={rawData}
                    onPaginationChange={onPaginationChange}
                    pagination={pagination}
                />
            </div>
            <OTMModal
                show={updateManagerModal}
                title={'Update Manager'}
                initialValues={initialValues}
                validationSchema={managerSchema}
                handleSubmit={handleSubmit}
                description={{
                    name: { name: 'name', type: 'text', label: 'Manager Name', className: 'col-6' },
                    phoneNumber: { name: 'phoneNumber', type: 'number', label: 'Phone Number', className: 'col-6' },
                    email: { name: 'email', type: 'text', label: 'Email', className: 'col-6' },
                    hotelName: { name: 'hotelName', type: 'select', label: 'Hotel Name', className: 'col-6' },
                    address: { name: 'address', type: 'text', label: 'Address', className: 'col-6' }
                }}
                handleClose={() => {
                    dispatch(setUpdateManagerModal());
                }}
                isFooter={false}
                size={'lg'}
                submitText={'Submit'}
                closeText={'Close'}
            />
            <OTMModal
                show={isRemoveManager}
                size="md"
                closeText={'Cancel'}
                submitText={'Delete'}
                title={'Delete Manager'}
                description={'Are you sure you want to delete the Manager? This action cannot be undone.'}
                handleClose={() => dispatch(setIsRemoveManager())}
                handleSubmit={handleDelete}
            />
        </>
    );
}

export default Managers;
