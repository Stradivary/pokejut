
import { Barbell, Lightning, Ruler } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { pokemonData } from "../../utils/constants";
import { Button } from "@mantine/core";
import "./style.scss";

type CardPokeProps = {
  id: number;
  img: string;
  name: string;
  types: any;
  weight: number;
  height: number;
};

export default function CardPoke({ img, name, types, weight, height }: CardPokeProps) {
  const [color, setColor] = useState<string | undefined>("#fff");

  function getColorByType(pokemonType: string) {
    const foundPokemon = pokemonData.find(
      (pokemon) => pokemon.type === pokemonType
    );
    if (foundPokemon) {
      return foundPokemon.color;
    } else {
      return undefined;
    }
  }

  const Color = getColorByType(types[0].type.name);

  useEffect(() => {
    setColor(Color);
  }, []);

  return (

    <div
      className="card-poke"
      style={{
        backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
      }}

    >
      <div className="card-poke-img">
        {img ? (
          <img
            className=" inner-element"
            loading="lazy"
            draggable={false}
            width="280"
            src={img}
          />
        ) : (
          <img
            className=" inner-element"
            loading="lazy"
            draggable={false}
            width="280"
            src="/pokenull.png"
          />
        )}
      </div>

      <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <span className="pokemon-name py-2">{name}</span>
        <div className="d-flex gap-1 py-1">
          {types.map((item: any, i: number) => {
            return (
              <span key={i} className={item.type.name}>
                <img
                  loading="lazy"
                  width={18}
                  src={`/icons/${item.type.name}.svg`}
                  alt={item.type.name}
                />
                {item.type.name}
              </span>
            );
          })}
        </div>

        <div className="d-flex aling-items-center justify-content-between w-100 pt-3">
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <span className="pokemon-stats">
              {height / 10} M
            </span>
            <p className="d-flex align-items-center m-0">
              <Ruler size={24} weight="duotone" /> Altura
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center w-100">
            <span className="pokemon-stats">
              {weight / 10} Kg
            </span>
            <p className="d-flex align-items-center m-0">
              <Barbell size={24} weight="duotone" /> Peso
            </p>
          </div>
        </div>

        <div className="d-none d-flex align-items-center justify-content-center mt-4 w-100">
          <Button
            variant="light"
            type="button"
            title="Mais detalhes"
            leftSection={<Lightning size={24} weight="duotone" />}

          />
        </div>
      </div>
    </div>
  );
}
