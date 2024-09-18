import React from "react";

interface ArticleProps {
  title: string;
  content: string;
}

const Article: React.FC<ArticleProps> = ({ title, content }) => (
  <div className="w-80 ml-36">
    <h1 className="text-4xl text-custom-darkteal mb-12">{title}</h1>
    <article className="text-xl text-white">{content}</article>
  </div>
);

export default Article;
