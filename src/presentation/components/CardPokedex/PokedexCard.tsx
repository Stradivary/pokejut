import { Card, Title, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemonGetByName } from "@/domain/repository/pokemons";
import { pokemonData } from "@/utils/constants";
import "./style.scss";

export default function CardPokedex({
  pokemonName,
}: {
  pokemonName: string;
}) {
  const [color, setColor] = useState<string | null>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);
  function getColorByType(pokemonType: string) {
    const foundPokemon = pokemonData.find(
      (pokemon) => pokemon?.type === pokemonType
    );
    if (foundPokemon) {
      return foundPokemon?.color;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (pokemon) {
      const Color = getColorByType(pokemon ? pokemon?.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemon]);

  return (
    <Tooltip label={`required weight: ${pokemon?.weight}kg`
    } position="bottom">
      <Card
        key={pokemon?.name}
        className="card-pokedex"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
        }}
      >
        <img
          loading="lazy"
          draggable={false}
          src={
            pokemon?.sprites.other["official-artwork"].front_default
              ? pokemon?.sprites.other["official-artwork"].front_default
              : "/pokenull.png"
          }
          alt="Pokemon"
        />

        <Title order={5} style={{ textAlign: "center" }}>
          {pokemon?.name}
        </Title>
      </Card>
    </Tooltip >
  );
}
