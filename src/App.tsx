import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { DndComponent } from "./components/TableRow";
import { ErrorAlert } from "./components/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as farTimesCircle } from "@fortawesome/free-regular-svg-icons";
import JsonConverter from "./components/JsonConverter";
import TableHeader from "./components/TableHeader";
import "./App.css"

export interface StandardListProps {
  id: string;
  value: string;
  depth: number;
}

 const App = () => {
  const [data, setData] = useState<StandardListProps[]>([{ id: uuid(), value: "", depth: 0 }]);
  const [error, setError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState({
    title: "",
    message: "",
  });
  
  const updateJsonData = (jsonData : StandardListProps[]) => {
    setData([...jsonData]);
  };

  useEffect(() => {
      const curriculam = localStorage.getItem("curriculam");
      if (curriculam) {
      setData(JSON.parse(curriculam));
      }
  }, []);

  useEffect(() => {
    localStorage.setItem("curriculam", JSON.stringify(data));
  }, [data]);

  const indentStandard = (index : number) => {
    const StandardData = [...data];
    if (index === 0) return;
    if ( StandardData[index - 1].depth - StandardData[index].depth >= 0 && StandardData[index].depth < 2) {
      StandardData[index].depth++;
    }
    setData(StandardData);
  };

  const outdentStandard = (index : number) => {
    const StandardData = [...data];
    if (index === StandardData.length - 1 && StandardData[index].depth > 0) {
        StandardData[index].depth--;
    } else {
      if (
        StandardData[index + 1].depth - StandardData[index].depth <= 1 &&
        StandardData[index].depth > 0
      ) {
        StandardData[index].depth--;
      }
    }

    setData(StandardData);
  };

  const onChange = (val : string , index : number) => {
    const StandardData = [...data];
    StandardData[index].value = val;
    setData(StandardData);
  };

  // adding new standard
  const addStandard = () => {
    setData([...data, { id: uuid(), value: "", depth: 0 }]);
  };

  // deleting a standard
  const deleteStandard = (id : string) => {
    let val = -1;

    data.forEach((item, index) => {
      if (item.id === id) {
        val = index;
      }
    });

    console.log("val", val);
    let newCurriculam = [...data];

    if (val !== -1) {
      let count = 1;
      if (data[val].depth === 0) {
        for (let i = val + 1; i < data.length; i++) {
          if (data[i].depth === 0) {
            break;
          }
          count++;
        }
      } else if (data[val].depth === 1) {
        for (let i = val + 1; i < data.length; i++) {
          if (data[i].depth === 1 || data[i].depth === 0) {
            break;
          }
          count++;
        }
      }

      newCurriculam.splice(val, count);
      setData(newCurriculam);
    }
  };

  // handling drag and drop
  const handlednd = ({destinationIndex , sourceIndex} : {
    destinationIndex: number;
    sourceIndex: number;
  }) => {
    console.log(destinationIndex, sourceIndex);
    let newCurriculam = [...data];
    newCurriculam.splice(destinationIndex,0,newCurriculam.splice(sourceIndex, 1)[0]);
    let isValid = true;
    if (newCurriculam[0].depth !== 0) {
      isValid = false;
      setErrorValue({
        title: "Invalid Drag",
        message:
          "indentend value cannot be assigned as chapter, make it a chapter to continue",
      });
    }
    for (let i = 0; i < newCurriculam.length - 1; i++) {
      if (newCurriculam[i].depth === 0) {
        if (newCurriculam[i + 1].depth === 2) {
          isValid = false;
          setErrorValue({
            title: "Invalid Drag",
            message:
              "cannot indent sub topic directly to chapter, first indentent it as a child",
          });
          break;
        }
      }
    }
    isValid ? setData(newCurriculam) : setError(true);
  };

  return (
    <div className="App">
    <styledComp.App>
      <JsonConverter
        data={data}
        setError={setError}
        setErrorValue={setErrorValue}
        updateJsonData={updateJsonData}
      />
      <TableHeader />
      <DndComponent
        data={data}
        handlednd={handlednd}
        deleteStandard={deleteStandard}
        indentStandard={indentStandard}
        outdentStandard={outdentStandard}
        onChange={onChange}
      />
      <div className="button" onClick={addStandard}>
        <FontAwesomeIcon className="add" icon={farTimesCircle} /> Add a standard
      </div>
        {error && (
          <ErrorAlert
            title={errorValue.title}
            message={errorValue.message}
            setError={setError}
          />
        )}
    </styledComp.App>
    </div>
  );
};

export default App;

const styledComp = {
  App: styled.div`
    margin-bottom: 2rem;
    margin-right: 5vw;
    margin-left: 5vw;
    margin-top: 10vh;
    .button {
      background: #337ab7;
      color: white;
      padding: 0.5rem;
      margin-top: 1.5rem;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      .add {
        margin-right: 0.5rem;
        font-size: 1.2rem;
        transform: rotate(45deg);
      }

      :hover {
        background: #285f8f;
      }
    }
  `};
