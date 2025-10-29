import { cacheLife } from "next/cache";

import { IEvent } from "@/database/event.model";

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ui/ExploreBtn";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  "use cache";
  cacheLife("minutes");
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center text-prettier">
        Los mejores eventos de Rafael Lara Grajales en un solo lugar
      </h1>
      <p className="text-center mt-5">
        Eventos Culturales, Sociales y Educativos para todos y todas.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Eventos Destacados</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
