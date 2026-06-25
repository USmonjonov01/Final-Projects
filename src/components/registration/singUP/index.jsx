import React, { useRef, useState } from "react";
import { GlobalStyle, PageWrapper, Card, LogoWrapper, Title, Subtitle, Form, FieldGroup, Label, InputWrapper, InputIcon, Input, SubmitButton, FooterText, FormHead, Icons, } from "./style";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";


// User / Person icon
const UserIcon = () => (
     <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path
               d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6"
               stroke="currentColor"
               strokeWidth="1.6"
               strokeLinecap="round"
          />
     </svg>
);

// Email icon
const EmailIcon = () => (
     <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path
               d="M2 7l8 5 8-5"
               stroke="currentColor"
               strokeWidth="1.6"
               strokeLinecap="round"
               strokeLinejoin="round"
          />
     </svg>
);

// Lock icon
const LockIcon = () => (
     <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="9" width="12" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path
               d="M6.5 9V6.5a3.5 3.5 0 117 0V9"
               stroke="currentColor"
               strokeWidth="1.6"
               strokeLinecap="round"
          />
          <circle cx="10" cy="13.5" r="1" fill="currentColor" />
     </svg>
);
     
const SingUpForm = () => {
     const api = import.meta.env.VITE_API;

     const NameRef = useRef()
     const EmailRef = useRef()
     const PasswordRef = useRef()
     const PasswordConfirmRef = useRef()
     const navigate = useNavigate()

     const [prop, setProp] = useState(false)


     const handleSubmit = async (e) => {
          e.preventDefault() 

          if (PasswordRef.current.value !== PasswordConfirmRef.current.value) {
               setProp(true)
               alert("Parollar mos emas!")
               return
          }
          
          setProp(false)

          const data = {
               name: NameRef.current.value,
               email: EmailRef.current.value,
               password: PasswordRef.current.value,
               confirmPassword: PasswordConfirmRef.current.value,
          }

          try {
               const res = await Axios.post(
                    `${api}/Register`, data)

               if (res.status >= 200 && res.status < 300) {
                    localStorage.setItem("userData", NameRef.current.value)
                    localStorage.setItem("token", crypto.randomUUID())

                    NameRef.current.value = ""
                    EmailRef.current.value = ""
                    PasswordRef.current.value = ""
                    PasswordConfirmRef.current.value = ""

                    navigate("/sing-in")
               }
          } catch (error) {
               console.log("Xatolik:", error)
          }
     }


     return (
          <>
               <GlobalStyle/>
               <PageWrapper>
                    <Card>
                         <FormHead>
                              <LogoWrapper>
                                   <Icons.WalletIcon />
                              </LogoWrapper>

                              <Title>Hisob yaratish</Title>
                              <Subtitle>Ma'lumotlaringizni kiriting</Subtitle>
                         </FormHead>

                         <Form onSubmit={handleSubmit}>
                              <FieldGroup>
                                   <Label htmlFor="name">Ism</Label>
                                   <InputWrapper>
                                        <InputIcon>
                                             <UserIcon />
                                        </InputIcon>
                                        <Input style={prop ? { borderColor: "#fc2b2b" } : null} id="name" name="name" type="text" placeholder="Ismingiz" ref={NameRef} autoComplete="name" required />
                                   </InputWrapper>
                              </FieldGroup>

                              <FieldGroup>
                                   <Label htmlFor="email">Email</Label>
                                   <InputWrapper>
                                        <InputIcon>
                                             <EmailIcon />
                                        </InputIcon>
                                        <Input style={prop ? { borderColor: "#fc2b2b" } : null} id="email" name="email" type="email" placeholder="email@example.com" ref={EmailRef} autoComplete="email" required />
                                   </InputWrapper>
                              </FieldGroup>

                              <FieldGroup>
                                   <Label htmlFor="password">Parol</Label>
                                   <InputWrapper>
                                        <InputIcon>
                                             <LockIcon />
                                        </InputIcon>
                                        <Input style={prop ? { borderColor: "#fc2b2b" } : null} id="password" name="password" type="password" placeholder="••••••••" ref={PasswordRef} autoComplete="new-password" required />
                                   </InputWrapper>
                              </FieldGroup>

                              <FieldGroup>
                                   <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                                   <InputWrapper>
                                        <InputIcon>
                                             <LockIcon />
                                        </InputIcon>
                                        <Input style={prop ? { borderColor: "#fc2b2b" } : null} id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" ref={PasswordConfirmRef} autoComplete="new-password" required />
                                   </InputWrapper>
                              </FieldGroup>

                              <SubmitButton type="submit">Ro'yxatdan o'tish</SubmitButton>
                         </Form>

                         <FooterText>
                              Hisobingiz bormi?{" "}
                              <span className="link" onClick={() => navigate("/sing-in")}>
                                   Kirish
                              </span>
                         </FooterText>
                    </Card>
               </PageWrapper>
          </>
     );
};

export default SingUpForm;