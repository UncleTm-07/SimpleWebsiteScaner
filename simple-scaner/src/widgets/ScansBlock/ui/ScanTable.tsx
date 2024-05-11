import React, {FC, useEffect, useState} from 'react';
import {ScansData} from "@/shared/enums/ScansData.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"


import useWebSocket from 'react-use-websocket';


interface TablePromise {
    columns: [],
    data: ScansData[]
}

const ScanTable:FC<TablePromise> = ({columns, data}) => {
    const [dataTable, setDataTable] = useState(data);
    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/scan/62.149.28.40');

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (readyState === 1) {
            console.log("WebSocket is open")
        }else {
            console.log("WebSocket is closed")
        }
    }, [readyState])


    useEffect(() => {
        if (lastMessage) {
            console.log(lastMessage.data)
            setDataTable(dataTable.map(item => {
                if (item.scanName === "Nmap TCP") {
                    console.log(1)
                    return { ...item, progress: 3 };
                }
                return item
            }));
        }
    }, [lastMessage])

    function scanning(value) {
        console.log(1)
        sendMessage('Hello, WebSocket!')
    }



    return (
        <div>
            <Collapsible>
                <CollapsibleTrigger className={"w-[100%] bg-green-100 p-5 text-green-500 hover:text-white hover:bg-green-300"}>NMAP TCP</CollapsibleTrigger>
                <CollapsibleContent className={"duration-300 w-[100%] h-[max-content] p-5 border"}>
                    <div className={"border-b-2 text-grow"}>
                        <ul className={"grid grid-cols-3 gap-4"}>
                            <li>Scan target</li>
                            <li>Status</li>
                            <li>Progress</li>
                        </ul>
                    </div>
                    <div>
                        <ul className={"grid grid-cols-3 gap-4 my-5"}>
                            <li>http://193.168.8.250</li>
                            <li>Status</li>
                            <li>Progress</li>
                        </ul>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible>
                <CollapsibleTrigger
                    className={"w-[100%] bg-green-100 p-5 text-green-500 hover:text-white hover:bg-green-300"}>NMAP UPD</CollapsibleTrigger>
                <CollapsibleContent className={"duration-300 w-[100%] h-[max-content] p-5 border"}>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default ScanTable;