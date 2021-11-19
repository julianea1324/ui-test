import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dispatchItems } from "../../application/actions/Items";
import { CardDetails } from "./cardDetail";
import "./index.scss";
import { List } from "./list";
export const Card = () => {
  const { items } = useSelector((state) => state.items);
  const [type, setType] = useState("list");
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(dispatchItems())
  }, [dispatch])
  return (
    <section id="card" className={type}>
      <div className="card-infinite">
        <List setType={setType} />
        {items?.map((e, i) => (
          <CardDetails {...e} key={i} />
        ))}
      </div>
    </section>
  );
};
