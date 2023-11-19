export function getYearsList(currentYear) {
    const years = []
    for(let i = 0; i < 100; i++) {
        years.push(currentYear - i)
    }
    return years
}