
// @see https://github.com/thymikee/jest-preset-angular/issues/336#issuecomment-1536232102 
const attributesToClean: { [key: string]: RegExp[]; } = {
    class: [/^m-.*$/],
    id: [/^mantine-.*$/],
    for: [/^mantine-.*$/],
    name: [/^mantine-.*$/],
    'aria-describedby': [/^mantine-.*$/],
    'aria-labelledby': [/^mantine-.*$/],
    'aria-controls': [/^mantine-.*$/],
};
const attributesToCleanKeys = Object.keys(attributesToClean);
const hasAttributesToClean = (attribute: Attr) => attributesToCleanKeys.some((name) => attribute.name === name);

let lastCleanedNode: Element | null = null;

export default ({
    serialize(val, config, indentation, depth, refs, printer) {
        const clone = val.cloneNode(true) as Element;

        for (const attr of Object.values(clone.attributes).filter(hasAttributesToClean)) {
            attr.value = attr.value
                .split(' ')
                .filter((attrValue: string) => {
                    return !attributesToClean[attr.name].some((regex) => regex.test(attrValue));
                })
                .join(' ');
        }

        lastCleanedNode = clone;
        return printer(
            clone,
            config,
            indentation,
            depth,
            refs);
    },
    test: (val: Element) => val !== lastCleanedNode && val.attributes !== undefined && Object.values(val.attributes).some(hasAttributesToClean),
});
