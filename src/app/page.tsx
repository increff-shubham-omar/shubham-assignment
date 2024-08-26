import { SummarySection } from "@/components/summary-section";
import { data } from "@/app/model/frontendAssignment.json";

export default function Home() {
  return (
    <>
    <section className="flex gap-6 py-4">
      <SummarySection data={data as any}/>
    </section>
    <section className="flex gap-3 py-4">
    </section>
    </>
  );
}
