// 


import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  SidebarWrapper, LogoSection, LogoIcon, LogoText, LogoTitle,
  LogoSubtitle, Nav, NavItem, NavLabel, LogoContent, Layout,
  MainContent, Overlay, MenuToggle, LayoutOffset,
} from "./style";
import { Icons } from "../registration/singIN/style";
import { ThemeData } from "../../Context/Theme";

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
);

const navItems = [
  { label: "Dashboard",      path: "/dashboard",    icon: <Icons.dashboardIcon />,       icon2: <Icons.GrayDashboardIcon /> },
  { label: "Tranzaksiyalar", path: "/transactions", icon: <Icons.LightTransactionIcon />, icon2: <Icons.transactionIcon />   },
  { label: "Kategoriyalar",  path: "/categories",   icon: <Icons.categoriesLightIcon />, icon2: <Icons.categoryIcon />      },
  { label: "Statistika",     path: "/statistics",   icon: <Icons.statisticsLightIcon />, icon2: <Icons.statisticalIcon />   },
  { label: "Profil",         path: "/profile",      icon: <Icons.profileLightIcon />,    icon2: <Icons.profileIcon />       },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ isDark }] = ThemeData();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div>
      <Layout>
        <MenuToggle $dark={isDark} onClick={() => setOpen((p) => !p)}>
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </MenuToggle>

        <Overlay $open={open} onClick={() => setOpen(false)} />

        <SidebarWrapper $dark={isDark} $open={open}>
          <LogoSection $dark={isDark}>
            <LogoContent>
              <LogoIcon>
                <Icons.WalletIcon />
              </LogoIcon>
              <LogoText>
                <LogoTitle $dark={isDark}>Xarajatlar</LogoTitle>
                <LogoSubtitle $dark={isDark}>Boshqaruv tizimi</LogoSubtitle>
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
                  $dark={isDark}
                  onClick={() => handleNavigate(path)}
                >
                  {isActive ? icon : icon2}
                  <NavLabel $active={isActive}>{label}</NavLabel>
                </NavItem>
              );
            })}
          </Nav>
        </SidebarWrapper>

        <LayoutOffset>
          <MainContent $dark={isDark}>
            <Outlet />
          </MainContent>
        </LayoutOffset>
      </Layout>
    </div>
  );
};

export default Sidebar;