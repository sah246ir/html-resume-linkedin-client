import { useContext, useEffect, useState } from "react";
import { OpenAiContext } from "./context";
import ApiKeyDialog from "./components/dialog/ApiKeyDialog";
import HomeSection from "./components/section/HomeSection";
import { Trash2 } from "lucide-react";

function App() {
  const [ApiKey, SetApiKey] = useState<string>(localStorage.getItem("key") || "")

  useEffect(() => {
    localStorage.setItem("key", ApiKey)
  }, [ApiKey])
  return (
    <OpenAiContext.Provider value={{ key: ApiKey, setKey: (key: string) => { SetApiKey(key.trim()) } }}>
      <>
        <main>
          <button onClick={()=>{localStorage.removeItem("key")}} className=" absolute right-5 top-5 flex items-center gap-2">
            <Trash2 className="text-red-600"/>
            <span className="text-red-500">
              Delete Key
            </span>
          </button>
          <HomeSection />
          {!ApiKey && <ApiKeyDialog />}
        </main>
      </>
    </OpenAiContext.Provider>
  );
}

export default App;
