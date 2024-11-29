import { Field } from "solid-form-handler";
import { Show, splitProps } from "solid-js";

export default function TextInput(props) {
  const [local, rest] = splitProps(props, [
    "label",
    "formHandler",
    "required",
    "type",
  ]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <div class="text-sm">
          <div class="flex justify-between">
            <div>
              <Show when={local.label}>
                <label class="font-bold" for={field.props.id}>
                  {local.label}
                </label>
                <Show when={local.required}>
                  <b class="text-red-600">*</b>
                </Show>
              </Show>
            </div>
            <div>
              <Show when={field.helpers.error}>
                <div class="text-red-600">{field.helpers.errorMessage}</div>
              </Show>
            </div>
          </div>
          <input
            {...rest}
            {...field.props}
            classList={{
              "is-invalid": field.helpers.error,
              "form-control": true,
            }}
            type={props.type}
            class="text-slate-800 w-full block border border-black outline-none bg-transparent mt-0 px-2 h-12 placeholder:text-slate-400"
          />
        </div>
      )}
    />
  );
}
