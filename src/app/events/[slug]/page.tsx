import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getSimilarEventsBySlug } from "@/actions/event.actions";
import { IEvent } from "@/database";
import { title } from "process";

import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src={icon}
        alt={alt}
        width={24}
        height={24}
      />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda:</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className=" flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

const bookings = 10;

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  "use cache";
  cacheLife("hours");
  const { slug } = await params;

  let event: IEvent;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch event: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  if (!description) return notFound();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col gap-2">
            <h2>Resumen del evento:</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col gap-2">
            <h2>Detalles:</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Calendar icon"
              label={new Date(date).toLocaleDateString()}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="Clock icon"
              label={new Date(time).toLocaleTimeString()}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="Audience icon"
              label={audience}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="Location icon"
              label={location}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col gap-2">
            <h2>Acerca del organizador:</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>¡Reserva tu lugar ahora!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                {" "}
                Se han unido {bookings} personas quienes han reservado su lugar.
              </p>
            ) : (
              <p className="text-sm">Sé el primero en reservar tu lugar.</p>
            )}
            <BookEvent
              eventId={event._id}
              slug={event.slug}
            />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Eventos similares que podrían interesarte:</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard
                key={similarEvent.title}
                {...similarEvent}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
