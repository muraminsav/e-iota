import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListItem({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${item.id}`);
  };

  return (
    <li onClick={handleClick}>
      Room Id:{item.id} {item.players}/4{" "}
      {item.players.length < 2 ? "Player" : "Players"}
    </li>
  );
}
