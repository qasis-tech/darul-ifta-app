import { useNavigate } from "react-router-dom";

import "./page-not-found.styles.scss";

const PageNotFound = () => {
  const navigation = useNavigate();
  return (
    <div className="error-page">
      <div className="error-page-container">
        <h1>404 Error</h1>
        <h1 className="error-text-color">Page Not Found</h1>
        <section className="error-container">
          <span>4</span>
          <span>
            <span className="screen-reader-text">0</span>
          </span>
          <span>4</span>
        </section>
      </div>
    </div>
  );
};
export default PageNotFound;
