export type ScansData = {
    scanName: string,
    target: string,
    state: "Pending" | "Processing" | "Succeeded" | "Failed",
    progress: string,
    created: string,
}