export function displayDate(data) {
    const date = new Date(data);
    const dateNow = new Date();
    const yearDiff = dateNow.getFullYear() - date.getFullYear();
    if (yearDiff === 0) {
        const dayDiff = dateNow.getDay() - date.getDay();
        if (dayDiff === 0) {
            const hourDiff = dateNow.getHours() - date.getHours();
            if (hourDiff === 0) {
                const minuteDiff = dateNow.getMinutes() - date.getMinutes();
                if (minuteDiff >= 0 && minuteDiff < 5) return "1 минуту назад";
                if (minuteDiff >= 5 && minuteDiff < 10) return "5 минут назад";
                if (minuteDiff >= 10 && minuteDiff < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }
        return `${date.getDay()}:${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        date.getFullYear() + "." + (date.getMonth() + 1 + "." + date.getDate())
    );
}
