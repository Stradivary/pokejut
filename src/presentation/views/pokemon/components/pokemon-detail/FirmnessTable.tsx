import { Table } from "@mantine/core";


export const FirmnessTable = ({ modifier }: { modifier: number; }) => {
  return (
    <Table mt={16}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Firmness Berry</Table.Th>
          <Table.Th>Weight Increase</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {[
          { firmness: "very-soft", weight: 2 },
          { firmness: "soft", weight: 3 },
          { firmness: "hard", weight: 4 },
          { firmness: "very-hard", weight: 5 },
          { firmness: "super-hard", weight: 10 },
          { firmness: "others", weight: 1 },
        ].map(({ firmness, weight }) => (
          <Table.Tr key={firmness}>
            <Table.Td>{firmness}</Table.Td>
            <Table.Td>{weight * modifier}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
