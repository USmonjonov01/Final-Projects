import styled, { keyframes } from "styled-components";
import $Icon from "../../assets/icons/$Icon.svg?react"
import avatarEditIcon from "../../assets/icons/avatarEditIcon.svg?react"
import DeleteIcon from "../../assets/icons/DeleteIcon.svg?react"
import LogOutIcon from "../../assets/icons/LogOutIcon.svg?react"
import MiniDateIcon from "../../assets/icons/MiniDateIcon.svg?react"
import miniLocationIcon from "../../assets/icons/miniLocationIcon.svg?react"
import miniMobileIcon from '../../assets/icons/miniMobileIcon.svg?react'
import miniPlasticCardIcon from '../../assets/icons/miniPlasticCardIcon.svg?react'
import miniSecuritiyIcon from '../../assets/icons/miniSecuritiyIcon.svg?react'
import profileIcon from '../../assets/icons/profileIcon.svg?react'
import profileMinniIcon from "../../assets/icons/profileMinniIcon.svg?react"
import QulfIcon from "../../assets/icons/QulfIcon.svg?react"
import SettingsIcon from "../../assets/icons/Settingsicon.svg?react"
import topRightIcon from "../../assets/icons/topGreenIcon.svg?react"
import UserIcon from "../../assets/icons/UserIcon.svg?react"
import CrownIcon from '../../assets/icons/CrownIcon.svg?react'
import moonIcon from "../../assets/icons/moonIcon.svg?react"
import moonLightIcon from "../../assets/icons/moonLightIcon.svg?react"
import NotificationsIcon from "../../assets/icons/NotificationsIcon.svg?react"
import MailIcon from "../../assets/icons/MailIcon.svg?react"

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Icons = styled.div``
Icons.UserIcon = styled(UserIcon)``
Icons.$Icon = styled($Icon)``
Icons.avatarEditIcon = styled(avatarEditIcon)``
Icons.DeleteIcon = styled(DeleteIcon)``
Icons.LogOutIcon = styled(LogOutIcon)``
Icons.MiniDateIcon = styled(MiniDateIcon)``
Icons.miniLocationIcon = styled(miniLocationIcon)``
Icons.miniMobileIcon = styled(miniMobileIcon)``
Icons.miniPlasticCardIcon = styled(miniPlasticCardIcon)``
Icons.miniSecuritiyIcon = styled(miniSecuritiyIcon)``
Icons.profileIcon = styled(profileIcon)``
Icons.profileMinniIcon = styled(profileMinniIcon)``
Icons.QulfIcon = styled(QulfIcon)``
Icons.SettingsIcon = styled(SettingsIcon)``
Icons.topRightIcon = styled(topRightIcon)``
Icons.CrownIcon = styled(CrownIcon)``
Icons.moonIcon = styled(moonIcon)``
Icons.MailIcon = styled(MailIcon)``
Icons.moonLightIcon = styled(moonLightIcon)``
Icons.NotificationsIcon = styled(NotificationsIcon)``

// ── Page ───────────────────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  padding: 36px 40px;
  background: ${({ $dark }) => $dark ? "#0f0f1a" : "#f8f9fb"};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin: 0 0 4px;
`;

export const PageSub = styled.p`
  font-size: 13px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
  margin: 0;
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

export const Card = styled.div`
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  border-radius: 16px;
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  padding: 24px;
  animation: ${fadeUp} 0.3s ease both;
  animation-delay: ${({ $delay }) => $delay || 0}s;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
  margin: 0 0 18px;

  svg { width: 16px; height: 16px; color: ${({ $dark }) => $dark ? "#aaa" : "#555"}; }
`;

export const ProfileHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`;

export const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4cc9be 0%, #2d7dd2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  svg { width: 30px; height: 30px; }
`;

export const AvatarCameraBtn = styled.button`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #1a1a2e;
  border: 2px solid #fff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s;

  svg { width: 12px; height: 12px; }
  &:hover { background: #333; }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const ProfileName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const ProfileEmail = styled.div`
  font-size: 13px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $variant }) => $variant === "premium" ? "#DBEAFE" : "#e6f9ee"};
  color: ${({ $variant }) => $variant === "premium" ? "#1447E6" : "#16a34a"};

  svg { width: 12px; height: 12px; }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dark }) => $dark ? "#aaa" : "#555"};
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ececec"};
  border-radius: 9px;
  padding: 0 14px;
  font-size: 14px;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  background: ${({ $dark }) => $dark ? "#12121f" : "#fafafa"};
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;

  &::placeholder { color: ${({ $dark }) => $dark ? "#444" : "#bbb"}; }
  &:focus {
    border-color: ${({ $dark }) => $dark ? "#4cc9be" : "#1a1a2e"};
    background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
    box-shadow: 0 0 0 3px ${({ $dark }) => $dark ? "rgba(76,201,190,0.1)" : "rgba(26,26,46,0.06)"};
  }
`;

export const PasswordInputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  border: none;
  background: transparent;
  color: #aaa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.15s;

  svg { width: 17px; height: 17px; }
  &:hover { color: #666; }
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: none;
  background: #1a1a2e;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;

  &:hover { background: #2a2a45; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const SecondaryBtn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ececec"};
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s;

  &:hover {
    background: ${({ $dark }) => $dark ? "#2a2a45" : "#f7f7f7"};
    border-color: ${({ $dark }) => $dark ? "#3a3a5a" : "#ddd"};
  }
`;

export const PasswordSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;

  svg { width: 16px; height: 16px; color: #555; flex-shrink: 0; }
`;

export const SectionHeaderText = styled.div``;

export const SectionHeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const SectionHeaderSub = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#aaa"};
  margin-top: 1px;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ $dark }) => $dark ? "#2a2a45" : "#f0f0f0"};
  margin: 20px 0;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"};

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }
`;

export const ToggleRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  svg { width: 17px; height: 17px; color: #888; flex-shrink: 0; }
`;

export const ToggleRowText = styled.div`min-width: 0;`;

export const ToggleRowTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const ToggleRowSub = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#aaa"};
  margin-top: 1px;
`;

export const ToggleBtnPill = styled.button`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 8px;
  border: 1.5px solid ${({ $dark }) => $dark ? "#2a2a45" : "#ececec"};
  background: ${({ $dark }) => $dark ? "#1a1a2e" : "#fff"};
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#333"};
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ $dark }) => $dark ? "#2a2a45" : "#f7f7f7"};
    border-color: ${({ $dark }) => $dark ? "#3a3a5a" : "#ddd"};
  }
`;

export const Switch = styled.button`
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: ${({ $on }) => ($on ? "#1c1c5f" : "#e5e5e5")};
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
`;

export const SwitchKnob = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ $on }) => ($on ? "21px" : "3px")};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ $dark }) => $dark ? "#2a2a45" : "#f5f5f5"};

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }
`;

export const StatIconBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg || "#f5f5f5"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg { width: 17px; height: 17px; color: ${({ $color }) => $color || "#666"}; }
`;

export const StatText = styled.div`min-width: 0;`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#999"};
  margin-bottom: 2px;
`;

export const StatValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const ActionRow = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 9px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $danger, $dark }) => $danger ? "#dc2626" : $dark ? "#f0f0f0" : "#333"};
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;

  svg { width: 16px; height: 16px; flex-shrink: 0; }
  &:hover {
    background: ${({ $danger, $dark }) =>
      $danger ? "#fff5f5" : $dark ? "#2a2a45" : "#f5f5f5"};
  }
`;

export const ActivityRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;

  &:last-child { padding-bottom: 0; }
  &:first-child { padding-top: 0; }
`;

export const ActivityDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-top: 5px;
  flex-shrink: 0;
`;

export const ActivityText = styled.div``;

export const ActivityTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $dark }) => $dark ? "#f0f0f0" : "#111"};
`;

export const ActivityTime = styled.div`
  font-size: 12px;
  color: ${({ $dark }) => $dark ? "#666" : "#aaa"};
  margin-top: 1px;
`;