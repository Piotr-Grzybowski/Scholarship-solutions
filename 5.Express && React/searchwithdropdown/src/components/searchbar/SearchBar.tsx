import { ChangeEvent, useEffect, useState } from "react";
import DropDownList from "../dropdownlist/DropDownList";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { element } from "../types";

function Search() {
  const [phrase, setPhrase] = useState("");
  const [foundItem, setFoundItem] = useState<element[]>([]);

  useEffect(() => {
    setFoundItem(searchForPhrase(phrase));
  }, [phrase]);

  return (
    <div>
      <Paper
        component="form"
        sx={{
          bgcolor: "#f4f2f2",
          p: "2px 4px",
          display: "flex",
          borderRadius: 6,
          alignItems: "center",
          width: 550,
        }}
      >
        <InputBase
          onChange={handleOnChange}
          sx={{ ml: 1, flex: 1 }}
          placeholder="search for word"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {phrase.length > 3 ? (
        <DropDownList elements={foundItem} phrase={phrase}></DropDownList>
      ) : (
        ""
      )}
    </div>
  );

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setPhrase(e.target.value);
  }

  function searchForPhrase(phrase: string) {
    const data = searchData.filter((element) => {
      return element.name.toLowerCase().includes(phrase.toLowerCase());
    });
    return data.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // function boldTheText(array: element[]) {
  //   let newArray = [];
  //   for (let element of array) {
  //     newArray.push({
  //       name: element.name.replaceAll("Word", "<span>Some!</span>"),
  //       regularPrice: element.regularPrice,
  //       salePrice: element.salePrice,
  //     });
  //   }
  //   return newArray;
  // }
}

export default Search;

const searchData = [
  {
    name: "Fixed TOC - table of contents for WordPress plugin",
    regularPrice: 20,
    salePrice: 3.99,
  },
  {
    name: "Jobify - The Most Popular WordpPress Job Board Theme",
    regularPrice: 59,
    salePrice: 3.99,
  },
  {
    name: "Lorem ipsum",
    regularPrice: 99,
    salePrice: 21,
  },
];
