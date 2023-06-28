import { FC } from "react"
import Head from "next/head"

import { Navbar } from "../ui";

interface Props {
    children: React.ReactNode;
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {

    const origin = (typeof window !== 'undefined' && window.location.origin);

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Miguel Mateo" />
                <meta name="description" content={`Information about the pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                
                <meta property="og:title" content={`Information about ${title}`} />
                <meta property="og:description" content={`This is a page about ${title}`} />
                <meta property="og:image" content={`${origin}/imgs/banner.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
