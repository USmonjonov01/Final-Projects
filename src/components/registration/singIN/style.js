import styled, { keyframes, createGlobalStyle } from "styled-components";
import WalletIcon from "../../../assets/icons/walletIcon.svg?react"
import dashboardIcon from "../../../assets/icons/dashboardIcon.svg?react"
import GrayDashboardIcon from "../../../assets/icons/GrayDashboardIcon.svg?react"
import categoryIcon from "../../../assets/icons/categoryIcon.svg?react"
import profileIcon from "../../../assets/icons/profileIcon.svg?react"
import statisticalIcon from "../../../assets/icons/statisticalIcon.svg?react"
import LightTransactionIcon from "../../../assets/icons/LightTransactionIcon.svg?react"
import transactionIcon from "../../../assets/icons/transactionIcon.svg?react"
import topGreenIcon from "../../../assets/icons/topGreenIcon.svg?react"
import bottomRedIcon from "../../../assets/icons/bottomRedIcon.svg?react"
import smallWalletIcon from "../../../assets/icons/smallWalletIcon.svg?react"
import RedrightIcon from "../../../assets/icons/RedrightIcon.svg?react"
import GreenbottomIcon from "../../../assets/icons/GreenbottomIcon.svg?react"
import DateIcon from "../../../assets/icons/DateIcon.svg?react"
import EyeIcon from "../../../assets/icons/EyeIcon.svg?react"
import EditIcon from "../../../assets/icons/EditIcon.svg?react"
import DeleteIcon from "../../../assets/icons/DeleteIcon.svg?react"
import PlusIcon from "../../../assets/icons/PlusIcon.svg?react"
import SearchIcon from "../../../assets/icons/SearchIcon.svg?react"
import categoriesLightIcon from "../../../assets/icons/categoriesLightIcon.svg?react"
import statisticsLightIcon from "../../../assets/icons/statisticsLightIcon.svg?react"
import profileLightIcon from "../../../assets/icons/profileLightIcon.svg?react"
import EmailIcon from "../../../assets/icons/EmailIcon.svg?react"
import LockIcon from "../../../assets/icons/LockIcon.svg?react"

export const colors = {
  pageBg: "#EEF3F8",
  cardBg: "#FFFFFF",
  logoGradientStart: "#4CC9BE",
  logoGradientEnd: "#2D7DD2",
  title: "#1A1A2E",
  subtitle: "#8A94A6",
  label: "#1A1A2E",
  inputBg: "#F7F9FC",
  inputBorder: "#E2E8F0",
  inputBorderFocus: "#4CC9BE",
  inputText: "#1A1A2E",
  placeholder: "#B0BAC9",
  iconColor: "#B0BAC9",
  btnBg: "#1A1A2E",
  btnText: "#FFFFFF",
  linkText: "#1A1A2E",
  linkBold: "#1A1A2E",
  shadow: "rgba(0, 0, 0, 0.06)",
};

export const Icons = styled.div``

Icons.WalletIcon = styled(WalletIcon)`
  width: 64px;
  height: 64px;
`
Icons.dashboardIcon = styled(dashboardIcon)``
Icons.categoryIcon = styled(categoryIcon)``
Icons.profileIcon = styled(profileIcon)``
Icons.statisticalIcon = styled(statisticalIcon)``
Icons.transactionIcon = styled(transactionIcon)``
Icons.topGreenIcon = styled(topGreenIcon)`
  width: 16px;
  height: 16px;
`
Icons.bottomRedIcon = styled(bottomRedIcon)`
  width: 16px;
  height: 16px;
`
Icons.smallWalletIcon = styled(smallWalletIcon)`
  width: 16px;
  height: 16px;
`
Icons.RedRightIcon = styled(RedrightIcon)`
  width: 20px;
  height: 20px;
`
Icons.GreenbottomIcon = styled(GreenbottomIcon)`
  width: 20px;
  height: 20px;
`
Icons.DateIcon = styled(DateIcon)`
  width: 16px;
  height: 16px;
`
Icons.EyeIcon = styled(EyeIcon)`
  width: 16px;
  height: 16px;
`
Icons.LightTransactionIcon = styled(LightTransactionIcon)``
Icons.GrayDashboardIcon = styled(GrayDashboardIcon)``
Icons.EditIcon = styled(EditIcon)``
Icons.DeleteIcon = styled(DeleteIcon)``
Icons.PlusIcon = styled(PlusIcon)``
Icons.SearchIcon = styled(SearchIcon)``
Icons.categoriesLightIcon = styled(categoriesLightIcon)``
Icons.statisticsLightIcon = styled(statisticsLightIcon)``
Icons.profileLightIcon = styled(profileLightIcon)``
Icons.EmailIcon = styled(EmailIcon)``
Icons.LockIcon = styled(LockIcon)``

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background-color: ${colors.pageBg};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ $dark }) => $dark ? "#0f0f1a" : colors.pageBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

export const Card = styled.div`
  background: ${({ $dark }) => $dark ? "#1a1a2e" : colors.cardBg};
  border-radius: 20px;
  padding: 48px 40px 40px;
  width: 100%;
  max-width: 448px;
  height: 100%;
  max-height: 634px;
  box-shadow:
    0 4px 24px ${({ $dark }) => $dark ? "rgba(0,0,0,0.4)" : colors.shadow},
    0 1px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormHead = styled.div`
  width: 100%;
  height: 100%;
  max-height: 192px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2B7FFF, #00C950);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(76, 201, 190, 0.35);

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : colors.title};
  margin-bottom: 6px;
  letter-spacing: -0.3px;
  text-align: center;
  line-height: 32px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ $dark }) => $dark ? "#888" : "#717182"};
  margin-bottom: 28px;
  text-align: center;
  line-height: 24px;
  font-weight: 400;
`;

export const FormContent = styled.div`
  width: 100%;
  height: 100%;
  max-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0px 24px 24px 24px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 13.5px;
  font-weight: 500;
  color: ${({ $dark }) => $dark ? "#aaa" : colors.label};
  padding-left: 2px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const InputIcon = styled.div`
  position: absolute;
  ${({ $position }) => {
    switch ($position) {
      case "left":
        return { left: "14px", top: "50%" }
      case "right":
        return { right: "14px", top: "50%" }
    }
  }}
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: ${({ $dark }) => $dark ? "#666" : colors.iconColor};
  cursor: pointer;

  svg {
    width: 17px;
    height: 17px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 14px 0 42px;
  background: ${({ $dark }) => $dark ? "#12121f" : colors.inputBg};
  border: 1.5px solid ${({ $dark }) => $dark ? "#2a2a45" : colors.inputBorder};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : colors.inputText};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: ${({ $dark }) => $dark ? "#444" : colors.placeholder};
    font-size: 14px;
  }

  &:focus {
    border-color: ${colors.inputBorderFocus};
    box-shadow: 0 0 0 3px rgba(76, 201, 190, 0.12);
    background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  }

  &[type="password"] {
    letter-spacing: 2px;
    font-size: 18px;

    &::placeholder {
      letter-spacing: normal;
      font-size: 14px;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  background: ${({ $dark }) => $dark ? "#4cc9be" : colors.btnBg};
  color: ${({ $dark }) => $dark ? "#0f0f1a" : colors.btnText};
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
  letter-spacing: 0.2px;
  transition: opacity 0.2s ease, transform 0.15s ease;
  font-family: inherit;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  &:active {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FooterText = styled.p`
  font-size: 13.5px;
  color: ${({ $dark }) => $dark ? "#888" : colors.linkText};
  margin-top: 18px;
  text-align: center;

  a,
  span.link {
    font-weight: 700;
    color: ${({ $dark }) => $dark ? "#4cc9be" : colors.linkBold};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;