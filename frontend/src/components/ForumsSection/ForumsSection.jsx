import "./ForumsSection.css";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { useGetForumsMutation } from "../../slices/forumsApiSlice.js";
import ForumEntry from "./ForumEntry";
import Searchbar from "../Searchbar/Searchbar";
import ForumCreateForm from "./ForumCreateForm";

const ForumsSection = () => {
  const DESC_MAX_LENGTH = 300;
  const init = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [forums, setForums] = useState([]);
  const [pages, setPages] = useState({ page: 1, lastPage: 1, btnToolbar: [1] });
  const [titleQuery, setTitleQuery] = useState("");

  const [getForums, { isLoading }] = useGetForumsMutation();

  const helperBtnToolbar = (page, lastPage) => {
    let btns = [];
    var i = 1;

    if (lastPage < 5) {
      i = 1;
    } else if (page >= 3 && page <= lastPage - 3) {
      i = page - 2;
    } else if (page >= lastPage - 3) {
      i = lastPage - 4;
    }

    var j = 0;
    while (j < 5 && i <= lastPage) {
      btns.push(i);
      i++;
      j++;
    }

    return btns;
  };

  const getForumsHandler = async (skip, title = "") => {
    try {
      const res = await getForums({ skip, title }).unwrap();
      setForums(res.forums);
      setPages({
        page: skip + 1,
        lastPage: Math.ceil(res.count / 10),
        btnToolbar: helperBtnToolbar(skip + 1, Math.ceil(res.count / 10)),
      });
    } catch (err) {
      if (err.status === 500) {
        setForums([]);
        setPages({
          page: 1,
          lastPage: 1,
          btnToolbar: [1],
        });
      }
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!init.current) {
      getForumsHandler(pages.page - 1);
    }

    return () => (init.current = true);
  }, [init, getForumsHandler]);

  const handleModalClose = () => setShowModal(false);

  const handleModalShow = () => setShowModal(true);

  const searchBarSubmit = (value) => {
    setTitleQuery(value);
    getForumsHandler(0, value);
  };

  return (
    <>
      <div className="forumssection-container">
        <Container>
          <h2>Forums</h2>
          <Container>
            <Row className="mt-2">
              <Col xs={8}>
                <Searchbar submitFunc={searchBarSubmit} />
              </Col>
              <Col className="text-end">
                <Button onClick={handleModalShow}>Create Forum</Button>
              </Col>
            </Row>
          </Container>
          <Container className="forumentries-container">
            {titleQuery !== "" ? (
              <h3>
                {forums.length > 0
                  ? `Results for ${titleQuery}`
                  : "No forums found"}
              </h3>
            ) : (
              <h3>
                {
                  forums.length === 0 && "Server is unable to find any forums"
                }
              </h3>
            )
          }
            {forums.length > 0 && (
              <Container className="text-center" style={{ fontWeight: "bold" }}>
                <p>
                  <HiDotsHorizontal /> {pages.page} / {pages.lastPage}{" "}
                  <HiDotsHorizontal />
                </p>
              </Container>
            )}
            {isLoading ? (
              <Container className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Container>
            ) : (
              forums.map((forum) => (
                <ForumEntry
                  key={forum._id}
                  _id={forum._id}
                  author={forum.author}
                  dateCreated={new Date(forum.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                  title={forum.title}
                  desc={forum.desc.slice(0, DESC_MAX_LENGTH) + "..."}
                  numPosts={forum.numPosts}
                />
              ))
            )}
          </Container>
          {forums.length > 0 && (
            <Container className="my-3 justify-self-center">
              <ButtonToolbar
                className="justify-content-center align-items-center"
                aria-label="Toolbar with button groups"
              >
                {pages.page !== 1 && (
                  <>
                    <ButtonGroup className="m-1">
                      <Button onClick={() => getForumsHandler(0, titleQuery)}>
                        <MdKeyboardDoubleArrowLeft />
                      </Button>
                      <Button
                        onClick={() =>
                          getForumsHandler(pages.page - 2, titleQuery)
                        }
                      >
                        <MdKeyboardArrowLeft />
                      </Button>
                    </ButtonGroup>
                    <HiDotsHorizontal />
                  </>
                )}

                <ButtonGroup className="m-1" aria-label="First group">
                  {pages.btnToolbar.map((btnNum) => (
                    <Button
                      key={btnNum}
                      active={btnNum === pages.page}
                      onClick={() => getForumsHandler(btnNum - 1, titleQuery)}
                    >
                      {btnNum}
                    </Button>
                  ))}
                </ButtonGroup>
                {pages.page !== pages.lastPage && (
                  <>
                    <HiDotsHorizontal />

                    <ButtonGroup className="m-1">
                      <Button
                        onClick={() => getForumsHandler(pages.page, titleQuery)}
                      >
                        <MdKeyboardArrowRight />
                      </Button>
                      <Button
                        onClick={() =>
                          getForumsHandler(pages.lastPage - 1, titleQuery)
                        }
                      >
                        <MdKeyboardDoubleArrowRight />
                      </Button>
                    </ButtonGroup>
                  </>
                )}
              </ButtonToolbar>
            </Container>
          )}
        </Container>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForumCreateForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForumsSection;
