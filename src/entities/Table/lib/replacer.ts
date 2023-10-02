export const replacer = (key: any, value: any) => {
    if (key === "id") return "~"
    else return value
}