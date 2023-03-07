import React, { useState, Fragment, useEffect, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { GrCaretDownFill, GrCheckmark } from "react-icons/gr";

const runners = [
  { id: 1, name: "htmlcs" },
  { id: 2, name: "axe" },
];

// selected runner drop down
export const RunnerSelect = ({
  cb,
  defaultRunners,
}: {
  defaultRunners?: typeof runners;
  cb?(runners: string[]): void;
}) => {
  const [selectedRunners, setSelectedRunners] = useState<typeof runners>(
    defaultRunners ?? []
  );
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (defaultRunners && !mounted.current) {
      setSelectedRunners(defaultRunners);
      mounted.current = true;
    }
  }, [defaultRunners, setSelectedRunners, mounted]);

  const onChangeEvent = (selected: typeof runners) => {
    let nextRunners: {
      id: number;
      name: string;
    }[] = [];
    if (selected.length === 3) {
      nextRunners = selected.filter((item) => item.name !== selected[2].name);
    } else if (selected.length === 2 && selected[0] === selected[1]) {
      nextRunners = [selected[0]];
    } else {
      nextRunners = selected;
    }

    setSelectedRunners(nextRunners);
    if (cb && typeof cb === "function") {
      cb(nextRunners.map((runner) => runner.name));
    }
  };

  return (
    <Listbox
      value={selectedRunners}
      onChange={onChangeEvent}
      multiple
      defaultValue={defaultRunners}
    >
      <Listbox.Label className={"text-xs sr-only"}>Runners:</Listbox.Label>
      <div className="relative space-y-1">
        <Listbox.Button className="w-full cursor-default w-32 rounded-lg border py-1 px-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
          <span className="block truncate">
            {selectedRunners.length
              ? selectedRunners.map((runner) => runner.name).join(", ")
              : "Default Runner"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <GrCaretDownFill
              className="grIcon h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute max-h-60 w-32 z-20 w-full rounded-md bg-white dark:bg-black py-1 text-base shadow-lg border focus:outline-none text-sm">
            {runners.map((runner, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-1.5 pl-10 pr-4 ${
                    active
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-900 dark:text-gray-300"
                  }`
                }
                value={runner}
              >
                {({ selected }) => {
                  const defaultSelected =
                    selected ||
                    selectedRunners.some((item) => item.name === runner.name);
                  return (
                    <>
                      <span
                        className={`block w-full truncate ${
                          defaultSelected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {runner.name}
                      </span>
                      {defaultSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <GrCheckmark
                            className="grIcon h-3 w-3"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
