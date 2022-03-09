import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AvailableConsents } from "./Consents";
import css from "./GiveConsent.module.scss";

function Input({ register, label, name, placeholder, opts, errors }) {
  return (
    <label className={css.Input}>
      {label}:
      <div>
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          {...register(name, opts)}
        />

        {errors[name] && (
          <span className={css.Error}>{errors[name]?.message}</span>
        )}
      </div>
    </label>
  );
}

export function GiveConsent() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Give consent";
  }, []);

  const hasConsent =
    [
      watch("consents.newsletter"),
      watch("consents.ads"),
      watch("consents.statistics"),
    ].some((v) => v) && [watch("name"), watch("email")].every((v) => !!v);

  const onSubmit = async (data) => {
    await fetch("/consents", {
      method: "POST",
      body: JSON.stringify(data),
    });

    reset();
  };

  return (
    <form className={css.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.PersonalInfo}>
        <Input
          label="Name"
          name="name"
          placeholder="John Smith"
          opts={{ required: "Please enter your name." }}
          register={register}
          errors={errors}
        />

        <Input
          label="Email"
          name="email"
          placeholder="john.smith@example.org"
          opts={{
            required: "Please enter your email address.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email.",
            },
          }}
          register={register}
          errors={errors}
        />
      </div>

      <fieldset className={css.Consents}>
        <legend>I agree to:</legend>

        {Object.entries(AvailableConsents).map(([key, value]) => (
          <label key={key}>
            <input
              name={key}
              type="checkbox"
              {...register(`consents.${key}`)}
            />
            {" " + value}
          </label>
        ))}
      </fieldset>

      <button disabled={!hasConsent}>Give consent</button>
    </form>
  );
}
