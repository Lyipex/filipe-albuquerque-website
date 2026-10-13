import ActionLink from "./ActionLink";
import Image from "next/image";

export type Project = {
  code: string;
  area: string;
  type: string;
  phrase: string;
  image?: { src: string; alt: string };
  url?: string;
};

// Keeps the existing data contract; optional assets/links support future expansion.
export default function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="mt-8 grid gap-7 md:grid-cols-3">
      {projects.slice(0, 3).map((project) => (
        <article key={project.code} data-project-id={project.code} className="project-card min-w-0 rounded-surface border-t border-gray pt-4">
          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-moss/10">
            {project.image ? (
              <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw" className="object-cover" />
            ) : (
              <div className="px-5 text-center text-moss">
                <span aria-hidden="true" className="font-editorial text-5xl italic">{project.code}</span>
                <p className="mt-3 text-xs">Projeto conceito · sem imagem disponível</p>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-label text-moss">Projeto conceito</p>
          <h3 className="mt-2 text-2xl font-medium leading-tight tracking-title">{project.area}</h3>
          <p className="mt-2 text-sm text-ink/80">{project.type}</p>
          <p className="mt-3 text-sm leading-6 text-ink/80">{project.phrase}</p>
          {project.url && <ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-3" aria-label={`Ver projeto ${project.area} (abre em nova aba)`}>Ver projeto <span aria-hidden="true">↗</span></ActionLink>}
        </article>
      ))}
    </div>
  );
}
