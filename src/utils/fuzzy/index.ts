export const fuzzy = (search: string, list: string[]) => {
    if (!search) {
        return [];
    }
    const searchLower = search.toLowerCase();
    const listLower = list.map((item) => item.toLowerCase());
    const matches = listLower.filter((item) => item.includes(searchLower));
    return matches.sort((a, b) => {
        const aIndex = a.indexOf(searchLower);
        const bIndex = b.indexOf(searchLower);
        if (aIndex === bIndex) {
            return a.length - b.length;
        }
        return aIndex - bIndex;
    });
};