import DictionaryForm from "@/components/modules/DictionaryForm";
import DictionaryList from "@/components/modules/DictionaryList";
import LandingLayout from "@/layouts/LandingLayout";
import { useState } from "react";

const Index = () => {
  const [data, setData] = useState();
  const getData = (data: any) => {
    setData(data);
  };
  console.log(data, "data");
  return (
    <main className="bg-[#eaedff] p-3 grid grid-cols-3 gap-3 text-[#4E4B66]">
      <div className="col-span-2">
        <DictionaryList get={getData} />
      </div>
      <div className="col-span-1">
        <DictionaryForm data={data} />
      </div>
    </main>
  );
};

Index.Layout = LandingLayout;
export default Index;
