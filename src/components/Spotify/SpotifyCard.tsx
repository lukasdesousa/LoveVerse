import { Spotify } from "react-spotify-embed";

interface SpotifyCardProps {
    link: string;
}

export const SpotifyCard: React.FC<SpotifyCardProps> = ({ link }) => {
    return (
        <div style={{width: '100%', margin: 'auto'}}>
            <Spotify allow="autoplay, encrypted-media, fullscreen" width='100%' height={200} link={link}  />
        </div>
    )
}