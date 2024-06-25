"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "~/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { StoreItem } from "~/lib/types";
import { Button } from "~/components/ui/button";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  PlusCircle,
  StoreIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

interface Props extends ComponentPropsWithoutRef<typeof PopoverTrigger> {
  items: Store[];
}

export const StoreSwitcher: FC<Props> = ({ items }) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formattedItems: StoreItem[] = items.map((item) => ({
    label: item.storeName,
    value: item.storeId,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  );
  const onStoreSelect = (store: StoreItem) => {
    setOpen(true);
    router.push(`/dashboard/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-[200px] justify-between"
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
        >
          <div className="flex items-center justify-between w-full">
            <StoreIcon className="h-4 w-4" />
            <p className="ml-4 mt-0.5">
              {
                formattedItems.find((store) => store.value === params.storeId)
                  ?.label
              }
            </p>
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store" />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
