'use client';

//TODO: Delete this file, just used to see error page in action
export default function TriggerServerError() {
  throw new Error(
    'It looks like there was a server error. This particular error was triggered on purpose to show this page so when there will be a real error on server this message will show actual error message to give some information what happened.',
  );
  return <div>Should show error page.</div>;
}
