//react imports
import { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"

//store
import { store } from "./redux/store/store"
import { Provider } from "react-redux"

//routing
import { BrowserRouter } from "react-router-dom"

//tailwind css
import "tailwindcss/tailwind.css"

//toast imports
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//global loader
import Loader from "./components/Loader/Loader"

//core component
const App = lazy(() => import("./pages/App"))

const container = document.getElementById("root")
const root = createRoot(container)

// product image order 100-200-300-400
// Compatible Models need to remmove directly add qty lits
// add to cart button fix on screen bottom with total product MOQ
// 1st pic in every model list
// min qty font small/ price-min qty swape

// Total Model Qty => Qty
// Enter Product MOQ => Enter Listing MOQ
// Total GST => 70 price will be inclusive of GST so calc is wrong

// 7 day return policy Remove
// Modal Listing company wise

// Edit/Delete option

// product shareable link
// blur price => login / register on price if not access_token 
// add button color and design


root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <ToastContainer theme="colored" draggable={false} autoClose={3000} />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
)
