"use client";

import { EmailSubscriber } from "@/components";

const NewsletterSignup = () => {
  const onSubmit = (email: string) => {
    // TODO: Subscribe to newsletter
    console.log(email);

    return true;
  };

  return (
    <div className="flex flex-col gap-y-4 w-[336px]">
      <h5 className="text-labels-regular font-medium">Newsletter</h5>
      <EmailSubscriber onSubmit={onSubmit} />
      <p className="text-body-regular text-muted-dark dark:text-muted-light">
        Get a summary of what we’ve shipped during the last month, behind the
        scenes updates, and team picks. Unsubscribe any time.
      </p>
    </div>
  );
};

export default NewsletterSignup;
