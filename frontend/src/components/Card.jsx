function Card({className, heading, text}) {

    return (
    <div className={`flex flex-col w-70 h-90 border-2 rounded border-solid border-gray-300 shadow-xl p-2 bg-gray-200 items-center justify-items-center ${className}`}>
      <h1 className="border-b-2 text-black text-xl">{heading}</h1>
      <p className="text-3xl text-black mt-2">
        {text}
      </p>
    </div>
    );
}

export default Card