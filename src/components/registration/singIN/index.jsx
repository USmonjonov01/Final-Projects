import React, { useRef, useState } from "react";
import { GlobalStyle, PageWrapper, Card, LogoWrapper, Title, Subtitle, Form, FieldGroup, Label, InputWrapper, InputIcon, Input, SubmitButton, FooterText, FormHead, Icons, } from "./style";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
import { ThemeData } from "../../../Context/Theme"; 






const SingInForm = () => {
     const api = import.meta.env.VITE_API;
     const EmailRef = useRef()
     const PasswordRef = useRef()
     const navigate = useNavigate()
     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });
     const [ {isDark} ] = ThemeData()
     const [prop, setProp] = useState(false)





     const handleSubmit = async (e) => {
          e.preventDefault()
          setProp(false)
          try {
               const res = await Axios.get(api) 

               if (res.status >= 200 && res.status < 300) {
                    const userdata = localStorage.getItem("userData")
                    const newRes = res.data;

                    return newRes.find((obj) => {
                         if (!userdata) {
                              localStorage.setItem("userData", obj.ism)
                         }
                         if (obj.ism === userdata) {
                              const token = localStorage.setItem("token", crypto.randomUUID())
                              navigate("/dashboard")
                         } else {
                              setProp(true)
                              alert("malutmotlar mos kelmadi")
                         }
                    })
               }
          } catch (error) {
               console.log("Xatolik:", error.message)
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
                              <Title $dark={isDark}>Hush kelibsiz</Title>
                              <Subtitle $dark={isDark}>Hisobingizga kiring</Subtitle>
                         </FormHead>

                         <Form onSubmit={handleSubmit}>
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
                                             ref={EmailRef} autoComplete="email"
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
                                             ref={PasswordRef} autoComplete="new-password"
                                        />
                                   </InputWrapper>
                              </FieldGroup>

                              <SubmitButton $dark={isDark} type="submit">Kirish</SubmitButton>
                         </Form>

                         <FooterText $dark={isDark}>
                              Hisobingiz yo'qmi?{" "}
                              <span className="link" onClick={() => navigate("/sign-up")}>
                                   Ro'yxatdan o'tish
                              </span>
                         </FooterText>
                    </Card>
               </PageWrapper>
          </>
     )
}


export default SingInForm;