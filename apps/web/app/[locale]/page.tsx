import { PageLayout } from "@/components/Layout/PageLayout";
import { Loader } from "@/components/Loader/Loader";
import { Logo } from "@/components/Logo";

export default async function Home() {
  return (
    <PageLayout>
      <Logo size="large" />
      <Loader />
    </PageLayout>
  );
}
