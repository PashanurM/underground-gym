import type { StaticPage } from "@/lib/types";

export const staticPages: StaticPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    content: `Forge Athletics respects your privacy. This demo site stores account and booking data locally in your browser for demonstration purposes only.

We do not transmit personal information to a production server in this frontend-only build. In a live deployment, we would outline data controllers, retention periods, cookie use, and your rights under applicable privacy law.

Contact hello@forgeathletics.com for privacy questions.`,
  },
  {
    slug: "terms",
    title: "Terms of Service",
    content: `By using Forge Athletics digital services, you agree to train responsibly and follow facility rules.

Memberships are non-transferable. Bookings may be cancelled according to the policy shown at checkout. Training carries inherent risk—consult a physician before starting a new program.

This frontend demo is for presentation purposes and does not create a binding commercial contract.`,
  },
  {
    slug: "amenities",
    title: "Amenities",
    content: `Forge Athletics includes a full strength floor, cycle studio, combat bay, and recovery suite.

Day lockers, showers, filtered water, and towel service are available. Members on Forge and Elite plans receive recovery suite access and priority class booking.

Wifi covers the lounge and recovery areas. Guest passes depend on your membership tier.`,
  },
];

export function getPageBySlug(slug: string) {
  return staticPages.find((p) => p.slug === slug);
}
