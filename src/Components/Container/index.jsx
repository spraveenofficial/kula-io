import "./style.css"
const Container = ({ children }) => {
  return (
    <div className="container">
      <div className="container_data">{children}</div>
    </div>
  );
};
export { Container };
