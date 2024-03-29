import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
    target: z.string().url("Invalid URL, Ip address or hostname"),
    email: z.string().email("Your email is invalid"),
});


const EnterUrlForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            target: "",
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className={"flex flex-wrap justify-evenly p-10 gap-20 border hover:shadow"}>
            <div className={"flex flex-col gap-5 items-start max-w-[450px]"}>
                <span className={"text-4xl"}>
                    The
                    <strong className={"underline text-green-400"}> all-in-one </strong>
                    cybersecurity platform
                </span>
                <span className={"text-lg"}>
                    Monitor all of your website's cyber risks in one place.
                    Manage risks with dashboards, alerts, and powerful reports.
                </span>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
                    <FormField
                        control={form.control}
                        name="target"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className={"rounded-xl focus:border-green-500"} placeholder="Enter a URL, IP address or hostname" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the target you want to scan.
                                </FormDescription>
                                <FormMessage className={"text-red-600"} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className={"rounded-xl focus:border-green-500"} placeholder="examples@gmail.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    The scan results will be sent to this address.
                                </FormDescription>
                                <FormMessage className={"text-red-600"} />
                            </FormItem>
                        )}
                    />
                    <Button className={"hover:bg-green-300 duration-300 hover:text-white bg-green-100 text-green-500 rounded-xl w-[100%]"} type="submit">Search</Button>
                </form>
            </Form>
        </div>
    );
};

export default EnterUrlForm;