import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import confetti from 'canvas-confetti';

import { Layout } from '@/components/layouts'
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces'
import { getPokemonInfo, localFavorites } from '@/utils';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setisInFavorites] = useState(false);
  const [favoriteButtonText, setFavoriteButtonText] = useState('Save in favorites');

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setisInFavorites(!isInFavorites);

    if( isInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin:{
        x: 0.92,
        y: 0.12,
      }
    })

  }

  useEffect(() => {
    localFavorites.existsInFavorites(pokemon.id) ? setisInFavorites(true) : setisInFavorites(false);
  }, [pokemon]);

  useEffect(() => {
    isInFavorites ? setFavoriteButtonText('In favorites') : setFavoriteButtonText('Save in favorites');
  }, [isInFavorites]);

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{
        marginTop: '5px'
      }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{
            padding: '30px'
          }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width={'100%'}
                height={200} />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                ghost={!isInFavorites}
                color={'gradient'}
                onPress={onToggleFavorite}>
                {favoriteButtonText}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value, index) => `${++index}`);

  return {
    paths: pokemons151.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}

export default PokemonPage;
