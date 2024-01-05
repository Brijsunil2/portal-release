import "./ForumSection.css";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetForumMutation } from "../../slices/forumsApiSlice.js";
import { Container, Spinner, Modal, Button } from "react-bootstrap";
import ForumHeader from "./ForumHeader.jsx";
import ForumCreatePost from "./ForumCreatePost.jsx";
import ForumPostEntry from "./ForumPostEntry.jsx";
import { postReplys } from "../../slices/ioApiSlice.js";

import socketIO from "socket.io-client";
const socket = socketIO.connect(process.env.REACT_APP_BACKEND);

const ForumSection = () => {
  const { id } = useParams();
  const init = useRef(false);
  const navagate = useNavigate();
  const [forumData, setForumData] = useState({ posts: [] });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [getForum, { isLoading }] = useGetForumMutation();

  const handleModalClose = () => setShowModal(false);

  const handleModalShow = () => setShowModal(true);

  const fetchForum = useCallback(async () => {
    try {
      const res = await getForum({ id }).unwrap();
      setForumData({
        ...res.forum,
        createdAt: new Date(res.forum.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        updatedAt: new Date(res.forum.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        updatedAtTime: new Date(res.forum.updatedAt).toLocaleTimeString(
          "en-US"
        ),
      });
    } catch (err) {
      console.log(err?.data?.message || err.error);
      navagate("/");
    }
  }, [id, getForum, navagate]);

  
  useEffect(() => {
    if (!init.current) {
      init.current = true;
      fetchForum();
    }

    socket.on(`forumReplyUpdate/${id}`, (data) => {
      dispatch(postReplys(data));
      setForumData({...forumData, posts: [...forumData.posts, data]})
      setShowModal(false);
    });

    return () => socket.off("forumReplyUpdate/" + id);
  }, [fetchForum, id, socket, dispatch, setShowModal, forumData, setForumData]);

  return (
    <>
      {isLoading ? (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <div className="forumsection-container">
          <Container>
            <ForumHeader
              title={forumData.title}
              author={forumData.author}
              createdAt={forumData.createdAt}
              updatedAt={forumData.updatedAt}
              updatedAtTime={forumData.updatedAtTime}
              desc={forumData.desc}
            />
          </Container>
          <Container className="py-2 text-end">
            <Button onClick={handleModalShow}>+ Reply</Button>
          </Container>
          <Container>
            {isLoading ? (
              <Container className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Container>
            ) : (
              forumData.posts.map((post) => (
                <ForumPostEntry
                  key={post._id}
                  author={post.author}
                  msg={post.msg}
                  createdAt={new Date(post.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                  createdAtTime={new Date(post.updatedAt).toLocaleTimeString(
                    "en-US"
                  )}
                />
              ))
            )}
          </Container>
        </div>
      )}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForumCreatePost socket={socket} forumID={id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForumSection;
