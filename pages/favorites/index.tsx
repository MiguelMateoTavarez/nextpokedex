import { useEffect, useState } from "react";
import { FavoritePokemons } from "@/components/pokemon";
import { Layout } from "@/components/layouts"
import { localFavorites } from "@/utils";
import { NoFavorites } from "@/components/ui";

export const Favorites = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons())
    }, [])


    return (
        <Layout title={'Favorites pokemons'}>

            {
                favoritePokemons.length === 0
                    ? (<NoFavorites />)
                    : (<FavoritePokemons pokemons={favoritePokemons} />)
            }

        </Layout>
    )
}

export default Favorites;
