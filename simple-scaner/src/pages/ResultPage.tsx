import React, {useEffect, useCallback, useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import loader from "@/assets/ico/loader.svg"
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import NmapTable from "@/widgets/NmapTable.tsx";
import axios from "axios";

export const scanType = {
    tcp: "Nmap TCP",
    NMAP_UDP: "Nmap UDP",
};

const ResultPage = () => {
    // WebSockets logic
    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/scan');
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const changeUrlOfSocket = (scan) => {
            const req = {
                url: scan.target,
                type: scan.type,
                scan: scan
            }

            handleClickSendMessage(JSON.stringify(req));
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    const handleClickSendMessage = useCallback((data) => sendMessage(data), []);

    const [scans, setScans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/scans').then((res) => {
            setScans(res.data);
            console.log(res.data);
            some(res.data);
        })
    }, []);

    const some = (data) => {
        const priv_data = JSON.parse(localStorage.getItem('scans'));
        if (data?.length > 0 && priv_data?.length > 0) {
            const new_data = data.map((value, index) => {
                if (value?.id === priv_data[index]?.id) {
                    return { ...value, status: value.status, result: priv_data[index].result };
                }
                return value;
            })

            setScans(new_data);
        }else if (data?.length < 1 && priv_data?.length > 0) {
            localStorage.removeItem('scans');
        }
    }


    const updateData = (scanData, status, result) => {
        const updatedScans = scans.map(scan => {
            if (scan.id === scanData.id) {
                return { ...scan, status: status, result: result };
            }
            return scan;
        });
        setScans(updatedScans);
    }

    useEffect(() => {
        if (messageHistory.length) {
            const response = JSON.parse(messageHistory[messageHistory.length-1]?.data)?.scan_data;
            console.log(response)
            const scan_date= `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`;

            scans.some((scan) => {
                if (scan.status === "scanning") {
                    updateData(scan, `finished-${scan_date}`, response)
                }
            })

            const updatedScans = scans.map(scan => {
                if (scan.status === "scanning") {
                    return { ...scan, status: `finished-${scan_date}`, result: response };
                }
                return scan;
            });
            localStorage.setItem('scans', JSON.stringify(updatedScans))

        }
    }, [messageHistory]);

    return (
        <div className={"flex flex-col w-[70%] gap-4"}>
            {
                scans?.length > 0 ?
                    scans.map((scan, index) => (
                        <Collapsible className={"w-[100%]"} key={`${index}_scan_target_${scan._id}`}>
                            <CollapsibleTrigger className={"w-[100%] bg-green-100 text-green-400 h-[50px]"}>{scan.name} - {scan.type}</CollapsibleTrigger>
                            <CollapsibleContent className={"w-[100%] border"}>
                                <div className={"w-[100%] flex justify-end p-4 items-center"}>
                                    <Button className={"bg-red-400 hover:bg-red-200"} onClick={() => {
                                        axios.delete(`http://localhost:8000/scans/${scan.id}`).then(() => {
                                            window.location.href = "/scans"
                                        })
                                    }}>Delete</Button>
                                </div>
                                <div className={"p-10 text-center"}>
                                    <ul className={"grid grid-cols-3 gap-4"}>
                                        <li className={"border p-2"}>Target</li>
                                        <li className={"border p-2"}>State</li>
                                        <li className={"border p-2"}>Progress</li>
                                    </ul>
                                </div>
                                <div className={"px-10 pb-5"}>
                                    <ul className={"grid grid-cols-3 items-center gap-4 text-grow-200 text-zinc-600 text-center"}>
                                        <li>
                                            {scan.target}
                                        </li>
                                        <li>
                                            {scan.status}
                                        </li>
                                        <li className={"flex justify-center"}>
                                            {
                                                scan.status === "pending" ?
                                                    <Button
                                                        className={"bg-slate-900 text-white"}
                                                        disabled={readyState !== ReadyState.OPEN}
                                                        type="button" onClick={() => {
                                                        updateData(scan, "scanning", "");
                                                        changeUrlOfSocket(scan);
                                                    }}>start</Button>
                                                    :
                                                    scan.status === "scanning" ?
                                                        <Avatar className={"flex-none w-6 h-6"}>
                                                            <AvatarImage src={loader} />
                                                            <AvatarFallback>loading...</AvatarFallback>
                                                        </Avatar>
                                                        :
                                                        <NmapTable data={scan.result} type={scan.type}/>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))
                    :
                    <div className={"w-[100%] text-center text-green-400 text-2xl"}>
                        The list of scans is empty
                    </div>
            }
        </div>
    );
};

export default ResultPage;