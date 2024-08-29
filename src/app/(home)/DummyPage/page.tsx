"use client";

import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

//TODO: Delete this file, just used to see delete dialog in action
export default function DummyPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Click to open delete modal</button>
      <DeleteModal
        open={open}
        name="selected item"
        onClose={() => setOpen(false)}
        onSubmit={() => console.log("Item deleted")}
      />
    </div>
  );
}
