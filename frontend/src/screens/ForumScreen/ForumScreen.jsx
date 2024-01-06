import "./ForumScreen.css";
import ForumSection from "../../components/ForumSection/ForumSection.jsx";

const ForumScreen = () => {
  console.log(process.env.REACT_APP_BACKEND);
  return (
    <div className="forumscreen-container">
      <div className="primary-container">
        <ForumSection />
      </div>
    </div>
  );
};

export default ForumScreen;