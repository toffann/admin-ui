import React, { useContext, useState } from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink, useNavigate } from "react-router-dom"; 
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function MainLayout(props) {
  const { children } = props;
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const { user, logout } = useContext(AuthContext);
  
  const [openLoading, setOpenLoading] = useState(false);

  const handleLogout = async () => {
    setOpenLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      logout(); 
      setOpenLoading(false);
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
      setOpenLoading(false); 
    }
  }; 
  
  return (
    <>
      <div className={`flex min-h-screen transition-colors duration-300 ${theme.name} bg-special-mainBg text-black dark:bg-zinc-900 dark:text-white`}>        
        <aside className={`w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-defaultBlack"}`}
        >
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>
          <div>
            <div>
              Themes
              <div className="flex flex-col sm:flex-row gap-2 items-center mt-1">
                {themes.map((t) => (
                  <div
                    key={t.name}
                    className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer`}
                    onClick={() => setTheme(t)}
                  ></div>
                ))}
                
                <div
                  onClick={toggleDarkMode}
                  className="w-6 h-6 rounded-md cursor-pointer bg-special-bg3 flex items-center justify-center hover:scale-110 border border-zinc-700 transition-all"
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? (
                    <LightModeIcon sx={{ fontSize: 14, color: '#F1C40F' }} />
                  ) : (
                    <DarkModeIcon sx={{ fontSize: 14, color: '#A0A0A0' }} />
                  )}
                </div>
              </div>
            </div>
            
            <div onClick={handleLogout} className="cursor-pointer mt-4">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                <div>{user?.name || "Toffan"}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>
        
        <div className="flex-1 flex flex-col"> 
          <header className={`border-b px-6 py-7 flex justify-between items-center transition-colors duration-300 ${isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-gray-05 bg-white"}`}>
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user?.name || "Toffan"}</div> 
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div> 
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale"/>
              </div> 
              <Input backgroundColor={isDarkMode ? "bg-zinc-800" : "bg-white"} border={isDarkMode ? "border-zinc-700" : "border-white"} /> 
            </div>
          </header>
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>

      <Backdrop
        sx={(theme) => ({ 
          color: '#fff', 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)' 
        })}
        open={openLoading}
      >
        <div className="flex flex-col items-center gap-3">
          <CircularProgress color="inherit" size={55} />
          <span className="text-sm font-medium tracking-wide text-white">
            Logging out, please wait...
          </span>
        </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;