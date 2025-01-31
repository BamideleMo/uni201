import { Field } from "solid-form-handler";
import { Show, splitProps } from "solid-js";

export default function TextArea(props) {
  const [local, rest] = splitProps(props, [
    "label",
    "formHandler",
    "required",
    "type",
    "max",
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
          <textarea
            {...rest}
            {...field.props}
            classList={{
              "is-invalid": field.helpers.error,
              "form-control": true,
            }}
            maxlength={props.max}
            type={props.type}
            class="text-slate-600 w-full block border border-white outline-none bg-white p-0 h-20 placeholder:text-blue-300"
          ></textarea>
        </div>
      )}
    />
  );
}
