import React from "react";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return <div>Code Block</div>;
};

export default CodeBlock;
