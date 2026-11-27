import { getProjects } from "@/lib/notion";
import AllProjectsView from "@/components/AllProjectsView";

export const metadata = { title: "Projects | Faril" };

export default async function AllProjects() {
  const projects = await getProjects();
  return <AllProjectsView projects={projects} />;
}