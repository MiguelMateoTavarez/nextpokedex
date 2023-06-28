import { Button, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router";

export const Navbar = () => {

    const { theme } = useTheme();
    
    const router = useRouter();

    const homeRoute = () => {
        router.push('/');
    }

    const favoriteRoute = () => {
        router.push('/favorites');
    }

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 20px',
            backgroundColor: theme?.colors.gray200.value
        }}>

            <div onClick={homeRoute} style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                cursor: 'pointer'
            }}>
                <Image
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'}
                    alt="Pokemon sprite"
                    width={90}
                    height={70}
                />
                <Text color="white" h2>P</Text>
                <Text color="white" h3>okemon</Text>
            </div>


            <Spacer css={{ flex: 1 }} />

            <Button onClick={favoriteRoute} rounded color={"gradient"}>
                <Text color="white">Favoritos</Text>
            </Button>
        </div>
    )
}
