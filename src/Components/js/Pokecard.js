import React from "react";
import { pokeTypeColor } from "./pokeTypeColor";
import "../css/Pokecard.css";

export default function Pokecard({ pokeData }) {
  return (
    <div className="poke_card">
      <div>
        <div className="poke_card-name_img">
          <span className="poke_card-number">#{pokeData.id}</span>
          <div
            className="poke_card-img"
            style={{
              "--clr-side-bg": pokeTypeColor[pokeData.types[0].type.name],
              "--clr-main-bg": pokeData.types[1]
                ? pokeTypeColor[pokeData.types[1].type.name]
                : "#ffffff80",
            }}
          >
            <img
              src={
                pokeData.sprites.other["official-artwork"].front_default ||
                "https://www.freeiconspng.com/uploads/no-image-icon-4.png"
              }
              alt={pokeData.name}
            />
          </div>
          <h3>{pokeData.name}</h3>
        </div>
        <div className="poke_card-types">
          {pokeData.types.map((stype, index) => {
            return (
              <span
                key={index}
                className="poke_card-type"
                style={{ backgroundColor: pokeTypeColor[stype.type.name] }}
              >
                {stype.type.name + " "}
              </span>
            );
          })}
        </div>
        <div className="poke_card-details">
          <div className="poke_card-details--base_exp">
            <h4>Base-Exp</h4>
            <span>{pokeData.base_experience}</span>
          </div>
          <div className="poke_card-details--sub">
            <div className="poke_card-details--weight">
              <h4>Weight</h4>
              <span>{pokeData.weight / 10} kg</span>
            </div>
            <div className="poke_card-details--height">
              <h4>Height</h4>
              <span>{pokeData.height / 10} m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
