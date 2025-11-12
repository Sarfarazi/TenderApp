import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"
import SignUpPage from "./components/pages/SignUpPage"
import OTPPage from "./components/pages/OTPPage"
import AuthContext from "./context/AuthContext"
import { useCallback, useEffect, useState } from "react"
import LoginProtector from "./components/templates/LoginProtector"
import Dashboard from "./components/pages/Dashboard"
import PageLayout from "./components/templates/PageLayout"
import UserDetail from "./components/pages/UserDetail"
import { useFetch } from "./hooks/useFetch"
const saveToken = (token) => {
  const now = new Date().getTime();
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_token_time", now.toString());
};

const getValidToken = () => {
  const token = localStorage.getItem("auth_token");
  const time = localStorage.getItem("auth_token_time");
  if (!token || !time) return null;

  const now = new Date().getTime();
  const diff = now - parseInt(time);
  const oneDay = 24 * 60 * 60 * 1000; // ۲۴ ساعت
  return diff > oneDay ? null : token;
};

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")) ?? false)
  const [token, setToken] = useState(getValidToken() ?? "");
  const [phone, setPhone] = useState(JSON.parse(sessionStorage.getItem("phone")) ?? null)
  const [isExpired, setIsExpired] = useState(false);

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("https://localhost:7078/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        body: JSON.stringify({
          userName: "Supervisor",
          password: "12345678",
        }),
      });

      const json = await res.json();

      if (json.resultCode === 200 && json.data?.token) {
        saveToken(json.data.token);
        setToken(json.data.token);
      } else {
        console.error("❌ دریافت توکن ناموفق:", json.message);
      }
    } catch (err) {
      console.error("⚠️ خطا در دریافت توکن:", err);
    }
  }, []);
  
    useEffect(() => {
      const checkLogin = async () => {
        let validToken = getValidToken();

        if (!validToken) {
          await fetchToken();
          validToken = getValidToken();
        }

        const userLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
        if (userLogin && validToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      };

      checkLogin();
    }, [fetchToken]);

  const { refetch } = useFetch(
    `https://localhost:7078/api/OTP/OTP/OTPAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
          token: token,
          setToken: setToken,
          phone: phone,
          setPhone: setPhone
        }
      }>
      <main className="mx-auto border-x p-5 border-gray-500 max-w-3xl body overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout><LoginPage /></PageLayout>}></Route>
            <Route path="/signUp" element={<PageLayout><SignUpPage onResend={onResend} /></PageLayout>}></Route>
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
