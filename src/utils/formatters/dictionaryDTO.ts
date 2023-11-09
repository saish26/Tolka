export const dictionaryDTO = {
  send: (data: any) => {
    console.log(data, "data");
    return {
      appId: "lang-inst-g",
      lang: data?.germanWord || "",
      lang_example: data?.germanExample || "",
      nepali: data?.inNepali || "",
      nepali_example: data?.nepaliExample || "",
      np_pronunciation: data?.nepaliPronunciation || "",
      english: data?.inEnglish || "",
      english_example: data?.englishExample || "",
      level: data?.level || "",
    };
  },
};
