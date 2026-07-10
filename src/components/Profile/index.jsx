import React, { useState, useEffect, useRef } from "react";
import { message } from "antd";
import { PageWrapper, PageHeader, PageTitle, PageSub, GridLayout, LeftCol, RightCol, Card, CardTitle, ProfileHeaderRow, AvatarWrapper, Avatar, AvatarCameraBtn, ProfileInfo, ProfileName, ProfileEmail, BadgeRow, Badge, FormGrid, FormGroup, Label, Input, PasswordInputWrap, PasswordToggle, PrimaryBtn, SecondaryBtn, PasswordSectionHeader, SectionHeaderText, SectionHeaderTitle, SectionHeaderSub, Divider, ToggleRow, ToggleRowLeft, ToggleRowText, ToggleRowTitle, ToggleRowSub, ToggleBtnPill, Switch, SwitchKnob, StatRow, StatIconBox, StatText, StatLabel, StatValue, ActionRow, ActivityRow, ActivityDot, ActivityText, ActivityTitle, ActivityTime, Icons, } from "./style";
import Axios from "../../Axios";
import { StudentListData } from "../../Context/Users";
import { useNotification } from "../../Context/Messages";
import { useNavigate } from "react-router-dom";
import { ThemeData } from "../../Context/Theme";

const EyeIcon = () => (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
     </svg>
);
const EyeOffIcon = () => (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <path d="M1 1l22 22" />
     </svg>
);

export default function ProfilePage() {

     const [{ loading, List, type }, dispatch] = StudentListData()
     const { notify, destroyNotify } = useNotification()

     const api = import.meta.env.VITE_API

     const userData = localStorage.getItem("userData")
     const [Id, setId] = useState()
     const [{ isDark }, themeDispatch] = ThemeData()

     const [activityLog, setActivityLog] = useState([]);

     const [showOldPass, setShowOldPass] = useState(false);
     const [showNewPass, setShowNewPass] = useState(false);
     const [password, setpassword] = useState("")
     const [data, setData] = useState(List || [])

     const [push, setPush] = useState(true);
     const [email, setEmail] = useState(false);

     const [stats, setStats] = useState({ totalTransactions: 0, totalExpense: 0, totalIncome: 0 });

     const NameRef = useRef()
     const EmailRef = useRef()
     const NumberRef = useRef()
     const OldPasswordRef = useRef()
     const NewPasswordRef = useRef()
     const AddressRef = useRef()
     const navigate = useNavigate();

     useEffect(() => {
          GetUserData()
     }, [])

     async function GetUserData() {
          notify('loading', "Ma'lumotlar yuklanmoqda...")

          try {
               const res = await Axios.get(api)
               let newRes = res.data.find((obj) => obj?.ism === userData) // 
               if (newRes) {
                    setData([newRes])
                    dispatch({ type: "GET", payload: [newRes] })

                    destroyNotify()
                    notify('success', "Ma'lumotlar muvaffaqiyatli yuklandi!")
                    setpassword(newRes.parol)

                    const sortedActivity = Array.isArray(newRes.activity)
                         ? [...newRes.activity].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                         : []
                    setActivityLog(sortedActivity)

                    await GetStatistics(newRes.id)
                    await setId(newRes.id)
               } else {
                    alert("Ma'lumotlar topilmadi!")
               }

          } catch (error) {
               destroyNotify()
               notify('error', "Saqlashda xatolik yuz berdi!")
               console.log(error.message)
          }
     }

     async function GetStatistics(userId) {
          try {
               const res = await Axios.get(`${api}/${userId}/dokon`)
               const dokonList = Array.isArray(res.data) ? res.data : [res.data]

               const allTransactions = dokonList
                    .flatMap((d) => Array.isArray(d?.mahsulotlar) ? d.mahsulotlar : [])
                    .filter((item) => item?.itemType === "transaction")

               const totalExpense = allTransactions
                    .filter((t) => t.type === "expense")
                    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

               const totalIncome = allTransactions
                    .filter((t) => t.type === "income")
                    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

               setStats({
                    totalTransactions: allTransactions.length,
                    totalExpense,
                    totalIncome,
               })
          } catch (error) {
               console.log("Statistika olishda xato:", error.message)
          }
     }

     async function UpdateUserData(Edit_ID) {
          notify('loading', "Saqlanmoqda...")

          try {
               const res = await Axios.put(`${api}/${Edit_ID}`, handleChange())
               GetUserData()

               dispatch({ type: "PUT", payload: res.data })
               destroyNotify()

               notify('success', "Profil muvaffaqiyatli yangilandi!")
               addActivity("Profil tahrirlandi", "#2563eb", Edit_ID)

               localStorage.setItem("userData", NameRef.current.value)
          } catch (error) {
               destroyNotify()
               notify('error', "Saqlashda xatolik yuz berdi!")
          }
     }

     function handleChange() {
          return {
               ism: NameRef.current.value,
               email: EmailRef.current.value,
               number: NumberRef.current.value,
               address: AddressRef.current.value,
          }
     };

     async function UpdatePassword(Edit_ID) {
          notify('loading', "Parol yangilanmoqda...")
          try {
               if (OldPasswordRef.current.value == password) {
                    let res = await Axios.put(`${api}/${Edit_ID}`, { "parol": NewPasswordRef.current.value }) // ⛔ password -> parol
                    await GetUserData()
                    dispatch({ type: "PUT", payload: res.data })
                    OldPasswordRef.current.value = ""
                    NewPasswordRef.current.value = ""
                    await addActivity("Parol yangilandi", "#2563eb", Edit_ID)
                    destroyNotify()
                    notify('success', "Parol muvaffaqiyatli yangilandi!")
               } else {
                    alert("Parol xato kiritildi!")
               }

          } catch (error) {
               destroyNotify()
               notify('error', "Parolni yangilashda xatolik!")
          }
     }

     async function PostActivity(title, color, userId) {
          try {
               const currentActivity = Array.isArray(data[0]?.activity) ? data[0].activity : []
               const newEntry = {
                    id: crypto.randomUUID(),
                    title: title,
                    color: color,
                    createdAt: new Date().toISOString(),
               }
               const updatedActivity = [...currentActivity, newEntry]

               await Axios.put(`${api}/${userId}`, { activity: updatedActivity })
          } catch (error) {
               console.log("Activity saqlashda xato:", error.message)
          }
     }

     async function addActivity(title, color, userId) {
          await PostActivity(title, color, userId)
          await GetUserData()
     }

     function timeAgo(isoString) {
          const now = new Date()
          const past = new Date(isoString)
          const diffMs = now - past
          const diffMin = Math.floor(diffMs / 60000)
          const diffHour = Math.floor(diffMin / 60)
          const diffDay = Math.floor(diffHour / 24)
          const diffMonth = Math.floor(diffDay / 30)
          const diffYear = Math.floor(diffMonth / 12)

          if (diffMin < 1) return "hozirgina"
          if (diffMin < 60) return `${diffMin} daqiqa oldin`
          if (diffHour < 24) return `${diffHour} soat oldin`
          if (diffDay < 30) return `${diffDay} kun oldin`
          if (diffMonth < 12) return `${diffMonth} oy oldin`
          return `${diffYear} yil oldin`
     }

     function LogOut() {
          if (confirm("Rostanham hisobdan chiqmoqchimisiz?")) {
               localStorage.removeItem("userData")
               localStorage.removeItem("token")
               navigate("/sign-up")
          }
          return
     }

     function ScrollToAddress() {
          AddressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          AddressRef.current?.focus();
     }

     return <div style={{ maxHeight: "100vh", overflow: "scroll" }} className="ProfileCard">
          <PageWrapper $dark={isDark}>
               <PageHeader>
                    <PageTitle $dark={isDark}>Profil</PageTitle>
                    <PageSub $dark={isDark}>Shaxsiy ma'lumotlaringizni boshqaring</PageSub>
               </PageHeader>

               <GridLayout>
                    <LeftCol>

                         <Card $dark={isDark} $delay={0.05}>
                              <ProfileHeaderRow>
                                   <AvatarWrapper>
                                        <Avatar><Icons.UserIcon /></Avatar>
                                        <AvatarCameraBtn title="Rasm yuklash">
                                             <Icons.avatarEditIcon />
                                        </AvatarCameraBtn>
                                   </AvatarWrapper>

                                   {data?.map((obj) => {
                                        return <ProfileInfo key={obj.id}>
                                             <ProfileName $dark={isDark}>{obj?.ism}</ProfileName>
                                             <ProfileEmail $dark={isDark}>{obj?.email}</ProfileEmail>
                                             <BadgeRow>
                                                  <Badge $variant="premium">
                                                       <Icons.CrownIcon />
                                                       Premium foydalanuvchi
                                                  </Badge>
                                                  <Badge $variant="active">
                                                       Faol
                                                  </Badge>
                                             </BadgeRow>
                                        </ProfileInfo>
                                   })}
                              </ProfileHeaderRow>
                         </Card>

                         {data?.map((obj) => {
                              return <Card $dark={isDark} $delay={0.1} key={obj.id}>
                                   <CardTitle $dark={isDark}><Icons.profileMinniIcon /> Shaxsiy ma'lumotlar</CardTitle>
                                   <FormGrid>
                                        <FormGroup>
                                             <Label $dark={isDark}>Ism</Label>
                                             <Input $dark={isDark} defaultValue={obj?.ism || ""} ref={NameRef} required />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label $dark={isDark}>Email</Label>
                                             <Input $dark={isDark} defaultValue={obj?.email || ""} ref={EmailRef} required />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label $dark={isDark}>Telefon</Label>
                                             <Input $dark={isDark} defaultValue={obj?.number || "+998 90 71 607 07 69"} ref={NumberRef} required />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label $dark={isDark}>Manzil</Label>
                                             <Input $dark={isDark} defaultValue={obj?.address || "Toshken, O'zbekiston"} ref={AddressRef} required />
                                        </FormGroup>
                                   </FormGrid>
                                   <PrimaryBtn onClick={() => UpdateUserData(obj?.id)}>O'zgarishlarni saqlash</PrimaryBtn>
                              </Card>
                         })}

                         <Card $dark={isDark} $delay={0.15}>
                              <CardTitle $dark={isDark}><Icons.miniSecuritiyIcon /> Xavfsizlik sozlamalari</CardTitle>
                              <br />
                              <PasswordSectionHeader>
                                   <Icons.QulfIcon />
                                   <SectionHeaderText>
                                        <SectionHeaderTitle $dark={isDark}>Parolni o'zgartirish</SectionHeaderTitle>
                                        <SectionHeaderSub $dark={isDark}>
                                             {activityLog.find((a) => a.title === "Parol yangilandi")
                                                  ? `Oxirgi o'zgarish: ${timeAgo(activityLog.find((a) => a.title === "Parol yangilandi")?.createdAt)}`
                                                  : "Hali o'zgartirilmagan"}
                                        </SectionHeaderSub>
                                   </SectionHeaderText>
                              </PasswordSectionHeader>

                              <FormGrid style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 14 }}>
                                   <FormGroup>
                                        <PasswordInputWrap>
                                             <Input $dark={isDark} type={showOldPass ? "password" : "text"} placeholder="Eski parol" ref={OldPasswordRef} required />
                                             <PasswordToggle onClick={() => setShowOldPass((p) => !p)}>
                                                  {showOldPass ? <EyeOffIcon /> : <EyeIcon />}
                                             </PasswordToggle>
                                        </PasswordInputWrap>
                                   </FormGroup>
                                   <FormGroup>
                                        <PasswordInputWrap>
                                             <Input $dark={isDark} type={showNewPass ? "password" : "text"} placeholder="Yangi parol" ref={NewPasswordRef} required />
                                             <PasswordToggle onClick={() => setShowNewPass((p) => !p)}>
                                                  {showNewPass ? <EyeOffIcon /> : <EyeIcon />}
                                             </PasswordToggle>
                                        </PasswordInputWrap>
                                   </FormGroup>
                              </FormGrid>

                              <SecondaryBtn $dark={isDark} style={{ marginBottom: 6 }} onClick={() => UpdatePassword(Id)}>Parolni yangilash</SecondaryBtn>

                              <Divider $dark={isDark} />
                         </Card>

                         <Card $dark={isDark} $delay={0.2}>
                              <CardTitle $dark={isDark}><Icons.SettingsIcon /> Sozlamalar</CardTitle>

                              <ToggleRow $dark={isDark}>
                                   <ToggleRowLeft>
                                        <Icons.moonIcon />
                                        <ToggleRowText>
                                             <ToggleRowTitle $dark={isDark}>Tungi rejim</ToggleRowTitle>
                                             <ToggleRowSub $dark={isDark}>Qorong'i interfeys</ToggleRowSub>
                                        </ToggleRowText>
                                   </ToggleRowLeft>
                                   <Switch $on={isDark} onClick={() => themeDispatch({ type: isDark ? "light" : "dark" })}>
                                        <SwitchKnob $on={isDark} />
                                   </Switch>
                              </ToggleRow>
                         </Card>
                    </LeftCol>

                    <RightCol>
                         <Card $dark={isDark} $delay={0.1}>
                              <CardTitle $dark={isDark}><Icons.topRightIcon /> Statistika</CardTitle>

                              <StatRow $dark={isDark}>
                                   <StatIconBox $bg="#e8f0fe" $color="#2563eb"><Icons.MiniDateIcon /></StatIconBox>
                                   <StatText>
                                        <StatLabel $dark={isDark}>Ro'yxatdan o'tgan</StatLabel>
                                        <StatValue $dark={isDark}>
                                             {data[0]?.createdAt
                                                  ? new Date(data[0].createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })
                                                  : "—"}
                                        </StatValue>
                                   </StatText>
                              </StatRow>

                              <StatRow $dark={isDark}>
                                   <StatIconBox $bg="#f3e8ff" $color="#9333ea"><Icons.miniPlasticCardIcon /></StatIconBox>
                                   <StatText>
                                        <StatLabel $dark={isDark}>Jami tranzaksiyalar</StatLabel>
                                        <StatValue $dark={isDark}>{stats.totalTransactions}</StatValue>
                                   </StatText>
                              </StatRow>

                              <StatRow $dark={isDark}>
                                   <StatIconBox $bg="#ffe8e8" $color="#dc2626"><Icons.$Icon /></StatIconBox>
                                   <StatText>
                                        <StatLabel $dark={isDark}>Jami xarajat</StatLabel>
                                        <StatValue $dark={isDark}>{Number(stats.totalExpense).toLocaleString("uz-UZ")} so'm</StatValue>
                                   </StatText>
                              </StatRow>

                              <StatRow $dark={isDark}>
                                   <StatIconBox $bg="#e6f9ee" $color="#16a34a"><Icons.topRightIcon /></StatIconBox>
                                   <StatText>
                                        <StatLabel $dark={isDark}>Jami daromad</StatLabel>
                                        <StatValue $dark={isDark}>{Number(stats.totalIncome).toLocaleString("uz-UZ")} so'm</StatValue>
                                   </StatText>
                              </StatRow>
                         </Card>

                         <Card $dark={isDark} $delay={0.15}>
                              <CardTitle $dark={isDark}>Hisob harakatlari</CardTitle>

                              <ActionRow $dark={isDark} onClick={ScrollToAddress}><Icons.miniLocationIcon /> Manzilni yangilash</ActionRow>
                              <ActionRow $dark={isDark}><Icons.miniPlasticCardIcon /> To'lov usullarini boshqarish</ActionRow>
                              <ActionRow $dark={isDark}><Icons.miniSecuritiyIcon /> Maxfiylik sozlamalari</ActionRow>
                              <ActionRow $danger $dark={isDark} onClick={LogOut}><Icons.LogOutIcon /> Hisobdan chiqish</ActionRow>
                         </Card>

                         <Card $dark={isDark} $delay={0.2}>
                              <CardTitle $dark={isDark}>So'nggi faoliyat</CardTitle>

                              {activityLog.length > 0 ? (
                                   activityLog.map((a) => (
                                        <ActivityRow key={a.id}>
                                             <ActivityDot $color={a.color} />
                                             <ActivityText>
                                                  <ActivityTitle $dark={isDark}>{a.title}</ActivityTitle>
                                                  <ActivityTime $dark={isDark}>{timeAgo(a.createdAt)}</ActivityTime>
                                             </ActivityText>
                                        </ActivityRow>
                                   ))
                              ) : (
                                   <ActivityTime $dark={isDark}>Hozircha faoliyat yo'q</ActivityTime>
                              )}
                         </Card>
                    </RightCol>
               </GridLayout>
          </PageWrapper>
     </div >
}