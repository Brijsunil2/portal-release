import "./Searchbar.css";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Searchbar = ({ submitFunc }) => {
  const [searchInput, setSearchInput] = useState("");

  const searchOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = (e) => {
    setSearchInput("");
  };

  const searchOnSubmit = async (e) => {
    e.preventDefault();
    await submitFunc(searchInput);
  };

  return (
    <Form className="searchbar-container" onSubmit={searchOnSubmit}>
      <Form.Group className="mb-3 d-flex">
        <Form.Control type="text" placeholder="Search" value={searchInput} onChange={searchOnChange} />
        {searchInput !== "" && <FaXmark className="clear-x" onClick={clearSearch}/>}
        <Button type="submit">
          <AiOutlineSearch className="search-icon" />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Searchbar;
