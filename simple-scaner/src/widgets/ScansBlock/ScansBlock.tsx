import React from 'react';
import {ScansData} from "@/shared/enums/ScansData.ts";
import ScanTable from "@/widgets/ScansBlock/ui/ScanTable.tsx";

export const scans: ScansData[] = [
    {
        scanName: "Nmap UDP",
        target: "62.149.28.40",
        state: "Pending",
        progress: "0%",
        created: "",
    },
    {
        scanName: "Nmap TCP",
        target: "62.149.28.40",
        state: "Pending",
        progress: "0%",
        created: "",
    },
    {
        scanName: "OpenVAS",
        target: "62.149.28.40",
        state: "Pending",
        progress: "0%",
        created: "",
    },
    {
        scanName: "OWASP ZAP",
        target: "62.149.28.40",
        state: "Pending",
        progress: "0%",
        created: "",
    },
]

export const columns = [
    {
        accessorKey: "scanName",
        header: "Scan",
    },
    {
        accessorKey: "target",
        header: "Target",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "progress",
        header: "Progress",
    },
    {
        accessorKey: "created",
        header: "Created",
    },
]

const ScansBlock = () => {
    return (
        <div className=" py-10">
            <ScanTable columns={columns} data={scans}/>
        </div>
    );
};

export default ScansBlock;