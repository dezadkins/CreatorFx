import "./GridLayout.css";

export default function GridLayout() {
  return (
    <>
      {/* <div></div> */}
      <div className="container">
        <div className="sidebar">
          <p>sidebar 1</p>
        </div>
        <div className="main-content">
          <div className="header ">
            <p>header</p>
          </div>
          <p>main</p>
          <div></div>
        </div>
      </div>
      {/* <div className="container">
        <footer class="footer">
          <p>footer</p>
        </footer>
      </div> */}
    </>
  );
}
