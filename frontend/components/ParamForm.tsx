"use client";
import { useForm } from "react-hook-form";
import { FormType } from "@/lib/utils/types";
import { useState } from "react";
import OptionButton from "./OptionButton";
import Button from "./Button";

function ParamForm() {
  const { register, handleSubmit } = useForm<FormType>();
  const [selectedOption, setSelectedOption] = useState("no");
  const handleOptionButtonClick = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <div className="container p-2 border border-slate-600 rounded-md">
      <h2 className="text-slate-100 mb-3 text-center">Parameters</h2>
      <form className="w-full" action="">
        <fieldset className="border rounded-md border-slate-600 p-2 mb-3">
          <legend className="text-green-400 text-sm">Embedding</legend>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                className="text-cyan-600 text-sm"
                htmlFor="embeddingKeyMinSize"
              >
                Key Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingKeyMinSize", { required: true })}
                value="2"
                className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="text-cyan-600 text-sm"
                htmlFor="embeddingValuesMinSize"
              >
                Values Min. Size
              </label>
              <input
                type="number"
                {...register("embeddingValuesMinSize", { required: true })}
                value="2"
                className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
              />
            </div>
          </div>
        </fieldset>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-sm" htmlFor="min_pmi">
              Min. PMI
            </label>
            <input
              type="number"
              {...register("min_pmi", { required: true })}
              value="0.00"
              className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-sm" htmlFor="Customized_pmi">
              Custom PMI
            </label>
            <input
              type="number"
              {...register("Customized_pmi", { required: true })}
              value="1"
              className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="text-cyan-600 text-sm"
              htmlFor="minOutputListSize"
            >
              Min. Out. List Size
            </label>
            <input
              type="number"
              {...register("minOutputListSize", { required: true })}
              value="1"
              className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-cyan-600 text-sm" htmlFor="nABmin">
              nABmin
            </label>
            <input
              type="number"
              {...register("nABmin", { required: true })}
              value="1"
              className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
        </div>
        <div className="flex flex-col mb-4 px-3">
          <label
            className="text-cyan-600 text-sm"
            htmlFor="ContextMultitokenMinSize"
          >
            Context Multitoken Min. Size
          </label>
          <input
            type="number"
            {...register("ContextMultitokenMinSize", { required: true })}
            value="2"
            className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
          />
        </div>
        <OptionButton
          handleOptionButtonClick={handleOptionButtonClick}
          selectedOption={selectedOption}
        />
        {selectedOption === "no" && (
          <div className="flex flex-col mb-4 px-3">
            <label className="text-cyan-600 text-sm" htmlFor="ignoreList">
              Ignore List (Comma Separated)
            </label>
            <input
              type="text"
              {...register("ignoreList", { required: true })}
              value="data,"
              className="bg-slate-800 text-slate-300 text-sm rounded-md w-40 p-1"
            />
          </div>
        )}
        <div className="flex flex-row justify-center gap-4 px-3">
          <Button buttonType="submit">Retrieve Docs</Button>
          <Button buttonType="button">Reset</Button>
        </div>
      </form>
    </div>
  );
}
export default ParamForm;
