import React, { useRef, useState } from "react";
import { GlobalStyle, PageWrapper, Card, LogoWrapper, Title, Subtitle, Form, FieldGroup, Label, InputWrapper, InputIcon, Input, SubmitButton, FooterText, FormHead, Icons, } from "./style";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
import { ThemeData } from "../../../Context/Theme";
import { Use_Notification } from "../../../Context/Notification";


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




const SingUpForm = () => {
  const api = import.meta.env.VITE_API;
  const [{ isDark }] = ThemeData()
  const { notifyByStatus, notifyBox } = Use_Notification()

  const NameRef = useRef()
  const EmailRef = useRef()
  const PasswordRef = useRef()
  const PasswordConfirmRef = useRef()
  const NumberRef = useRef()
  const navigate = useNavigate()
  const [type, setType] = useState(false)


  const [prop, setProp] = useState(false)

  function validateForm() {
    const ism = NameRef.current.value.trim()
    const email = EmailRef.current.value.trim()
    const password = PasswordRef.current.value

    
    const ismRegex = /^(?=.*[A-Z])[^\d]{8,}$/
    if (!ismRegex.test(ism)) {
      return {
        title: "Ism noto'g'ri kiritildi",
        desc: "Ism kamida 8 ta harfdan iborat bo'lishi, kamida 1 ta katta harf bo'lishi va raqam bo'lmasligi kerak.",
      }
    }

   
    const emailRegex = /^(?=.*\d).+@gmail\.com$/
    if (!emailRegex.test(email)) {
      return {
        title: "Email noto'g'ri kiritildi",
        desc: "Email kamida 1 ta raqam saqlashi va '@gmail.com' bilan tugashi kerak.",
      }
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!passwordRegex.test(password)) {
      return {
        title: "Parol noto'g'ri kiritildi",
        desc: "Parol kamida 8 ta belgidan iborat bo'lishi, kamida 1 ta katta harf va 1 ta son bo'lishi kerak.",
      }
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (PasswordRef.current.value !== PasswordConfirmRef.current.value) {
      setProp(true)
      notifyBox('error', "Parollar mos emas", "Kiritilgan ikkala parol bir xil bo'lishi kerak.")
      return
    }

   
    const validationError = validateForm()
    if (validationError) {
      setProp(true)
      notifyBox('error', validationError.title, validationError.desc)
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
        notifyByStatus(res.status, 'signUp')

        localStorage.setItem("userData", NameRef.current.value)
        localStorage.setItem("token", crypto.randomUUID())

        NameRef.current.value = ""
        EmailRef.current.value = ""
        PasswordRef.current.value = ""
        PasswordConfirmRef.current.value = ""

        navigate("/sign-in")
      }
    } catch (error) {
      const status = error.response?.status
      if (status) {
        notifyByStatus(status, 'signUp')
      } else {
        notifyBox('error', 'Tarmoq xatosi', "Server bilan bog'lanib bo'lmadi. Internetni tekshiring.")
      }
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
                <InputIcon $dark={isDark} $position={"left"}>
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
                <InputIcon $dark={isDark} $position={"left"}>
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
                <InputIcon $dark={isDark} $position={"left"}>
                  <Icons.LockIcon />
                </InputIcon>
                <Input
                  $dark={isDark}
                  style={prop ? { borderColor: "#fc2b2b" } : null}
                  id="password" name="password" type={type ? "text" : "password"}
                  placeholder="••••••••"
                  ref={PasswordRef} autoComplete="new-password"
                />
                <InputIcon $dark={isDark} $position={"right"} onClick={() => setType(!type)}>
                  {type ? <EyeIcon /> : <EyeOffIcon />}
                </InputIcon>
              </InputWrapper>
            </FieldGroup>

            <FieldGroup>
              <Label $dark={isDark} htmlFor="password">Parolni tasdiqlang</Label>
              <InputWrapper>
                <InputIcon $dark={isDark} $position={"left"}>
                  <Icons.LockIcon />
                </InputIcon>
                <Input
                  $dark={isDark}
                  style={prop ? { borderColor: "#fc2b2b" } : null}
                  id="password" name="password" type={type ? "text" : "password"}
                  placeholder="••••••••"
                  ref={PasswordConfirmRef} autoComplete="new-password"
                />
                <InputIcon $dark={isDark} $position={"right"} onClick={() => setType(!type)}>
                  {type ? <EyeIcon /> : <EyeOffIcon />}
                </InputIcon>
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