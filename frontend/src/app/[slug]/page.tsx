import { notFound } from "next/navigation";
import About from "../pages/About";
import Collection from "../pages/Collection";
import Contact from "../pages/Contact";

type Params = { params: { slug: string } };

const registry: Record<string, React.ComponentType> = {
  about: About,
  collection: Collection,
  contact: Contact,
};

export default function Page({ params }: Params) {
  const Comp = registry[params.slug?.toLowerCase()];
  if (!Comp) return notFound();
  return <Comp />;
}
