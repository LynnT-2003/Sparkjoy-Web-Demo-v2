import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, useRef, useEffect } from "react";
import {
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
  User,
} from "@/lib/firebase";
import { LogOut, LogIn } from "lucide-react";

const MobileSidebarContext = createContext();

export default function MobileSidebar({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
    console.log("Sign-in successful!");
  };

  const handleSignOut = async () => {
    await signOutUser();
    console.log("Sign-out successful!");
  };

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
    <div className="md:hidden fixed top-0 left-0 z-50">
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
            expanded ? "bg-[#1e1e1e] w-64" : "bg-transparent w-10"
          }`}
        >
          <div className={`py-4 pb-2 flex justify-between items-center`}>
            <div
              className={`flex items-center pl-2 space-x-2 overflow-hidden transition-all duration-300 ease-in-out ${
                expanded ? "w-full" : "w-0"
              }`}
            >
              <Image
                src={"/logo_clear.png"}
                width={50}
                height={64}
                alt="Logo"
              />
              <h1 className="font-sans text-lg font-bold">PrismaForge</h1>
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 rounded-lg flex items-center${
                expanded ? "text-white" : "mt-[0.45rem] text-black"
              }`}
            >
              {expanded ? (
                <ChevronFirst className="text-white" />
              ) : (
                <ChevronLast className="text-white" />
              )}
            </button>
          </div>

          <div
            className={`flex flex-col justify-between h-full transition-all duration-300 ease-in-out ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <MobileSidebarContext.Provider value={{ expanded, setExpanded }}>
              <ul className="flex-1 px-3">
                {children}

                {user ? (
                  <MobileSidebarItem
                    icon={<LogOut />}
                    text="Sign Out"
                    active={false}
                    alert={false}
                    onClick={handleSignOut}
                  />
                ) : (
                  <MobileSidebarItem
                    icon={<LogIn />}
                    text="Sign In"
                    active={false}
                    alert={false}
                    onClick={handleSignIn}
                  />
                )}
              </ul>
            </MobileSidebarContext.Provider>

            <div className="border-t mt-auto flex items-center w-full p-3 space-x-4">
              {user ? (
                <>
                  <Image
                    src={user.photoURL}
                    alt="profile URL"
                    width={10}
                    height={10}
                    className="w-10 h-10 rounded-md"
                  />
                  <div className="flex w-full justify-between items-center overflow-hidden">
                    <div className="flexleading-4">
                      <h4 className="font-semibold">{user.displayName}</h4>
                      <span className="text-xs text-gray-600">
                        {user.email}
                      </span>
                    </div>
                    <MoreVertical size={20} className="ml-auto" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full justify-center py-2 items-center overflow-hidden">
                    <div className="flexleading-4">
                      <h4 className="text-gray-400">User not Signed In.</h4>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export function MobileSidebarItem({
  icon,
  text,
  active,
  alert,
  route,
  onClick,
}) {
  const router = useRouter();

  const { expanded, setExpanded } = useContext(MobileSidebarContext);
  const handleClick = () => {
    if (route) {
      router.push(route);
    }
    if (onClick) {
      onClick();
    }
    setExpanded(false);
  };

  return (
    <li
      className={`
        relative flex items-center py-5 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-all duration-300 group 
        ${expanded ? "w-52 ml-3 visible" : "w-0 invisible"}
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-[#181818] text-gray-300"
        }
    `}
      onClick={handleClick}
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
