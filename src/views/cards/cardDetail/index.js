import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  dispatchRefreshItem,
  updatedItem,
} from "../../../application/actions/Items";
import { DateText } from "../../../application/Hooks/DateText";
import "./index.scss";
export const CardDetails = ({
  category,
  description,
  lastUpdated,
  name,
  picture,
  votes,
  vote,
}) => {
  const [totalVotes, setTotalVotes] = useState();
  const [votesBool, setVotesBool] = useState();
  const [currentMessage, setCurrentMessage] = useState();
  const [currentVoteButton, setCurrentVoteButton] = useState({positive:votes?.positive,negative:votes?.negative,vote:false});
  const message = DateText(lastUpdated, category);
  const dispatch = useDispatch();
  useEffect(() => {
    const total = votes?.positive + votes?.negative;
    setTotalVotes({
      positive: ((votes?.positive / total) * 100).toFixed(1),
      negative: ((votes?.negative / total) * 100).toFixed(1),
    });
    setVotesBool(vote);
    setCurrentVoteButton(votes);
  }, [votes, vote]);
  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);
  const handleSendVote = () => {
    if (votesBool) {
      setVotesBool(false);
      dispatch(dispatchRefreshItem(name));
    } else {
      setVotesBool(true);
      dispatch(
        updatedItem({ name: name, votes: currentVoteButton, vote: true })
      );
    }
  };
  const handleVote = (type) => {
    setCurrentVoteButton({
      ...currentVoteButton,
      [type]: currentVoteButton?.[type] + 1,
      vote: true,
    });
  };

  return (
    <div className="card-item" style={{ backgroundImage: `url(${picture})` }}>
      <div className="card-item__content">
        <div className="card-item__content-text">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className="card-item__content-buttons">
          <p className="card-item__content-button--messaje">
            {votesBool ? "Thank you for your vote!" : currentMessage}
          </p>

          <div className="card-item__content-buttons__build">
            {!votesBool && (
              <>
                <div
                  className="card-item__button card-item__button-up"
                  onClick={() => handleVote("positive")}
                >
                  <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
                </div>
                <div
                  className="card-item__button card-item__button-down"
                  onClick={() => handleVote("negative")}
                >
                  <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
                </div>
              </>
            )}
            <button
              disabled={!currentVoteButton?.vote}
              className="card-item__button card-item__button-vote"
              onClick={handleSendVote}
            >
              {!votesBool ? "vote now" : "vote again"}
            </button>
          </div>
        </div>
      </div>
      {totalVotes?.positive < totalVotes?.negative ? (
        <div className="card-item__button card-item__button--absolute card-item__button-down">
          <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
        </div>
      ) : (
        <div className="card-item__button card-item__button--absolute card-item__button-up">
          <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
        </div>
      )}

      <div className="card-item__bar">
        <div
          className="card-item__bar-general card-item__bar-up"
          style={{ width: `${totalVotes?.positive}%` }}
        >
          <div className="card-item__bar-content">
            <figure>
              <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
            </figure>
            <p>{totalVotes?.positive}%</p>
          </div>
        </div>
        <div
          className="card-item__bar-general card-item__bar-down"
          style={{ width: `${totalVotes?.negative}%` }}
        >
          <div className="card-item__bar-content">
            <p>{totalVotes?.negative}%</p>
            <figure>
              <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
