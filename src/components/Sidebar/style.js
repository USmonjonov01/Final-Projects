

import styled from "styled-components";

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const colors = {
  sidebarBg: "#FFFFFF",
  activeBg: "#1A1A2E",
  activeDarkBg: "#27274e",
  activeText: "#FFFFFF",
  inactiveText: "#6B7280",
  inactiveHoverBg: "#F3F4F6",
  logoGradientStart: "#4CC9BE",
  logoGradientEnd: "#2D7DD2",
  logoTitle: "#1A1A2E",
  logoSubtitle: "#717182",
  border: "#F3F4F6",
};

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  background: ${({ $dark }) => $dark ? "#0f0f1a" : "#fafafa"};
  overflow-y: auto;
`;

// ─── SIDEBAR WRAPPER ─────────────────────────────────────────────────────────
export const SidebarWrapper = styled.aside`
  width: 300px;
  min-height: 100vh;
  background: ${({ $dark }) => $dark ? "#1a1a2e" : colors.sidebarBg};
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${({ $dark }) => $dark ? "#2a2a45" : colors.border};
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transform: translateX(0);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    transform: ${({ $open }) => $open ? "translateX(0)" : "translateX(-100%)"};
    width: 260px;
    box-shadow: ${({ $open }) => $open ? "4px 0 24px rgba(0,0,0,0.18)" : "none"};
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => $open ? "block" : "none"};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    backdrop-filter: blur(2px);
  }
`;

export const MenuToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 101;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
    cursor: pointer;
    color: ${({ $dark }) => $dark ? "#f0f0f0" : "#1a1a2e"};
    transition: background 0.18s;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const LogoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 21px;
  padding: 24px 24px 24px 24px;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 12px;
  border-bottom: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#e0e0e0"};
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    ${colors.logoGradientStart} 0%,
    ${colors.logoGradientEnd} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(76, 201, 190, 0.3);

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const LogoTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : colors.logoTitle};
  line-height: 30px;
  letter-spacing: -0.2px;
`;

export const LogoSubtitle = styled.span`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#888" : colors.logoSubtitle};
  font-weight: 400;
  line-height: 16px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  padding: 16px 16px 0px 16px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
  background: ${({ $active, $dark }) =>
    $active ? ($dark ? colors.activeDarkBg : colors.activeBg) : "transparent"};
  color: ${({ $active }) => ($active ? colors.activeText : colors.inactiveText)};

  &:hover {
    background: ${({ $active, $dark }) =>
      $active
        ? $dark ? colors.activeDarkBg : colors.activeBg
        : $dark ? "#2a2a45" : colors.inactiveHoverBg};
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: inherit;
  }
`;

export const NavLabel = styled.span`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: inherit;
  letter-spacing: -0.1px;
`;

// Desktop sidebar offset
export const LayoutOffset = styled.div`
  margin-left: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;