import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <section className="2xl:pb-32 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <img
          className="absolute left-0 -bottom-6 xl:-left-10 md:bottom-24 z-30 w-28 md:w-auto"
          src="uinel-assets/images/http-codes/cursor-orange.svg"
          alt=""
        />
        <img
          className="absolute right-0 xl:-right-12 top-0 md:top-96 z-30 w-24 md:w-auto"
          src="uinel-assets/images/http-codes/cursor-blue.svg"
          alt=""
        />
        <img
          className="absolute md:left-24 -top-16 z-10"
          src="uinel-assets/images/http-codes/elipse-purple.svg"
          alt=""
        />
        <img
          className="absolute -left-16 top-12 md:-top-5"
          src="uinel-assets/images/http-codes/elipse-yellow.svg"
          alt=""
        />
        <div className="relative text-center md:py-24 px-4 2xl:pt-36 2xl:pb-60 bg-white rounded-7xl z-20">
          <div className="relative z-40">
            <span className="block mb-9 uppercase tracking-widest text-xs text-gray-300">
              Can&apos;t find
            </span>
            <h2 className="mb-6 font-medium font-heading text-9xl md:text-10xl xl:text-smxl leading-tight">
              404
            </h2>
            <p className="max-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium text-3xl leading-10">
              Wooops. We can&rsquo;t find that page or something has gone wrong.
            </p>
            <a
              className="inline-flex items-center pb-2 font-bold tracking-tight text-xl leading-6 text-green-600 hover:text-green-700 border-b border-green-600 hover:border-green-700"
              href="#"
              onClick={() => navigate("/")}
            >
              <span className="mr-3">Back to home</span>
              <svg
                width="16"
                height="13"
                viewbox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 1L15 7H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 12L15 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound
