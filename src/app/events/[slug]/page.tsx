import Image from "next/image";
import { notFound } from "next/navigation";

import { getSimilarEventsBySlug } from "@/actions/event.actions";
import { IEvent } from "@/database";

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
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  console.log(similarEvents);

  const {
    event: {
      title,
      description,
      date,
      location,
      image,
      overview,
      mode,
      agenda,
      time,
      audience,
      organizer,
      tags,
    },
  } = await request.json();

  if (!title) return notFound();

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
            <BookEvent />
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

export default EventDetailsPage;
