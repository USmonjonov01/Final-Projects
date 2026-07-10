import React, { useRef, useState } from "react";
import { GlobalStyle, PageWrapper, Card, LogoWrapper, Title, Subtitle, Form, FieldGroup, Label, InputWrapper, InputIcon, Input, SubmitButton, FooterText, FormHead, Icons, } from "./style";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
import { ThemeData } from "../../../Context/Theme";


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




const SingUpForm = () => {
     const api = import.meta.env.VITE_API; 
     const [{isDark}] = ThemeData()

     const NameRef = useRef()
     const EmailRef = useRef()
     const PasswordRef = useRef()
     const PasswordConfirmRef = useRef()
     const NumberRef = useRef()
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
               ism: NameRef.current.value,
               email: EmailRef.current.value,
               parol: PasswordRef.current.value,
               parol_check: PasswordConfirmRef.current.value,
               activity: [],
          }

          try {
               const res = await Axios.post(api, data) 

               if (res.status >= 200 && res.status < 300) {
                    localStorage.setItem("userData", NameRef.current.value)
                    localStorage.setItem("token", crypto.randomUUID())

                    NameRef.current.value = ""
                    EmailRef.current.value = ""
                    PasswordRef.current.value = ""
                    PasswordConfirmRef.current.value = ""

                    navigate("/sign-in")
               }
          } catch (error) {
               console.log("Xatolik:", error)
          }
     }



return (
  <>
    <GlobalStyle />
    <PageWrapper $dark={isDark}>
      <Card $dark={isDark}>
        <FormHead>
          <LogoWrapper>
            <Icons.WalletIcon />
          </LogoWrapper>
          <Title $dark={isDark}>Hisob yaratish</Title>
          <Subtitle $dark={isDark}>Ma'lumotlaringizni kiriting</Subtitle>
        </FormHead>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label $dark={isDark} htmlFor="name">Ism</Label>
            <InputWrapper>
              <InputIcon $dark={isDark}>
                <UserIcon />
              </InputIcon>
              <Input
                $dark={isDark}
                style={prop ? { borderColor: "#fc2b2b" } : null}
                id="name" name="name" type="text"
                placeholder="Ismingiz"
                ref={NameRef} autoComplete="name" required
              />
            </InputWrapper>
          </FieldGroup>

          <FieldGroup>
            <Label $dark={isDark} htmlFor="email">Email</Label>
            <InputWrapper>
              <InputIcon $dark={isDark}>
                <Icons.EmailIcon />
              </InputIcon>
              <Input
                $dark={isDark}
                style={prop ? { borderColor: "#fc2b2b" } : null}
                id="email" name="email" type="email"
                placeholder="email@example.com"
                ref={EmailRef} autoComplete="email" required
              />
            </InputWrapper>
          </FieldGroup>


          <FieldGroup>
            <Label $dark={isDark} htmlFor="password">Parol</Label>
            <InputWrapper>
              <InputIcon $dark={isDark}>
                <Icons.LockIcon />
              </InputIcon>
              <Input
                $dark={isDark}
                style={prop ? { borderColor: "#fc2b2b" } : null}
                id="password" name="password" type="password"
                placeholder="••••••••"
                ref={PasswordRef} autoComplete="new-password" required
              />
            </InputWrapper>
          </FieldGroup>

          <FieldGroup>
            <Label $dark={isDark} htmlFor="confirmPassword">Parolni tasdiqlang</Label>
            <InputWrapper>
              <InputIcon $dark={isDark}>
                <Icons.LockIcon />
              </InputIcon>
              <Input
                $dark={isDark}
                style={prop ? { borderColor: "#fc2b2b" } : null}
                id="confirmPassword" name="confirmPassword" type="password"
                placeholder="••••••••"
                ref={PasswordConfirmRef} autoComplete="new-password" required
              />
            </InputWrapper>
          </FieldGroup>

          <SubmitButton $dark={isDark} type="submit">
            Ro'yxatdan o'tish
          </SubmitButton>
        </Form>

        <FooterText $dark={isDark}>
          Hisobingiz bormi?{" "}
          <span className="link" onClick={() => navigate("/sign-in")}>
            Kirish
          </span>
        </FooterText>
      </Card>
    </PageWrapper>
  </>
);
}

export default SingUpForm;