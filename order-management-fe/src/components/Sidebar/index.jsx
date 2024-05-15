import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdSettings, IoMdArrowRoundForward } from 'react-icons/io';
import { MdOutlineDashboardCustomize, MdOutlineRestaurantMenu, MdOutlineAttachMoney } from 'react-icons/md';
import { BsEnvelopePlusFill } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import { PiArmchairFill } from 'react-icons/pi';
import { RiHotelFill } from 'react-icons/ri';
import CryptoJS from 'crypto-js';
import Logo from '../../assets/images/rasops.png';
import '../../assets/styles/sidebar.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import env from '../../config/env';
import { toast } from 'react-toastify';

function Sidebar() {
    const [compress, setCompress] = useState(false);
    const navigate = useNavigate();

    const ownertTabs = [
        {
            order: 2,
            id: 'hotels',
            Icon: RiHotelFill,
            title: 'Hotels',
            path: '/hotels'
        },
        {
            order: 3,
            id: 'invites',
            Icon: BsEnvelopePlusFill,
            title: 'Invites',
            path: '/invites'
        },
        {
            order: 4,
            id: 'manager',
            Icon: FaUserTie,
            title: 'Managers',
            path: '/manager'
        }
    ];

    const managerTabs = [
        {
            order: 5,
            id: 'menu',
            Icon: MdOutlineRestaurantMenu,
            title: 'Menu',
            path: '/menu'
        },
        {
            order: 6,
            id: 'tables',
            Icon: PiArmchairFill,
            title: 'Tables',
            path: '/tables'
        },
        {
            order: 7,
            id: 'orders',
            Icon: MdOutlineAttachMoney,
            title: 'Orders',
            path: '/orders'
        }
    ];

    const commonTabs = [
        {
            order: 1,
            id: 'dashboard',
            Icon: MdOutlineDashboardCustomize,
            title: 'Dashboard',
            path: '/dashboard'
        },
        {
            order: 8,
            id: 'settings',
            Icon: IoMdSettings,
            title: 'Settings',
            path: '/settings'
        }
    ];

    const handleClick = (item) => {
        navigate(item.path);
    };

    let tabs = [];
    try {
        const viewData = JSON.parse(
            CryptoJS.AES.decrypt(localStorage.getItem('data'), env.cryptoSecret).toString(CryptoJS.enc.Utf8)
        );
        tabs =
            Object.keys(viewData).length === 1 && viewData.role.toLowerCase() === 'owner'
                ? [...ownertTabs, ...commonTabs].sort((a, b) => a.order - b.order)
                : [...managerTabs, ...commonTabs].sort((a, b) => a.order - b.order);
    } catch (error) {
        toast.error('Oops! Something went wrong. Please try logging in again.');
        localStorage.clear();
    }

    return (
        <>
            <div
                data-testid="sidebar-testId"
                className={`otm-sidebar ${compress ? 'compressed-sidebar' : 'full-sidebar'}`}
            >
                <div className={`d-flex my-4 align-items-center ${compress ? 'flex-column' : 'flex-row'}`}>
                    <div
                        className={`d-flex align-items-center justify-content-center w-100 ${compress ? 'order-2' : 'order-1'}`}
                    >
                        <img src={Logo} height={60} className={compress ? 'mt-2' : 'mx-2'} />
                        <h3 className={`text-white m-0 ${compress && 'd-none'}`}>Rasops</h3>
                    </div>
                    <div
                        className={`arrow ${compress ? 'arrow-compress order-1' : 'arrow-full order-2'}`}
                        onClick={() => {
                            setCompress(!compress);
                        }}
                    >
                        {compress ? (
                            <IoMdArrowRoundForward
                                data-testid="arrow-forward"
                                size={20}
                                color="white"
                                className="m-auto"
                            />
                        ) : (
                            <IoMdArrowRoundBack data-testid="arrow-back" size={20} color="white" className="m-auto" />
                        )}
                    </div>
                </div>
                <ul className="p-0">
                    {tabs.map((item) => {
                        const { Icon, title, id, path } = item;
                        return (
                            <OverlayTrigger
                                key={`${title}-${id}`}
                                overlay={compress ? <Tooltip id={id}>{title}</Tooltip> : <></>}
                                placement="right"
                                delayShow={300}
                                delayHide={150}
                            >
                                <li
                                    data-testid={`test-${id}`}
                                    onClick={() => handleClick(item)}
                                    className={`d-flex align-items-center container ${window.location.pathname === path && 'active'}`}
                                >
                                    <Icon size={25} className={`${compress ? 'm-0' : 'ms-4'}`} />
                                    <h6 className={`m-0 mx-auto ${compress ? 'd-none' : 'd-block'}`}>{title}</h6>
                                </li>
                            </OverlayTrigger>
                        );
                    })}
                </ul>
            </div>
            <div className={`main-container ${compress ? 'main-container-compress' : 'main-container-full'}`}>
                <Outlet />
            </div>
        </>
    );
}

export default Sidebar;
