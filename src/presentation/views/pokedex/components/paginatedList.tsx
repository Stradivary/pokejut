import React from 'react';
import CardAddPokemon from './cardAddPokemon';

export const PaginatedList = ({ pages }: { pages: any[]; }) => pages.map((page, index: number) => (
    <React.Fragment key={index + '-page'}>
        {page?.results?.map(({ name, types }: { [key: string]: any; }, index: number) => (
            <CardAddPokemon
                key={name + '-card-' + index}
                pokemonName={name}
                pokemonType={types} />
        ))}
    </React.Fragment>
));
