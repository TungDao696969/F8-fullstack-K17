import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  firtName: z
    .string()
    .min(1, {
      message: "Tên không được để trống",
    })
    .trim(),

  lastName: z
    .string()
    .min(1, {
      message: "Tên không được để trông",
    })
    .trim(),
  age: z.coerce.number().min(1, {
    message: "Tuổi không được để trống",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email không được để trống",
    })
    .pipe(
      z.email({
        message: "Email không đúng định dạng",
      }),
    ),
});

const schema2 = (firstName = "") =>
  z.object({
    useName: z
      .string()
      .min(1, { message: "Username không được để trống" })
      .refine(
        (val) =>
          !firstName || val.toLowerCase().includes(firstName.toLowerCase()),
        {
          message: `Username phải chứa first name (${firstName})`,
        },
      ),
  });

const getSchemaByStep = (step, formData) => {
  if (step === 1) return schema;

  if (step === 2) {
    return schema2(formData.firtName || "");
  }

  return z.object({});
};

const ProgressBar = ({ step, total }) => {
  const percent = (step / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(getSchemaByStep(step, formData)),
    mode: "onChange",
    defaultValues: formData,
    shouldUnregister: false,
  });

  const getStep = (newStep) => {
    setStep(newStep);
    localStorage.setItem("form_step", newStep);
  };

  const onSubmit = async () => {
    const values = getValues(); // đổi tên biến
    setFormData((prev) => ({ ...prev, ...values }));

    if (step === 3) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        getStep(4);
      }, 2000);

      return;
    }
    getStep(step + 1);
  };

  const onPrevious = () => {
    getStep(step - 1);
  };

  // chặn phím
  const handleKeyDown = (e) => {
    if (
      (e.key >= "0" && e.key <= "9") ||
      ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      return;
    }
    e.preventDefault();
  };

  // SAVE
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem("form_data", JSON.stringify(formData));
    }
  }, [formData]);

  // LOAD
  useEffect(() => {
    const savedStep = localStorage.getItem("form_step");
    const savedData = localStorage.getItem("form_data");

    if (savedStep && savedData) {
      const ok = confirm("Bạn có muốn tiếp tục form không?");

      if (ok) {
        setStep(Number(savedStep));
        setFormData(JSON.parse(savedData));
      } else {
        localStorage.removeItem("form_step");
        localStorage.removeItem("form_data");
      }
    }
  }, []);

  useEffect(() => {
    reset(formData);
  }, [formData]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="w-[900px] bg-slate-800 rounded-xl p-10 shadow-xl">
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-semibold text-lg">rhf-wizard</h2>

            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-300">Step {step} / 4</p>

              <div className="flex items-center gap-2">
                <span className="text-sm">Animate</span>
                <div className="w-10 h-5 bg-indigo-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-0.5" />
                </div>
              </div>
            </div>
          </div>
          <ProgressBar step={step} total={4} />

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h3 className="text-xl font-semibold mb-8">Contact Info</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="text-sm text-gray-300">First Name</label>
                  <input
                    {...register("firtName")}
                    defaultValue=""
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600
                           focus:outline-none focus:border-indigo-500"
                  />
                  {errors?.firtName?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.firtName.message}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm text-gray-300">Last Name</label>
                  <input
                    {...register("lastName")}
                    defaultValue=""
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600
                           focus:outline-none focus:border-indigo-500"
                  />
                  {errors?.lastName?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="text-sm text-gray-300">Age</label>
                  <input
                    {...register("age")}
                    onKeyDown={handleKeyDown}
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600
                           focus:outline-none focus:border-indigo-500"
                  />
                  {errors?.age?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.age.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      },
                    })}
                    placeholder="e.g john@doe.com"
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600
                           focus:outline-none focus:border-indigo-500"
                  />
                  {errors?.email?.message && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg transition
                ${isValid ? "bg-slate-600 hover:bg-slate-500" : "bg-gray-500"}`}
                >
                  ← PREVIOUS
                </button>

                <button
                  type="submit"
                  // onClick={onNext}
                  className={`px-6 py-3 rounded-lg transition
                ${
                  isValid ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-500"
                }`}
                >
                  NEXT →
                </button>
              </div>
            </>
          )}

          {/* step 2 */}
          {step === 2 && (
            <div>
              <h3 className="text-xl mb-8 font-bold">Username</h3>
              <p className="text-sm text-gray-500 mb-8">
                Username should include your first name. This step is to
                demonstrate that we can validate field based on what user typed
                in the previous step.
              </p>
              <input
                {...register("useName")}
                className="border border-gray-700 rounded bg-gray-700 w-full p-3"
                placeholder="Enter username..."
              />

              {errors?.useName?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.useName.message}
                </p>
              )}

              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-500"
                >
                  ← PREVIOUS
                </button>

                <button
                  type="submit"
                  // onClick={onNext}
                  className={`px-6 py-3 rounded-lg transition
                ${
                  isValid ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-500"
                }`}
                >
                  NEXT →
                </button>
              </div>
            </div>
          )}

          {/* step 3 */}
          {step === 3 && (
            <div>
              <h3 className="text-xl mb-8 font-bold">Async</h3>
              <p className="text-sm text-gray-500 mb-8">
                Pressing "Next" does async operation that takes 2 seconds before
                we proceed to the next step.
              </p>

              <div className="flex justify-between mt-12">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-500"
                >
                  ← PREVIOUS
                </button>

                <button
                  type="submit"
                  // onClick={onNext}
                  disabled={loading}
                  className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2"
                >
                  {loading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? "NEXT..." : "NEXT →"}
                </button>
              </div>
            </div>
          )}

          {/* step 4 */}
          {step === 4 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
              <p className="text-gray-400 mb-6">
                You did it{" "}
                <span className="font-semibold">{formData.useName}</span>!
              </p>

              <p className="mb-3 text-sm text-gray-400">Here's your input:</p>

              {/* JSON Preview */}
              <pre className="bg-black p-5 rounded-lg text-green-400 text-sm overflow-auto">
                {JSON.stringify(
                  {
                    firstName: formData.firtName,
                    lastName: formData.lastName,
                    age: formData.age,
                    email: formData.email,
                    username: formData.useName,
                  },
                  null,
                  2,
                )}
              </pre>

              {/* Buttons */}
              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="px-6 py-3 rounded bg-blue-600 hover:bg-slate-500"
                >
                  ← PREVIOUS
                </button>

                <button
                  type="button"
                  className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-500"
                  onClick={() => alert("Submit success 🚀")}
                >
                  FINISH
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
