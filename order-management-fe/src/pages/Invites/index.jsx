import { useEffect, useState } from "react";
import { emailRegex } from "../../validations/auth";
import { inviteUser, list } from "../../services/invite.service";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "../../assets/styles/invite.css";
import Table from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";

function Invites() {
    const [email, setEmail] = useState('');
    const [inviteData, setInviteData] = useState({ count: 0, rows: [] });

    // Pagination of the invite table
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPaginationChange = (e) => {
        setPagination(e);
    }

    useEffect(() => {
        const { pageIndex, pageSize } = pagination;
        const startIndex = pageIndex * pageSize;
        getInvites(startIndex, pageSize)
    }, [pagination]);

    const getInvites = async (skip = 0, limit = 10) => {
        try {
            const query = `skip=${skip}&limit=${limit}`;
            const res = await list(query);
            console.log(res);
            setInviteData(res);
        } catch (error) {
            toast.error(`Failed to invite user: ${error.message}`);
        }
    }

    useEffect(() => {
        getInvites();
    }, [])

    const handleSend = async () => {
        try {
            await inviteUser({ email });
            toast.success('User invited successfully');
        } catch (error) {
            toast.error(`Failed to invite user: ${error.message}`);
        }
    }

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.display({
            id: 'id',
            header: 'Id',
            cell: ({ row }) => <div>{row.original.id}</div>,
        }),
        columnHelper.display({
            id: 'ownerId',
            header: 'Owner Id',
            cell: ({ row }) => <div>{row.original.ownerId}</div>,
        }),
        columnHelper.display({
            id: 'email',
            header: 'Email',
            cell: props => <div>{props.row.original.email}</div>,
        }),
        columnHelper.display({
            id: 'created',
            header: 'Invited',
            cell: ({ row }) => {
                return row.original.createdAt && <div>{moment(row.original.createdAt).format('DD-MMM-YYYY')}</div>
            },
        }),
        columnHelper.display({
            id: 'status',
            header: 'Status',
            cell: ({ row }) => <div>{row.original.status}</div>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return row.original.status ?
                    <Button
                        style={{ background: '#49AC60', border: 'none' }}
                        disabled={row.original.status === 'ACCEPTED'}
                    >Delete</Button> : <></>
            },
        })
    ]

    return (
        <>
            <div className="position-relative">
                <div className="heading-container">
                    <h4 className="text-center text-white pt-5">Invite Admin</h4>
                </div>
                <div className="position-absolute top-100 start-50 translate-middle email-container">
                    <input
                        type="text"
                        placeholder="test@test.com"
                        className="py-3 px-5 border-0 email-input"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <button
                        disabled={!emailRegex.test(email)}
                        onClick={() => { handleSend() }}
                        className="py-3 px-4 border-0 send-button"
                    >Send</button>
                </div>
            </div>
            <div className="m-5 p-5 d-flex flex-column">
                <Table
                    columns={columns}
                    data={inviteData.rows}
                    count={inviteData.count}
                    // Pagination properties
                    onPaginationChange={onPaginationChange}
                    pagination={pagination}
                />
            </div>
        </>
    )
}

export default Invites
