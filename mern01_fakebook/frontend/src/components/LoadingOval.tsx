import { Oval } from "react-loader-spinner"

const LoadingOval = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Oval height={40} width={40} color="indigo" secondaryColor="violet" />
    </div>
  )
}

export default LoadingOval