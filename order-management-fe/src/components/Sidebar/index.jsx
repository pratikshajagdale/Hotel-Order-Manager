import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdSettings, IoMdArrowRoundForward } from "react-icons/io";
import { MdOutlineDashboardCustomize, MdOutlineRestaurantMenu, MdOutlineAttachMoney } from "react-icons/md";
import { PiArmchairFill } from "react-icons/pi";

import Logo from "../../assets/images/omt.png";
import "../../assets/styles/sidebar.css";

function Sidebar() {
    const [active, setActive] = useState(0);
    const [compress, setCompress] = useState(true)

    const tabs = [
        { Icon: MdOutlineDashboardCustomize, title: 'Dashboard', index: 0 },
        { Icon: MdOutlineRestaurantMenu, title: 'Menu', index: 1 },
        { Icon: PiArmchairFill, title: 'Tables', index: 2 },
        { Icon: MdOutlineAttachMoney, title: 'Orders', index: 3 },
        { Icon: IoMdSettings, title: 'Settings', index: 4 },
    ]

    const handleClick = (index) => {
        setActive(index);
    }

    return (
        <>
            <div className={`otm-sidebar ${compress ? 'compressed-sidebar' : 'full-sidebar'}`}>
                <div className={`d-flex my-4 align-items-center ${compress ? 'flex-column' : 'flex-row'}`}>
                    <div className={`d-flex align-items-center justify-content-center w-100 ${compress ? 'order-2' : 'order-1'}`}>
                        <img src={Logo} height={60} className={ compress ? 'mt-2' : 'm-0'}/>
                        <h3 className={`text-white m-0 ${compress && 'd-none'}`}>OMT</h3>
                    </div>
                    <div
                        className={`arrow ${compress ? 'arrow-compress order-1' : 'arrow-full order-2'}`}
                        onClick={() => { setCompress(!compress) }}
                    >
                        {
                            compress ?
                                <IoMdArrowRoundForward
                                    size={20}
                                    color="white"
                                    className="m-auto"
                                /> :
                                <IoMdArrowRoundBack
                                    size={20}
                                    color="white"
                                    className="m-auto"
                                />

                        }
                    </div>
                </div>
                <ul className="p-0">
                    {
                        tabs.map((item) => {
                            const { Icon, title, index } = item;
                            return (
                                <li
                                    key={`${title}-${index}`}
                                    onClick={() => handleClick(index)}
                                    className={`d-flex align-items-center container ${index === active && 'active'}`}
                                >
                                    <Icon size={25} className={`${compress ? 'm-0' : 'ms-4'}`} />
                                    <h6 className={`m-0 mx-auto ${compress ? 'd-none' : 'd-block'}`}>{title}</h6>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={`main-container ${ compress ? 'main-container-compress' : 'main-container-full' }`}>
                <Outlet />
            </div>

        </>
    )
}

export default Sidebar;