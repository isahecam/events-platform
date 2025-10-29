"use client";

import { FormEvent, useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 500);
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
