import Header from "./Header"
import ScrollToTop from "./ScrollToTop"



const PageLayout = ({ children }) => {
    return (
        <>
            <ScrollToTop />
            <Header />
            {children}
        </>
    )
}

export default PageLayout