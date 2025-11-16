import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContext from "./context/AuthContext"
import { lazy, Suspense, useCallback, useEffect, useState } from "react"
import LoginProtector from "./components/templates/LoginProtector"
import PageLayout from "./components/templates/PageLayout"
import { useFetch } from "./hooks/useFetch"
const LoginPage = lazy(() => import("./components/pages/LoginPage"));
const SignUpPage = lazy(() => import("./components/pages/SignUpPage"));
const OTPPage = lazy(() => import("./components/pages/OTPPage"));
const Dashboard = lazy(() => import("./components/pages/Dashboard"));
const UserDetail = lazy(() => import("./components/pages/UserDetail"));

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
      const res = await fetch("https://tenapi.palaz.com/api/Account/Login", {
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
    `https://tenapi.palaz.com/api/OTP/OTP/OTPAsync`,
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
      <main className="mx-auto border-x p-5 border-gray-500 max-w-2xl body overflow-hidden relative">
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="w-full fixed z-50 h-full top-0 left-0 bg-Gray flex items-center justify-center">
                <span className="pageLoader"></span>
              </div>
            }
          >
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
          </Suspense>
        </BrowserRouter>
      </main>
    </AuthContext.Provider>
  )
}

export default App
