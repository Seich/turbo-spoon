import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Give consent";
  }, []);

  const hasConsent =
    [watch("newsletter"), watch("ads"), watch("statistics")].some((v) => v) &&
    [watch("name"), watch("email")].every((v) => !!v);

  const onSubmit = (data) => console.log(data);

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

        <label>
          <input
            name="newsletter"
            type="checkbox"
            {...register("newsletter")}
          />{" "}
          Receive newsletter
        </label>

        <label>
          <input name="ads" type="checkbox" {...register("ads")} /> Be shown
          targeted ads
        </label>

        <label>
          <input
            name="statistics"
            type="checkbox"
            {...register("statistics")}
          />{" "}
          Contribute to anonymous visit statistics
        </label>
      </fieldset>

      <button disabled={!hasConsent}>Give consent</button>
    </form>
  );
}
