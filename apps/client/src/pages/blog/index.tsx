import { allPosts } from "contentlayer/generated";

import BlogCard from "@app/components/BlogCard";
import { withSPTranslations } from "@app/hocs/withSPTranslations";

export const getStaticProps = withSPTranslations();

export default function Blog() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {allPosts
        // .filter((p) => p.status === "published")
        .map((p: PostProps) => (
          <BlogCard
            key={p.title}
            {...p}
          />
        ))}
    </div>
  );
}