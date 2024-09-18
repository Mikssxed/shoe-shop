'use client';

//TODO: Delete this file, just used to see error page in action
export default function TriggerServerError() {
  throw new Error(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam turpis magna, lobortis at ullamcorper et, eleifend eu nisi. Aenean quis felis in urna tempus sagittis nec eget augue. Phasellus mi tortor, eleifend iaculis eleifend nec, viverra non ex. Morbi porta diam non erat dapibus semper. Cras id feugiat sapien, a egestas nunc.',
  );
  return <div>Should show error page.</div>;
}
