import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="pl-8 h-screen bg-gradient-to-r from-indigo-200 to-purple-300">
      <h1 className="mt-0 pt-8">Oh no, this route doesn't exist!</h1>
      <Link to="/" className="px-3 py-1 text-black no-underline border-solid border-1 rounded-2xl bg-transparent cursor-pointer hover:bg-black hover:text-white hover:border-black">
        Got back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage