export const fuzzy = (search: string, list: string[]) => {
    const results: { [key: string]: number } = {};

    const searchLength = search.length;

    list.forEach((item) => {
        const itemLength = item.length;
        let total = 0;

        for (let i = 0, j = 0; i < searchLength && j < itemLength; j++) {
            if (search[i] === item[j]) {
                i++;
                total++;
            }
        }

        if (total > 0) {
            results[item] = total;
        }
    });

    return Object.keys(results).sort((a, b) => results[b] - results[a]);
}