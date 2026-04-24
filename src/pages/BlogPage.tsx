import { useEffect, useState } from "react";
import { fetchSeccion_3 } from "../services/koha-service";
import EditorialHero from "../components/extras/EditorialNavbar";

interface BlogData {
    titulo: string;
    blog: string;
}

export default function BlogPage() {
    const [data, setData] = useState<BlogData | null>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetchSeccion_3();
            setData(res);
        };
        load();
    }, []);

    if (!data) return <div>Cargando...</div>;

    return (
        <div>
            <EditorialHero />
            <section className="max-w-4xl mx-auto px-4 py-10">

                <h1 className="text-3xl font-black mb-6">{data.titulo}</h1>

                <div
                    className="mt-3 text-sm leading-6 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: data.blog }}
                />
            </section>
        </div>
    );
}
