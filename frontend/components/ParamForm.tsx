"use client";
import { useForm } from "react-hook-form";
import { FormType } from "@/lib/utils/types";
import { useState } from "react";
import React from "react";
import OptionButton from "./OptionButton";
import Button from "./Button";
import { queries } from "@/lib/utils/data";
import { ResultDocProps } from "@/lib/utils/types";

const ParamForm: React.FC<ResultDocProps> = ({ setResult }) => {
  const { register, handleSubmit } = useForm<FormType>();
  const [byPassList, setByPassList] = useState(false);
  const [seedQuery, setSeedQuery] = useState(true);
  const [ignoreListText, setIgnoreListText] = useState("data,");
  const [queryText, setQueryText] = useState("");
  const handleOptionButtonClickIgnoreList = (option: boolean) => {
    console.log("bypass", option);
    setByPassList(option);
  };

  const handleOptionButtonClickQuery = (option: boolean) => {
    console.log("query", option);
    setSeedQuery(option);
  };

  const handleChangeIL = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIgnoreListText(event.target.value);
  };

  const handleChangeQT = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQueryText(event.target.value);
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
        console.log(result_data.length);
        setResult(result_data);
      } else {
        console.log("No result found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-2 border border-slate-600 rounded-md">
      <h2 className="text-slate-100 mb-3 text-center">Parameters</h2>
      <form onSubmit={handleSubmit(retrieveDocs)} className="w-full">
        <fieldset className="border rounded-md border-slate-600 p-2 mb-3">
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
                value="2"
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
                value="2"
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
              />
            </div>
          </div>
        </fieldset>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-xs" htmlFor="min_pmi">
              Min. PMI
            </label>
            <input
              type="number"
              {...register("min_pmi", { required: true })}
              value="0.00"
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
              value="1"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
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
              value="1"
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
              value="1"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-3">
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
              value="2"
              className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"></div>
        </div>
        <div className="flex flex-wrap mb-2">
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
                value={ignoreListText}
                onChange={handleChangeIL}
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap mb-2">
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
                className="bg-slate-800 text-slate-300 text-xs h-1/2 rounded-md w-40 p-1"
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
                value=""
                onChange={handleChangeQT}
                placeholder="parameterized datasets map tables sql server"
                className="bg-slate-800 text-slate-300 text-xs rounded-md w-40 p-1"
              />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-4 px-3">
          <Button buttonType="submit">Retrieve Docs</Button>
          <Button buttonType="button">Reset</Button>
        </div>
      </form>
    </div>
  );
};
export default ParamForm;
