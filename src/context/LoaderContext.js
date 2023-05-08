import { createContext, useState } from "react";

export let loaderContext = createContext();

export default function LoaderContextProvider(props) {
  const [loader, setLoader] = useState(false);

  return (
    <loaderContext.Provider value={{ loader, setLoader }}>
      {props.children}
    </loaderContext.Provider>
  );
}
