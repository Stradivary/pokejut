// convert tooltip to hoverCard

import { HoverCard } from "@mantine/core";

export const Tooltip = ({ label, children, ...rest }) => {
    return (
        <HoverCard {...rest}>
            <HoverCard.Target>
                {children}
            </HoverCard.Target>
            <HoverCard.Dropdown>
                {label}
            </HoverCard.Dropdown>
        </HoverCard>
    );
};