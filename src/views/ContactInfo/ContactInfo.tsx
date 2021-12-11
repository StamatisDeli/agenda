import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import Loader from "components/Loader";
import { FormType, UserType } from "types";
import * as api from "services/api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name"),
  email: Yup.string()
    .email("Please enter a valid e-mail")
    .required("Please enter an email"),
  phone: Yup.string().required("Please enter phone"),
});

export default function ContactInfo(): JSX.Element {
  const { id } = useParams<string>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const isEditingRef = React.useRef<boolean>(false);

  const { data, isLoading, isSuccess, error } = useQuery(
    ["user", id],
    () => api.getUser(id as string),
    {
      onError: () => {
        toast.error("Failed to get user data");
      },
      retry: false,
    }
  );

  const handleSubmit = async (values: FormType) => {
    try {
      setIsSaving(true);

      await api.putUser(id as string, values as FormType);

      toast.success("Successfully stored changes");
    } catch (err) {
      toast.error("Failed to submit changes");
    } finally {
      setIsSaving(false);
    }
  };

  const user = data ?? ({} as UserType);
  const hasUser = Object.keys(user).length;

  return (
    <article
      data-testid="contact-info"
      className="flex flex-col p-5 h-full flex-shrink-0 bg-white overflow-y-auto"
    >
      {isLoading && <Loader />}

      {error && !isLoading && (
        <p className="flex flex-col p-5 h-full justify-center text-center text-red-400 flex-shrink-0 bg-white overflow-y-auto">
          Error loading user
        </p>
      )}

      {isSuccess && hasUser && (
        <Formik
          initialValues={{
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            company: user.company || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm, dirty }) => {
            if (dirty) {
              isEditingRef.current = true;
            }
            return (
              <Form className="text-left flex flex-col">
                <section className="mb-5">
                  <label
                    htmlFor="name"
                    className="font-semibold text-sm text-gray-500"
                  >
                    Name
                  </label>

                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    data-testid="name-input"
                    className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </section>

                <section className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-1 font-semibold text-sm text-gray-500"
                  >
                    Email Address
                  </label>

                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email address"
                    data-testid="name-input"
                    className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </section>

                <section className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-1 font-semibold text-sm text-gray-500"
                  >
                    Phone
                  </label>

                  <Field
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter phone"
                    data-testid="phone-input"
                    className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </section>

                <section className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-1 font-semibold text-sm text-gray-500"
                  >
                    Address
                  </label>

                  <Field
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    data-testid="address-input"
                    className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </section>

                <section className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-1 font-semibold text-sm text-gray-500"
                  >
                    Company
                  </label>

                  <Field
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Enter company"
                    data-testid="company-input"
                    className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />

                  <ErrorMessage
                    name="company"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </section>

                <section className="flex w-full justify-end">
                  {isEditingRef.current && (
                    <button
                      data-testid="cancel-button"
                      type="button"
                      onClick={() => {
                        resetForm();
                        isEditingRef.current = false;
                      }}
                      className={`bg-gray-300 text-gray-600 self-end border rounded-md py-2 px-4 uppercase ml-3 font-bold`}
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    data-testid="submit-button"
                    className={`${
                      isSaving ? "bg-blue-300" : "bg-blue-500"
                    } border text-white rounded-md py-2 px-4 uppercase ml-3 font-bold`}
                    type="submit"
                    disabled={isSaving}
                  >
                    Save
                  </button>
                </section>
              </Form>
            );
          }}
        </Formik>
      )}
    </article>
  );
}
