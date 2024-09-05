"use client";
import "./Card.css";
import React from "react";
import { CardProps } from "@/lib/utils/types";
import Button from "./Button";
import Link from "next/link";
import { useState } from "react";
const Card: React.FC<CardProps> = ({ doc, onClick }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { category, title, tags, description } = doc;
  // Function to open the modal
  return (
    <div
      className="card"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onClick={onClick} // Clicking the card opens the modal
    >
      <div className="title">{title}</div>
      <div className="category">{category}</div>
      <div className="tags">
        {tags.split(",").map(
          (tag) =>
            tag.trim() !== "" && (
              <span key={tag} className="tag">
                {tag}
              </span>
            )
        )}
      </div>
      {/* <Link href="#" onClick={() => onOpenModal(doc)}>
        <Button buttonType="button">Show Description</Button>
      </Link> */}
      {isTooltipVisible && <div className="tooltip">{description}</div>}
      {/* <div className="shine"></div>
      <div className="background">
        <div className="tiles">
          <div className="tile tile-1"></div>
          <div className="tile tile-2"></div>
          <div className="tile tile-3"></div>
          <div className="tile tile-4"></div>

          <div className="tile tile-5"></div>
          <div className="tile tile-6"></div>
          <div className="tile tile-7"></div>
          <div className="tile tile-8"></div>

          <div className="tile tile-9"></div>
          <div className="tile tile-10"></div>
        </div>

        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div> */}
    </div>
  );
};
export default Card;
