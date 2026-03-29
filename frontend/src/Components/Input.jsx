function InputForm({ name, label, children, error, info }) {
  return (
    <div className="w-full">
      <div className="flex w-full gap-3 bg-[#f1ebe5] rounded-md p-3 border border-[#e5ded8] items-center">
        <label htmlFor={name} className="w-16 text-[#3e3e3e] text-sm">
          {label}
        </label>

        {children}
      </div>

      <div className="h-5">
        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>

      {info}
    </div>
  );
}

export default InputForm;