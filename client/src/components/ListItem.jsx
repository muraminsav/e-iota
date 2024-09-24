import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListItem({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${item}`);
  };

  return <li onClick={handleClick}>{item}</li>;
}
