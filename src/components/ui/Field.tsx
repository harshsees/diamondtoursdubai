import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "w-full rounded-sm border bg-canvas px-4 text-[0.9375rem] text-ink placeholder:text-ink-3/80 " +
  "transition-colors duration-200 ease-out focus:outline-none focus:ring-0";

const state = (invalid?: boolean) =>
  invalid
    ? "border-danger focus:border-danger"
    : "border-line-strong hover:border-ink-3 focus:border-accent";

type Base = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  /** Renders the optional marker instead of the required asterisk. */
  optional?: boolean;
};

function Wrapper({
  label,
  name,
  error,
  hint,
  optional,
  children,
}: Base & { children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 flex items-baseline justify-between gap-3 text-[0.8125rem] font-semibold text-ink"
      >
        <span>{label}</span>
        {optional ? (
          <span className="text-[0.75rem] font-normal text-ink-3">Optional</span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-2 text-[0.8125rem] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="mt-2 text-[0.8125rem] text-ink-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `${name}-error` : hint ? `${name}-hint` : undefined;

export function TextField({
  label,
  name,
  error,
  hint,
  optional,
  ...props
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} optional={optional}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={`${control} ${state(Boolean(error))} h-12`}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  optional,
  rows = 5,
  ...props
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} optional={optional}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={`${control} ${state(Boolean(error))} resize-y py-3 leading-relaxed`}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  optional,
  children,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} optional={optional}>
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={`${control} ${state(Boolean(error))} h-12 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22%2355585c%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11`}
        {...props}
      >
        {children}
      </select>
    </Wrapper>
  );
}
