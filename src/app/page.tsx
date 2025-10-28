import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ui/ExploreBtn";

import { events } from "@/lib/constants";

const Page = () => {
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
          {events.map(event => (
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
