import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import { useContext, createContext, useState, useRef, useEffect } from "react";

const MobileSidebarContext = createContext();

export default function MobileSidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setExpanded(false); // Close the sidebar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Overlay when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setExpanded(false)}
        />
      )}

      <aside className="h-screen relative z-20">
        <nav
          ref={sidebarRef}
          className={`fixed h-full flex flex-col shadow-sm transition-all duration-300 ease-in-out ${
            expanded ? "bg-[#1e1e1e] border-r w-64" : "bg-transparent w-10"
          }`}
        >
          <div className={`py-4 pb-2 flex justify-between items-center`}>
            <div
              className={`flex items-center pl-2 space-x-2 overflow-hidden transition-all duration-300 ease-in-out ${
                expanded ? "w-full" : "w-0"
              }`}
            >
              <Image src={"/logo_clear.png"} width={50} height={64} />
              <h1 className="font-sans text-lg font-bold">PrismaForge</h1>
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 rounded-lg flex items-center ${
                expanded ? "" : "mt-[0.45rem] border-r"
              }`}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <div
            className={`flex flex-col justify-between h-full transition-all duration-300 ease-in-out ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MobileSidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3">{children}</ul>
            </MobileSidebarContext.Provider>

            <div className="border-t mt-auto flex items-center w-full p-3 space-x-4">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div className="flex w-full justify-between items-center overflow-hidden">
                <div className="flexleading-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <span className="text-xs text-gray-600">
                    johndoe@gmail.com
                  </span>
                </div>
                <MoreVertical size={20} className="ml-auto" />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function MobileSidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(MobileSidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-5 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-all duration-300 group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-[#181818] text-gray-300"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
