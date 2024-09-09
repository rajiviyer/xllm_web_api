"use client";
import { useForm } from "react-hook-form";
import { FormType } from "@/lib/utils/types";
import { useState } from "react";
import React from "react";
import OptionButton from "./OptionButton";
import Button from "./Button";
import { queries } from "@/lib/utils/data";
import { ResultDocProps } from "@/lib/utils/types";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const ParamForm: React.FC<ResultDocProps> = ({ setResult }) => {
  const { register, handleSubmit } = useForm<FormType>();
  const [byPassList, setByPassList] = useState(false);
  const [seedQuery, setSeedQuery] = useState(true);

  // State to track the height of the textarea
  const [heightIgnoreList, setHeightIgnoreList] = useState<string>("auto");
  const [heightQueryText, setHeightQueryText] = useState<string>("auto");

  const defaultFormData = {
    embeddingKeyMinSize: "2",
    embeddingValuesMinSize: "2",
    min_pmi: "0.00",
    Customized_pmi: "1",
    ContextMultitokenMinSize: "2",
    maxTokenCount: "100",
    minOutputListSize: "1",
    nABmin: "1",
    ignoreList: "data,",
    queryText: queries[0],
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOptionButtonClickIgnoreList = (option: boolean) => {
    // console.log("bypass", option);
    setByPassList(option);
  };

  const handleOptionButtonClickQuery = (option: boolean) => {
    // console.log("query", option);
    setSeedQuery(option);
  };

  const handleResetButtonClick = () => {
    setFormData(defaultFormData);
    setResult({ embeddings: [], docs: [] });
    setByPassList(false);
    setSeedQuery(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      queryText: queries[0],
    }));
  };

  // Handle focus event to increase the height
  const handleFocusIgnoreList = () => {
    setHeightIgnoreList("150px");
  };

  const handleFocusQueryText = () => {
    setHeightQueryText("150px");
  };

  // Handle blur event to reset the height
  const handleBlurIgnoreList = () => {
    setHeightIgnoreList("auto"); // Reset to original size (or you can specify a fixed height)
  };

  const handleBlurQueryText = () => {
    setHeightQueryText("auto"); // Reset to original size (or you can specify a fixed height)
  };

  const retrieveDocs = async (data: Object) => {
    data = { ...data, bypassIgnoreList: byPassList ? 1 : 0 };
    if (data) {
      console.log(data);
    } else {
      console.log("No data found");
    }
    try {
      const response = await fetch("http://77.237.241.186:8906/api/docs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result_data = await response.json();
      // print length of the result list

      if (result_data) {
        // console.log(result_data.length);
        setResult(result_data);
      } else {
        console.log("No result found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-1 border border-slate-600 rounded-md mt-2">
      <h2 className="text-slate-100 mb-3 text-center">Parameters</h2>
      {/* <Slider defaultValue={[33]} max={100} step={1} className="bg-white" /> */}
      <form onSubmit={handleSubmit(retrieveDocs)} className="w-full">
        <fieldset className="border rounded-md border-slate-600 p-2 mb-2">
          <legend className="text-green-400 text-xs">Embedding</legend>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                className="text-cyan-600 text-xs"
                htmlFor="embeddingKeyMinSize"
              >
                Key Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingKeyMinSize", { required: true })}
                value={formData.embeddingKeyMinSize}
                // placeholder="2"
                onChange={(event) => handleInputChange(event)}
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="text-cyan-600 text-xs"
                htmlFor="embeddingValuesMinSize"
              >
                Values Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingValuesMinSize", { required: true })}
                value={formData.embeddingValuesMinSize}
                onChange={(event) => handleInputChange(event)}
                // placeholder="2"
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
              />
            </div>
          </div>
        </fieldset>
        <div className="flex flex-wrap mb-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs" htmlFor="min_pmi">
              Min. PMI
            </label>
            <input
              type="number"
              {...register("min_pmi", { required: true })}
              value={formData.min_pmi}
              onChange={(event) => handleInputChange(event)}
              // placeholder="0.00"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs" htmlFor="Customized_pmi">
              Custom PMI
            </label>
            <input
              type="number"
              {...register("Customized_pmi", { required: true })}
              value={formData.Customized_pmi}
              onChange={(event) => handleInputChange(event)}
              // placeholder="1"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="text-cyan-600 text-xs"
              htmlFor="minOutputListSize"
            >
              Min. Out. List Size
            </label>
            <input
              type="number"
              {...register("minOutputListSize", { required: true })}
              value={formData.minOutputListSize}
              onChange={(event) => handleInputChange(event)}
              // value="1"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs" htmlFor="nABmin">
              nABmin
            </label>
            <input
              type="number"
              {...register("nABmin", { required: true })}
              value={formData.nABmin}
              onChange={(event) => handleInputChange(event)}
              // placeholder="1"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="text-cyan-600 text-xs"
              htmlFor="ContextMultitokenMinSize"
            >
              Ctxt. Multitoken Min. Size
            </label>
            <input
              type="number"
              {...register("ContextMultitokenMinSize", { required: true })}
              value={formData.ContextMultitokenMinSize}
              onChange={(event) => handleInputChange(event)}
              // placeholder="2"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs" htmlFor="maxTokenCount">
              Max. Token Count
            </label>
            <input
              type="number"
              {...register("maxTokenCount", { required: true })}
              value={formData.maxTokenCount}
              onChange={(event) => handleInputChange(event)}
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-1">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs">Bypass Ignore List</label>
            <OptionButton
              handleOptionButtonClick={handleOptionButtonClickIgnoreList}
              selectedOption={byPassList}
              option1="Yes"
              option2="No"
            />
          </div>
          {byPassList === false && (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="text-cyan-600 text-xs" htmlFor="ignoreList">
                Ignore List (Comma Sep.)
              </label>
              <textarea
                {...register("ignoreList", { required: true })}
                value={formData.ignoreList}
                onChange={(event) => handleInputChange(event)}
                placeholder="data,.."
                // className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1 transition-all duration-300 ease-in-out"
                style={{ height: `${heightIgnoreList}` }} // Apply dynamic height
                onFocus={handleFocusIgnoreList}
                onBlur={handleBlurIgnoreList}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap mb-5">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs">Query</label>
            <OptionButton
              handleOptionButtonClick={handleOptionButtonClickQuery}
              selectedOption={seedQuery}
              option1="Seeded"
              option2="Custom"
            />
          </div>
          {seedQuery === true ? (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <br />
              <select
                {...register("queryText", { required: true })}
                className="bg-slate-800 text-slate-300 text-xs h-2/3 rounded-md w-40 p-1"
                onChange={(event) => handleInputChange(event)}
              >
                {queries.map((query, index) => {
                  return (
                    <option key={index} value={query}>
                      {query}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <br />
              <textarea
                {...register("queryText", { required: true })}
                value={formData.queryText}
                onChange={(event) => handleInputChange(event)}
                placeholder="parameterized datasets map tables sql server..."
                // className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1 transition-all duration-300 ease-in-out"
                style={{ height: `${heightQueryText}` }} // Apply dynamic height
                onFocus={handleFocusQueryText}
                onBlur={handleBlurQueryText}
              />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-4 px-3">
          <Button buttonType="submit">Retrieve Docs</Button>
          <Link href="/" onClick={handleResetButtonClick}>
            <Button buttonType="button">Reset</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ParamForm;
