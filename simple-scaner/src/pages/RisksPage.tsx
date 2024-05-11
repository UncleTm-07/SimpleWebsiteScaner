import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement,
);

export const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Diagram of scanners launch by month',
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Diagram of scanners by type',
        },
    },
};

const RisksPage = () => {

    const [data1, setData1] = useState({
        labels: ['loading'],
        datasets: [
            {
                fill: true,
                label: 'Scans',
                data: [100,],
                borderColor: 'rgb(109,238,102)',
                backgroundColor: 'rgb(190,250,187)',
            },
        ],
    })
    const [data2, setData2] = useState({
        labels: ['loading'],
        datasets: [
            {
                label: '# of count',
                data: [100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ]
    })

    useEffect(() => {
        axios.get('http://localhost:8000/scans').then((res) => {
            console.log(res.data);
            fillData1(res.data);
            fillData2(res.data);
        })
    }, []);

    function fillData1(data) {
        const labels = [];
        const groupedScans = {};
        data.map(scan => {
            const value = scan.status.split('->')[1]
            if (value) {
                const date = new Date(value);
                const monthName = date.toLocaleString('uk-UA', { month: 'long' });
                if (!labels.includes(monthName)){
                    labels.push(monthName)
                    groupedScans[monthName] = [];
                }

                groupedScans[monthName]++;
            }

        })
        console.log(labels)
        console.log(groupedScans)

        const dataset = []

        labels?.map(monthName => {
            if (groupedScans[monthName]){
                dataset.push(groupedScans[monthName])
            }
        });

        console.log(dataset)

        setData1({
            labels,
            datasets: [
                {
                    fill: true,
                    label: 'Scans',
                    data: dataset,
                    borderColor: 'rgb(109,238,102)',
                    backgroundColor: 'rgb(190,250,187)',
                },
            ],
        })
    }

    function fillData2(data) {
        const labels = ['ssti', 'tcp', 'udp', 'rce'];
        const groupedScans = {
            ssti: 0,
            tcp: 0,
            udp: 0,
            rce: 0,
        };
        data.map(scan => {
            const value = scan.type
            if (value) {
                groupedScans[value]++;
            }

        })
        console.log(labels)
        console.log(groupedScans)

        const dataset = []

        labels?.map(monthName => {
            dataset.push(groupedScans[monthName])
        });

        console.log(dataset)

        setData2({
            labels: labels,
            datasets: [
                {
                    label: '# of count',
                    data: dataset,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ]
        })

    }


    return <div className={"w-[100%] flex flex-col items-center gap-20"}>
        {data1?
            <div className={'w-[80%]'}>
                <Line options={options1} data={data1}  />
            </div>
            :
            <></>
        }
        {data2?
            <div className={'w-[50%]'}>
                <Pie options={options2} data={data2}/>
            </div>
            :
            <></>
        }
    </div>;
};



export default RisksPage;