import { getHoroscopesByUser } from "@/lib/actions/horoscope.action";
import ListHistory from "./components/list-history";

export default async function page() {
  const { data: items } = await getHoroscopesByUser();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <ListHistory items={items || []} />
    </div>
  );
}
