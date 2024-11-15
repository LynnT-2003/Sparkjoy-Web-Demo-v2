import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import { useContext, createContext, useState } from "react";

const MobileSidebarContext = createContext();

export default function MobileSidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav
        className={`fixed h-full flex flex-col shadow-sm transition-all ${
          expanded ? "bg-[#1e1e1e] border-r w-64" : "bg-transparent"
        }`}
      >
        <div className={`py-4 pb-2 flex justify-between items-center `}>
          <div
            className={`flex items-center space-x-0 overflow-hidden transition-all ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            <Image src={"/logo_clear.png"} width={50} height={64} />
            <h1 className="font-sans text-lg font-bold">PrismaForge</h1>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-1.5 rounded-lg ${expanded ? "" : "pt-[0.9rem]"}`}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {expanded && (
          <div className="flex flex-col justify-between h-full">
            <MobileSidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3">{children}</ul>
            </MobileSidebarContext.Provider>
            <div className="border-t mt-auto flex w-full p-3 space-x-4">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div className="flex justify-between items-center overflow-hidden transition-all">
                <div className="leading-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <span className="text-xs text-gray-600">
                    johndoe@gmail.com
                  </span>
                </div>
                <MoreVertical size={20} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}

export function MobileSidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(MobileSidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
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
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
