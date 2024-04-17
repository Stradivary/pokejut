import { Badge, Group, Image, Text, ThemeIcon } from '@mantine/core';

export const TypeBadge = ({ data }: { data?: { type: string; color: string; img: string; }; }) => {

    if (!data) {
        return <Text c="gray">Belum ada tipe yang dipilih</Text>;
    }

    return <Group gap={8}>
        <ThemeIcon  color={data.color} c="white" size="lg" radius="xl" variant="filled">
            <Image w={32} h={32} src={data.img} alt={data.type} />
        </ThemeIcon>
        <Badge
            color={data.type === "dark" ? "gray" : data.color}
            size='lg'
            tt="capitalize"
        >
            {data.type}
        </Badge>
    </Group>;
};
