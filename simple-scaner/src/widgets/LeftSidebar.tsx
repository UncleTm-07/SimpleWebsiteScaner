import React from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RouterNames} from "@/shared/enums/RouterNames.ts";
import {GoGraph} from "react-icons/go";
import {GiEyeTarget} from "react-icons/gi";


export const sidebarLinks = [
    {
        imgName: "target",
        route: RouterNames.SCANS.to,
        label: RouterNames.SCANS.titleUA,
    },
    {
        imgName: "graph",
        route: RouterNames.RISKS.to,
        label: RouterNames.RISKS.titleUA,
    },
];

const LeftSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <nav className={"w-[15%]"}>
            <div className={"flex flex-col gap-11"}>
                <ul className={"flex flex-col gap-6"}>
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;

                        return (
                            <li key={link.label} className={`${isActive && 'bg-green-200'}`}>
                                <NavLink
                                    to={link.route}
                                    className={"flex gap-4 items-center p-4"}
                                >
                                    {
                                        link.imgName === "target" ?
                                            <GiEyeTarget />
                                            :
                                            <GoGraph />
                                    }
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default LeftSidebar;