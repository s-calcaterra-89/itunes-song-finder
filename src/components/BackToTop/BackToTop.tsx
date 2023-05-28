import useScrollToTop from "../../hooks/useScrollToTop";
import arrowUp from "../../images/arrowUp.svg";
import { handleBackToTop } from "../../utils/utils";
import "./BackToTop.css";

export const BackToTop = () => {
  const { showBackToTop } = useScrollToTop();
  return (
    <>
      {showBackToTop && (
        <div className="back-to-top" onClick={handleBackToTop}>
          <img src={arrowUp} alt="Back to Top"></img>
        </div>
      )}
    </>
  );
};
