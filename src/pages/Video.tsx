import { useSearchParams } from "react-router-dom";
import RetroTv from "../components/extrasFijos/RetroTv";

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("url") ?? undefined;

  // Convierte cualquier URL de YouTube a formato embed
  const toEmbedUrl = (url?: string): string | undefined => {
    if (!url) return undefined;

    // Ya es embed → devolver tal cual
    if (url.includes("youtube.com/embed/")) return url;

    // https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Cualquier otra URL (Vimeo, etc.) → pasar directo
    return url;
  };

  const embedUrl = toEmbedUrl(videoUrl);

  return <RetroTv videoUrl={embedUrl} />;
}
