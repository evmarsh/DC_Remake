import { useState } from 'react';

function DropdownNavBarItem({ text, items, onClick }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {text}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full w-40 bg-dark rounded-md shadow-lg z-40">
          {items.map((item, idx) =>
            item.external ? (
              <a
                key={idx}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-gray-700"
                onClick={onClick}
              >
                {item.text}
              </a>
            ) : (
              <span key={idx} className="block px-4 py-2 text-white">{item.text}</span>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownNavBarItem;