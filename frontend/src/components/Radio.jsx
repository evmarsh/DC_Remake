export const Radio = ({ id, label, defaultChecked, className }) => (
  <div className={`flex gap-2 items-start ${className}`}>
    <div className="grid place-items-center mt-1">
        <input type="radio" id={id} defaultChecked={defaultChecked}
        className="
        peer
        col-start-1 row-start-1
        shrink-0 appearance-none
        w-4 h-4 border-2 border-blue-500 rounded-full
        " 
        />
        <div className="
        pointer-events-none
        col-start-1 row-start-1
        w-2 h-2 rounded-full peer-checked:bg-blue-500
        "
         />
        <label htmlFor={id} className="text-start">{label}</label>
    </div>
  </div>
);