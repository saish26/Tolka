import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CommonTextField from "../common/form/CommonTextField";
import showNotify from "@/utils/notify";
import CommonSelect from "../common/form/CommonSelect";
import { Button } from "@mantine/core";
import { dictionaryDTO } from "@/utils/formatters/dictionaryDTO";
import {
  APIPostDictionary,
  APIUpdateDictionary,
} from "@/apis/dashboard/dictionary";

const DictionaryForm = ({ data }: any) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  const {
    control,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      germanWord: "",
      germanExample: "",
      nepaliPronunciation: "",
      inNepali: "",
      nepaliExample: "",
      inEnglish: "",
      englishExample: "",
      level: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("germanWord", data?.lang);
      setValue("germanExample", data?.lang_example);
      setValue("nepaliPronunciation", data?.np_pronunciation);
      setValue("inNepali", data?.nepali);
      setValue("nepaliExample", data?.nepali_example);
      setValue("inEnglish", data?.english);
      setValue("englishExample", data?.english_example);
      setValue("level", data?.level);
      setEdit(true);
    }
  }, [data]);
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formattedData = dictionaryDTO?.send(data);
      if (edit) {
        const res = await APIPostDictionary(formattedData);
      } else {
        const res = await APIUpdateDictionary(formattedData);
        setEdit(false);
      }
      router.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showNotify("error", "Unable to add Question...");
    }
  };
  return (
    <main>
      <form className=" bg-white px-5 py-3" onSubmit={handleSubmit(onSubmit)}>
        <section className="text-xl font-bold pt-3 pb-6">
          Add Word to dictionary
        </section>
        <div className="pb-3 font-semibold">German Word</div>
        <div className="w-full ">
          <Controller
            name={"germanWord"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="Deutsch" />
            )}
          />
        </div>
        <div className="py-3 font-semibold">German Example</div>
        <div className="w-full ">
          <Controller
            name={"germanExample"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="Ich spreche Deutsch." />
            )}
          />
        </div>
        <div className="py-3 font-semibold">Nepali Pronunciation</div>
        <div className="w-full ">
          <Controller
            name={"nepaliPronunciation"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="डोइच्" />
            )}
          />
        </div>
        <div className="py-3 font-semibold">In Nepali </div>
        <div className="w-full ">
          <Controller
            name={"inNepali"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="जर्मन" />
            )}
          />
        </div>
        <div className="py-3 font-semibold">Nepali Example</div>
        <div className="w-full ">
          <Controller
            name={"nepaliExample"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="म जर्मन बोल्छु।" />
            )}
          />
        </div>
        <div className="py-3 font-semibold">In English</div>
        <div className="w-full ">
          <Controller
            name={"inEnglish"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="German" />
            )}
          />
        </div>
        <div className="py-3 font-semibold">English Example</div>
        <div className="w-full ">
          <Controller
            name={"englishExample"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonTextField {...field} placeholder="I speak German." />
            )}
          />
        </div>
        <div className="py-3 font-semibold">Level</div>
        <div className="w-full ">
          <Controller
            name={"level"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Required",
            }}
            render={({ field }) => (
              <CommonSelect
                {...field}
                data={["A1", "A2", "B1", "B2", "C1", "C2"]}
                placeholder="B2"
              />
            )}
          />
        </div>
        <div className="pt-2 flex justify-end">
          <Button type="submit" className="bg-[#164E99] hover:bg-[#164E99]">
            {edit ? <div>Update Word</div> : <div>Add Word</div>}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default DictionaryForm;
