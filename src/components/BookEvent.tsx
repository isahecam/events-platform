"use client";

import { FormEvent, useState } from "react";

import { createBooking } from "@/actions/booking.action";
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
    } else {
      console.error("Error creating booking:", error);
      posthog.captureException(error);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Gracias por reservar tu lugar!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="button-submit">
            Reservar
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
