
export default (text: string): string => {
    return text.replace(/\s+/g, "%20")
}