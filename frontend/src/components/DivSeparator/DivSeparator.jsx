import "./DivSeparator.css";

const DivSeparator = ({ color }) => {
  return <div className="div-separator" style={{borderBottom: "5em solid " + color }}></div>;
};

export default DivSeparator;
