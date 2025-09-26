import { notFound } from "next/navigation";
import About from "../pages/About";
import Collection from "../pages/Collection";
import Contact from "../pages/Contact";

// Use a loose params type to satisfy Next's PageProps constraints during build
const registry: Record<string, React.ComponentType> = {
  about: About,
  collection: Collection,
  contact: Contact,
};

export default function Page(props: unknown) {
  const { params } = props as { params?: { slug?: string | string[] } };
  let raw = params?.slug;
  if (Array.isArray(raw)) raw = raw[0];
  const slug = typeof raw === "string" ? raw.toLowerCase() : "";
  const Comp = registry[slug];
  if (!Comp) return notFound();
  return <Comp />;
}
