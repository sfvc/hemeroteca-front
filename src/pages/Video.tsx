import { useSearchParams } from "react-router-dom";
import RetroTv from "../components/extrasFijos/RetroTv";

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("url") ?? undefined;

  const toEmbedUrl = (url?: string): string | undefined => {
    if (!url) return undefined;

    if (url.includes("youtube.com/embed/")) return url;

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    return url;
  };

  const embedUrl = toEmbedUrl(videoUrl);

  return <RetroTv videoUrl={embedUrl} />;
}
