import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Layout } from "@/components/layouts";
import { PokemonCard, PokemonCardContainer } from "@/components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const title: string = 'Pokemon list'

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title={title}>
      <PokemonCardContainer pokemons={pokemons} />
    </Layout>
  )
}

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  let pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: ++i,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;