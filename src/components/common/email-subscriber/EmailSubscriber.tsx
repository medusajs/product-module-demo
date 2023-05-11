"use client";

import { useState } from "react";

type Props = {
  onSubmit: (email: string) => boolean;
};

const EmailSubscriber = ({ onSubmit }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;

    if (!email) {
      setError("Email is required");

      return;
    }

    if (!emailRegex.test(email)) {
      setError("The email is invalid");

      return;
    }

    const success = onSubmit(email);

    if (!success) {
      setError("Something went wrong");

      return;
    }

    setSuccess(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;

    if (!email) {
      setError(null);

      return;
    }

    if (!emailRegex.test(email)) {
      setError("The email is invalid");
    } else {
      setError(null);
    }
  };

  const handleFocus = () => {
    setError(null);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-field-light dark:bg-field-dark rounded-lg flex items-center justify-between gap-x-2 px-4 py-2.5"
      >
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="flex-grow bg-transparent text-labels-regular placeholder:text-muted-light dark:placeholder:text-muted-dark outline-none text-base-light dark:text-base-dark"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="text-labels-regular font-medium text-base-light dark:text-base-dark"
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p className="text-labels-xsmall text-error-light dark:text-error-dark mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default EmailSubscriber;
