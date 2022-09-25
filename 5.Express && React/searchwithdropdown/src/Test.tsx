import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

function Test() {
  const [anchorEl, setAnchorEl] = useState<null | EventTarget>(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection(searchData[0].name);
  }, []);

  const handleMenuOpen = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    if (currentTarget !== null) {
      setAnchorEl(currentTarget);
    }
  };

  const handleClose = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null) {
      if (e.target.innerText !== selection && e.target.innerText !== "") {
        setSelection(e.target.innerText);
      }
      setSearchText("");
      setAnchorEl(null);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return <div></div>;
}

export default Test;

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
