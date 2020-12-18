/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const PictureModal = ({
  modalOpen,
  toggleModal,
  defaultTitle = '',
  defaultDescription = '',
  defaultUrl = '',
  tripId,
  fireMutation = () => {},
}: {
  modalOpen: boolean;
  toggleModal: () => void;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultUrl?: string;
  tripId: number;
  fireMutation?: () => void;
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [url, setUrl] = useState(defaultUrl);

  const apiUrl = `/api/trips/${tripId}/create_picture`;

  const actOnClic = async () => {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, url }),
    });
    fireMutation();
    toggleModal();
  };

  return (
    <Transition
      show={modalOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div ref={ref} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              show={modalOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {(refSub) => (
                <div
                  ref={refSub}
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75" />
                </div>
              )}
            </Transition>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition
              show={modalOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {(refSub) => (
                <div
                  ref={refSub}
                  className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <form className="space-y-8 divide-y divide-gray-200">
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                          <div>
                            <div>
                              <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Add a new Picture to your trip.
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Show some highlights from your trip to make jaws
                                drop ;)
                              </p>
                            </div>

                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="title"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Title
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                  <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    value={title}
                                    onChange={(e) =>
                                      setTitle(e.currentTarget.value)
                                    }
                                    placeholder="Yet another mountain"
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Description
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                  <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.currentTarget.value)
                                    }
                                    placeholder="Look at this beautiful view!!11!"
                                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                  />
                                  <p className="mt-2 text-sm text-gray-500">
                                    Describe your picture in a few sentences.
                                  </p>
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="url"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Picture url
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                  <input
                                    id="url"
                                    name="url"
                                    type="text"
                                    value={url}
                                    onChange={(e) =>
                                      setUrl(e.currentTarget.value)
                                    }
                                    placeholder="https://static.wikia.nocookie.net/florrio/images/3/3e/N3V3R_G0NN4_G1V3_Y0U_UP.jpg/revision/latest?cb=20200702215034"
                                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      onClick={actOnClic}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PictureModal;
