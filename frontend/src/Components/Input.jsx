function InputForm({name,label,children,error,info}) {
    return (
        <div className="w-full">
          <div className="flex w-full gap-3 bg-blue-600 rounded-md p-3 border-2 border-blue-400">
            <label htmlFor={name} className="w-10">
              {label}
            </label>

            {children}
          </div>
          <div className="h-5">
            {error && (
              <p className="text-red-500 border-b-red-500 border-b-2 w-fit">
                {error}
              </p>
            )}
          </div>
          {info}
        </div>
      );
}

export default InputForm;