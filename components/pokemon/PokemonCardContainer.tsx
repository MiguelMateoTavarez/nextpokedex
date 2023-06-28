import { SmallPokemon } from "@/interfaces"
import { Grid } from "@nextui-org/react"
import { FC } from "react"
import { PokemonCard } from "./PokemonCard"

interface Pokemons {
    pokemons: SmallPokemon[]
}

export const PokemonCardContainer: FC<Pokemons> = ({ pokemons }) => {
    return (
        <Grid.Container gap={2} justify="flex-start">
            {
                pokemons.map((pokemon) => {
                    return <PokemonCard key={pokemon.id} pokemon={pokemon} />
                })
            }
        </Grid.Container>
    )
}
