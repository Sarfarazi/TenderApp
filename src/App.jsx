import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"
import SignUpPage from "./components/pages/SignUpPage"
import OTPPage from "./components/pages/OTPPage"
import AuthContext from "./context/AuthContext "
import { useEffect, useState } from "react"
import LoginProtector from "./components/templates/LoginProtector"
import Dashboard from "./components/pages/Dashboard"
import PageLayout from "./components/templates/PageLayout"
import UserDetail from "./components/pages/UserDetail"
import { useFetch } from "./hooks/useFetch"


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")) ?? false)
  const [phone, setPhone] = useState(JSON.parse(sessionStorage.getItem("phone")) ?? null)

  const [isExpired, setIsExpired] = useState(false);


  const { refetch } = useFetch(
    `https://localhost:7078/api/OTP/OTP/OTPAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone
      }),
    }
  );

  const onResend = () => {
    refetch()
    setIsExpired(true)
  }

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("canAccessOtp", "false");
    }
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  useEffect(() => {
    sessionStorage.setItem("phone", JSON.stringify(phone))
  }, [phone])

  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          phone: phone,
          setPhone: setPhone
        }
      }>
      <main className="mx-auto border-x p-5 border-gray-500 max-w-3xl body overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout><LoginPage /></PageLayout>}></Route>
            <Route path="/signUp" element={<PageLayout><SignUpPage /></PageLayout>}></Route>
            <Route path="/otpPage" element={<PageLayout><OTPPage isExpired={isExpired} onResend={onResend} /></PageLayout>}></Route>
            <Route
              path={"/dashboard"}
              element={
                <PageLayout><LoginProtector
                  redirectTo={"/"}
                >
                  <Dashboard />
                </LoginProtector></PageLayout>
              }
            />
            <Route
              path={"/Account"}
              element={
                <PageLayout>
                  <LoginProtector
                    redirectTo={"/"}
                  >
                    <UserDetail />
                  </LoginProtector>
                </PageLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
    </AuthContext.Provider>
  )
}

export default App
