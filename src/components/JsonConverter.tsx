import React from "react";
import styled from "styled-components";
import { StandardListProps } from "../App";

const JsonConverter = ({ data, setErrorValue, updateJsonData, setError }: {
    data: StandardListProps[];
    setErrorValue: (value: { title: string; message: string; }) => void;
    updateJsonData: (jsonData: StandardListProps[]) => void;
    setError: (value: boolean) => void;
    }) => {

    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file?.name.endsWith(".json")) {
            e.preventDefault();
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const text = e.target?.result as string;
                updateJsonData(JSON.parse(text));
            };

            reader.readAsText(file);
        } else {
            setError(true);
            setErrorValue ({
                title: "Invalid File",
                message: "Please select a valid json file",
            });
        }
    };

    return (
    <styledComp.JsonConverter>
        <a
            className="download"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
            download="Curriculam.json"
        >
            Download
        </a>

        <styledComp.UploadComp>
            Upload
            <input
                id="myInput"
                type="file"
                accept=".json"
                className="hideFileInput"
                name="curriculam"
                onChange={onSelectFile}
            />
        </styledComp.UploadComp>
    </styledComp.JsonConverter>
    );
};

export default JsonConverter;

const styledComp = {
    JsonConverter: styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 0 1rem 0;
      a {
        text-decoration: none;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 6px;
        background: #808080;
        padding: 0.4rem;
        margin-right: 1rem;
        transition: 0.3s ease;
        :hover {
          background: #5A5A5A;
        }
      }
    `,
    UploadComp: styled("label")`
    color: white;
    width: 80px;
    border-radius: 6px;
    background: #808080;
    padding: 0.4rem;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
      background: #5A5A5A;
    }
    input {
      display: none;
    }
  `,
}