export default function translateDateToDisplay(period: string, date: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(period === 'yearly') {
        return date.split("-")[0];
    }
    if(period === 'monthly') {
        const monthIndex = Number(date.split("-")[1]) - 1;
        return `${months[monthIndex]} ${date.split("-")[0]}`;
    }
    if(period === 'quarterly') {
        const monthIndex = Math.floor((Number(date.split("-")[1]) - 1) / 3);
        return `Q${monthIndex + 1} ${date.split("-")[0]}`;
    }
    return date;
}