function FormInput({ label, name, type = "text", register, error }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...register(name)}
        {...(type === "file" ? { accept: "image/*" } : {})}
      />

      <div className="invalid-feedback">
        {error?.message}
      </div>
    </div>
  );
}

export default FormInput;