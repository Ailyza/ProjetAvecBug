import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [isPaused, setPause] = useState(false);
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus 
  ? data.focus.sort((evtA, evtB) => new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)
  : [];
  const nextCard = () => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
  };

  useEffect(() => {
    if (byDateDesc && byDateDesc.length && !isPaused) {
      const timer = setTimeout(nextCard, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [index, byDateDesc, isPaused]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Space") {
        setPause(!isPaused);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isPaused]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((radio, radioIdx) => (
                <input
                  key={radio.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;