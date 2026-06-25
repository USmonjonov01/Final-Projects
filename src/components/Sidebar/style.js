import styled from "styled-components";

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const colors = {
  sidebarBg: "#FFFFFF",
  activeBg: "#1A1A2E",
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
  background: #fafafa;
  overflow-y: auto;
`;

// ─── SIDEBAR WRAPPER ─────────────────────────────────────────────────────────
export const SidebarWrapper = styled.aside`
  width: 300px;
  min-height: 100vh;
  background: ${colors.sidebarBg};
  display: flex;
  flex-direction: column;
  border-right: 2px solid ${colors.border};
  flex-shrink: 0;
`;

export const LogoContent = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 21px;
padding: 24px 24px 24px 24px;
`

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: start ;
  gap: 12px;
  border-bottom: 1px solid #e0e0e0;
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
  color: ${colors.logoTitle};
  line-height: 30px;
  letter-spacing: -0.2px;
`;

export const LogoSubtitle = styled.span`
  font-size: 12px;
  color: ${colors.logoSubtitle};
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
  background: ${({ $active }) => ($active ? colors.activeBg : "transparent")};
  color: ${({ $active }) => ($active ? colors.activeText : colors.inactiveText)};

  &:hover {
    background: ${({ $active }) =>
      $active ? colors.activeBg : colors.inactiveHoverBg};
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