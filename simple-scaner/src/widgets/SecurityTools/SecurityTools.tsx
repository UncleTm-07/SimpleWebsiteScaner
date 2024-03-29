import React from 'react';
import ToolsCard from "@/widgets/SecurityTools/ui/ToolsCard.tsx";

const tools = [
    {
        ico: "search",
        title: "OpenVAS",
        description: "Find insecure software and scan for Common Vulnerabilities and Exposures (CVEs).",
        url: "https://openvas.org"
    },
    {
        ico: "eye",
        title: "Nmap",
        description: "Ensure your firewall and network are configured correctly with nothing unintentionally exposed.",
        url: "https://openvas.org"
    },
    {
        ico: "thunder",
        title: "OWASP ZAP",
        description: "Focus on your web application, and detects front-end and API vulnerabilities.",
        url: "https://openvas.org"
    },
]

const SecurityTools = () => {
    return (
        <div className={"flex flex-col gap-5 items-center"}>
            <div className={"flex flex-col gap-4 text-center items-center max-w-4xl"}>
                <span className={"text-xs p-2 border text-green-500 bg-green-100 rounded-xl w-[max-content]"}>YOUR ENTIRE ATTACK SURFACE</span>
                <span className={"text-4xl"}>Leverage the industry's <strong>most trusted</strong> security tools</span>
                <span className={"text-sm"}>
                    We leverage open source vulnerability scanners to provide a solid foundation for your security.
                    The advantage? You get high-quality scanning tools that are both reliable and cost-effective,
                    backed by the flexibility to suit your specific needs.
                </span>
            </div>
            <div className={"flex flex-wrap gap-10 justify-center"}>
                {
                    tools.map((tool, index) => (
                        <ToolsCard
                            key={`Tools-${index}`}
                            ico={tool.ico}
                            title={tool.title}
                            description={tool.description}
                            url={tool.url}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default SecurityTools;