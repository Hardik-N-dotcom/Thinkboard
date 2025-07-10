import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react"; 

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "synthwave",
  "pastel", "fantasy", "dracula", "cmyk", "business", "luxury",
  "night", "coffee", "winter","abyss"
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-outline normal-case gap-2">
        <span className="text-sm">🎨 Theme</span>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-box w-60 max-h-64 overflow-y-auto border border-base-300"
      >
        {themes.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-base-200 transition ${
                theme === t ? "bg-primary text-primary-content font-semibold" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-base-300"
                  style={{ backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)` }}
                ></span>
                <span className="capitalize">{t}</span>
              </div>
              {theme === t && <CheckIcon className="w-4 h-4" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
