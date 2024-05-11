import React, {FC} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

interface NmapTableProps {
    data: any
    type: string
}

const NmapTable:FC<NmapTableProps> = ({data, type}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"bg-slate-900 text-white"} variant="outline">Scan results</Button>
            </DialogTrigger>
            {
                type !== "tcp" && type !== "upd" ?
                        <DialogContent className="sm:max-w-[825px]">
                            <DialogHeader>
                                <DialogTitle>Scan results</DialogTitle>
                                <DialogDescription>
                                    {`Target - ${data?.target} ( Scan type: ${type} )`}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-2">
                                <span>
                                    {data?.result}
                                </span>
                                <div className={"p-4"}>
                                    {
                                        data?.data?.map((value, index) => (
                                            <div key={`ssti-res-${index}`} className={"flex flex-col gap-2"}>
                                                <div>URL: {value.url}</div>
                                                <div>Body: {value.test_problem_url}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </DialogContent>
                    :
                        <DialogContent className="sm:max-w-[825px]">
                            <DialogHeader>
                                <DialogTitle>Scan results</DialogTitle>
                                <DialogDescription>
                                    {`Target - ${data?.addresses?.ipv4} ( Scan type: ${type}, Status IP: ${data?.status?.state} )`}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Port</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Reason</TableHead>
                                            <TableHead className="text-right">State</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(data?.tcp).map((port) => (
                                            <TableRow key={`nmap-tcp-${port}`}>
                                                <TableCell>{port}</TableCell>
                                                <TableCell>{data?.tcp[port].name}</TableCell>
                                                <TableCell>{data?.tcp[port].reason}</TableCell>
                                                <TableCell className="text-right">{data?.tcp[port].state}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </DialogContent>
            }
        </Dialog>

    );
};

export default NmapTable;