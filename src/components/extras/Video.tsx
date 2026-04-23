import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RetroTv from "../componentsInicio/RetroTv";
import { fetchSeccion_2, fetchSeccion_3 } from "../../services/koha-service";

interface SeccionVideo {
  link: string;
  videos_recomendados?: string[];
}

export default function VideoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<SeccionVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<string[]>([]);

  const section = searchParams.get("section") ?? "2";

  useEffect(() => {
    const load = async () => {
      const res = section === "3" ? await fetchSeccion_3() : await fetchSeccion_2();
      setData(res);
      setRelatedVideos(res?.videos_recomendados ?? []);
    };
    load();
  }, [section]);

  const toEmbedUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    if (url.includes("youtube.com/embed/")) return url;

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    return url;
  };

  const currentUrl = searchParams.get("url") ?? data?.link ?? relatedVideos[0];
  const embedUrl = toEmbedUrl(currentUrl);

  const handleSelectVideo = (selectedUrl: string) => {
    setRelatedVideos((prev) =>
      prev.map((url) => (url === selectedUrl ? currentUrl! : url))
    );
    setSearchParams({ section, url: selectedUrl }, { replace: true });
  };

  return (
    <RetroTv
      videoUrl={embedUrl}
      relatedVideos={relatedVideos}
      onSelectVideo={handleSelectVideo}
    />
  );
}
