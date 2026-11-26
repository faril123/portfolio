import { cacheLife } from "next/cache";
import { projects as fallback, type Project } from "@/data/projects";

type RT = { plain_text: string }[];
type Prop = {
  title?: RT;
  rich_text?: RT;
  multi_select?: { name: string }[];
  url?: string | null;
};
type Page = { id: string; properties: Record<string, Prop> };

const text = (a?: RT) => (a ?? []).map((t) => t.plain_text).join("");
const tags = (p?: Prop) => (p?.multi_select ?? []).map((o) => o.name);

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("minutes");

  const token = process.env.NOTION_TOKEN;
  const ds = process.env.NOTION_PROJECTS_DS_ID;
  if (!token || !ds) return fallback;

  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${ds}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2025-09-03",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Order", direction: "ascending" }],
      }),
    });
    if (!res.ok) throw new Error(`Notion error ${res.status}`);

    const data = (await res.json()) as { results: Page[] };
    return data.results.map((pg) => {
      const p = pg.properties;
      const img = text(p.Image?.rich_text);
      return {
        slug: pg.id,
        title: text(p.Name?.title),
        description: text(p.Description_ID?.rich_text),
        descriptionEn: text(p.Description_EN?.rich_text),
        framework: tags(p.Framework),
        database: tags(p.Database),
        testing: tags(p.Testing),
        github: p.GitHub?.url ?? "#",
        image: img.startsWith("/") ? img : undefined,
      };
    });
  } catch (e) {
    console.error(e);
    return fallback;
  }
}