import { notFound } from 'next/navigation';
import ProjectDetailPage from '../../../components/ProjectDetailPage';
import { PROJECTS, getProjectBySlug, type ProjectSlug } from '../../../config/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage slug={project.slug as ProjectSlug} />;
}
