import { setRequestLocale } from "next-intl/server";
import { VideoHero } from "@/components/home/VideoHero";
import { HomeSections } from "@/components/home/HomeSections";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VideoHero />
      <HomeSections />
    </>
  );
}
