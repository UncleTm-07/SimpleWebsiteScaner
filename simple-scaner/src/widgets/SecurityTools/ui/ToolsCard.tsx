import React, {FC} from 'react';
import {CiSearch} from "react-icons/ci";
import {FaRegEye} from "react-icons/fa";
import {AiOutlineThunderbolt} from "react-icons/ai";

interface ToolsCardProps {
    ico: string,
    title: string,
    description: string,
    url: string,
}

const ToolsCard : FC<ToolsCardProps> = ({ico, title, description, url}) => {
    return (
        <div className={"border rounded-xl p-5 w-[350px] flex flex-col gap-5 hover:shadow-xl"}>
            {
                ico === "search" ?
                    <CiSearch className={`w-14 h-14 border rounded-xl p-2 shadow-lg shadow-green-400`} />
                    :
                    ico === "eye" ?
                        <FaRegEye className={`w-14 h-14 border rounded-xl p-2 shadow-lg shadow-teal-400`} />
                        :
                        <AiOutlineThunderbolt className={`w-14 h-14 border rounded-xl p-2 shadow-lg shadow-violet-400`}/>
            }
            <span className={"text-xl font-bold"}>
                {title}
            </span>
            <span>
                {description}
            </span>
            {
                ico === "search" ?
                    <a href={url} className={`w-[max-content] font-bold hover:border-b-2 hover:border-green-400 h-[24px] duration-300`}>
                        Learn about {title}
                    </a>
                    :
                    ico === "eye" ?
                        <a href={url} className={`w-[max-content] font-bold hover:border-b-2 hover:border-teal-400 h-[24px] duration-300`}>
                            Learn about {title}
                        </a>
                        :
                        <a href={url} className={`w-[max-content] font-bold hover:border-b-2 hover:border-violet-400 h-[24px] duration-300`}>
                            Learn about {title}
                        </a>
            }
        </div>
    );
};

export default ToolsCard;