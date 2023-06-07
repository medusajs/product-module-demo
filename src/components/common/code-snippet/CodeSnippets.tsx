"use client";

import { Highlight, themes } from "prism-react-renderer";

type Props = {
  label: string;
  language: string;
  code: string;
};

const CodeSnippets: React.FC<Props> = ({ label, language, code }) => {
  return (
    <div className="rounded-lg bg-code-header-dark shadow-card-rest-dark w-full my-4">
      <div className="flex justify-end gap-2 rounded-t-lg border-b border-b-base-dark bg-code-base-dark px-6 py-4 w-full">
        <span>{label}</span>
      </div>
      <div className="p-6 overflow-auto">
        <Highlight
          theme={{
            ...themes.palenight,
            plain: {
              color: "#7E7D86",
              backgroundColor: "#1C1C1F",
            },
          }}
          code={code}
          language={language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, background: "transparent", fontSize: "12px" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeSnippets;
