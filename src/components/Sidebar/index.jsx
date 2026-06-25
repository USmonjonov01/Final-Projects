import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { SidebarWrapper, LogoSection, LogoIcon, LogoText, LogoTitle, LogoSubtitle, Nav, NavItem, NavLabel, LogoContent, Layout, MainContent,} from "./style";
import { Icons } from "../registration/singIN/style";

const navItems = [
     { label: "Dashboard", path: "/dashboard", icon: <Icons.dashboardIcon />, icon2: <Icons.GrayDashboardIcon/> },
     { label: "Tranzaksiyalar", path: "/transactions", icon: <Icons.LightTransactionIcon/> , icon2: <Icons.transactionIcon/>},
     { label: "Kategoriyalar", path: "/categories", icon: <Icons.categoryIcon /> },
     { label: "Statistika", path: "/statistics", icon: <Icons.statisticalIcon /> },
     { label: "Profil", path: "/profile", icon: <Icons.profileIcon /> },
];


const Sidebar = () => {
     const navigate = useNavigate();
     const location = useLocation();

     return (
          <div>
               <Layout>
                    <SidebarWrapper>
                    <LogoSection>
                         <LogoContent>
                              <LogoIcon>
                                   <Icons.WalletIcon />
                              </LogoIcon>
                              <LogoText>
                                   <LogoTitle>Xarajatlar</LogoTitle>
                                   <LogoSubtitle>Boshqaruv tizimi</LogoSubtitle>
                              </LogoText>
                         </LogoContent>
                    </LogoSection>

                    <Nav>
                         {navItems.map(({ label, path, icon, icon2 }) => {
                              const isActive = location.pathname === path;
                              return (
                                   <NavItem
                                        key={path}
                                        $active={isActive}
                                        onClick={() => navigate(path)}
                                   >
                                        {isActive? icon : icon2}
                                        <NavLabel $active={isActive}>{label}</NavLabel>
                                   </NavItem>
                              );
                         })}
                    </Nav>
               </SidebarWrapper>
               <MainContent>
                    <Outlet/>
               </MainContent>
               </Layout>
          </div>
     );
};

export default Sidebar;