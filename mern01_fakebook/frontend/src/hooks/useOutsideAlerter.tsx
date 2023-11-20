import { useEffect } from "react"

export function useOutsideAlerter(ref: any, func: () => void) {
  useEffect(() => {

    // func() happens when click outside of element occurs
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref])
}