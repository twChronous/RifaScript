import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SLOTS } from "@/_api/queries";

interface Slot {
  slots: number[];
}

interface Data {
  buyers: Slot[];
}

export function GetSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const { loading, error, data } = useQuery<Data>(GET_SLOTS);

  useEffect(() => {
    if (data && !loading) {
      setSlots(data.buyers);
    }
  }, [data, loading]);

  function checkSlotAvailability(slotNumber: number): boolean {
    for (let buyer of slots) {
      if (buyer.slots.includes(slotNumber)) {
        return false;
      }
    }

    return true;
  }

  return checkSlotAvailability;
}
