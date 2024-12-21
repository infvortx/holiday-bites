export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-control">
      <label className="label">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="textarea textarea-bordered"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="input input-bordered"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
