import { RefObject, useEffect, useMemo } from "react";

export function useIntersection(
  ref: RefObject<Element>,
  option: IntersectionObserverInit
) {
  const memoedOption = useMemo(() => option, [option]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log("hello");
    }, memoedOption);
    const element = ref.current;
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [memoedOption, ref]);
}
