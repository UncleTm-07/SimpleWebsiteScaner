import React from 'react';
import zcu_ico from "@/assets/ico/zcu.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Outlet, useNavigate} from "react-router-dom";
import LeftSidebar from "@/widgets/LeftSidebar.tsx";
import {RouterNames} from "@/shared/enums/RouterNames.ts";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios";

export const formSchema = z.object({
    type: z
        .string({
            required_error: "Please select a type of Scan fot cont..",
        }),
    target: z
        .string({
            required_error: "Please enter a url for cont..",
        }),
})

const MainPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            target: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        const scanBody = {
            name: values.type === 'tcp' || values.type === "udp" ? "Nmap" : "OWASP ZAP",
            type: values.type,
            target: values.target,
            status: "pending",
        }
        console.log(scanBody)
        axios.post('http://localhost:8000/scans', scanBody).then(() => {
            window.location.href = "/scans"
        })
    }

    const navigate = useNavigate();
    return (
        <div className={"flex flex-col h-screen"}>
            <header className={"flex gap-4 place-content-between p-2 items-center"}>
                <Avatar className={"flex-none w-16 h-16"} onClick={() => navigate(RouterNames.HOME.to)}>
                    <AvatarImage src={zcu_ico}/>
                    <AvatarFallback>WEBSITE ICO</AvatarFallback>
                </Avatar>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className={"bg-slate-900 text-white"} variant="outline">+ New Scan</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[825px]">
                        <DialogHeader>
                            <DialogTitle>Scan results</DialogTitle>
                            <DialogDescription>
                                This modal window for add new scan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} required={true}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a type of scan" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="tcp">Nmap TCP</SelectItem>
                                                        <SelectItem value="udp">Nmap UDP</SelectItem>
                                                        <SelectItem value="ssti">OWASP ZAP SSTI</SelectItem>
                                                        <SelectItem value="rce">OWASP ZAP RCE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select a type of scan
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                    )}/>
                                    <FormField
                                        control={form.control}
                                        name="target"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10.10.10.100" {...field} required={true}/>
                                                </FormControl>
                                                <FormDescription>
                                                    This is target that will be scan.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </header>
            <main className={"w-full flex gap-10 py-10 px-5 "}>
                <LeftSidebar/>
                <section className={"flex flex-1 h-full"}>
                    <Outlet/>
                </section>
            </main>
        </div>
    );
};

export default MainPage;