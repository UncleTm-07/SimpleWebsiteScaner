import React from 'react';
import zcu_ico from "@/assets/ico/zcu.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EnterUrlForm from "@/widgets/EnterUrlForm.tsx";
import SecurityTools from "@/widgets/SecurityTools/SecurityTools.tsx";

const HomePage = () => {
    return (
        <div className={"flex flex-col h-screen"}>
            <header className={"flex gap-4 p-2"} >
                <Avatar className={"flex-none w-16 h-16"}>
                    <AvatarImage src={zcu_ico} />
                    <AvatarFallback>WEBSITE ICO</AvatarFallback>
                </Avatar>
            </header>
            <main className={"flex flex-col gap-20 py-10 px-40"}>
                <EnterUrlForm/>
                <SecurityTools/>
            </main>
        </div>
    );
};

export default HomePage;