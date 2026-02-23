import type React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '../common';

interface ReportMarkdownProps {
  markdown: string;
}

/**
 * Markdown report renderer
 * Renders the full dashboard report with dark-theme styling
 */
export const ReportMarkdown: React.FC<ReportMarkdownProps> = ({ markdown }) => {
  return (
    <Card variant="bordered" padding="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-white mt-6 mb-3 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-white mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-white mt-4 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-semibold text-white mt-3 mb-1">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-medium text-white/80 mt-2 mb-1">{children}</h5>
          ),
          p: ({ children }) => (
            <p className="text-secondary text-sm leading-relaxed mb-3">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-secondary/80 italic">{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan/50 pl-3 py-1 text-secondary text-sm my-3">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="w-full text-xs border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead>{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-white/5">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="text-white bg-white/5 p-2 text-left font-medium border border-white/10">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-secondary p-2 border border-white/5">{children}</td>
          ),
          hr: () => <hr className="border-white/10 my-4" />,
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-3 text-secondary text-sm">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-3 text-secondary text-sm">{children}</ol>
          ),
          li: ({ children }) => <li className="text-secondary text-sm">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <code className="block bg-white/5 rounded p-3 text-xs text-secondary overflow-x-auto my-2">
                  {children}
                </code>
              );
            }
            return (
              <code className="text-cyan bg-white/5 px-1 rounded text-xs">{children}</code>
            );
          },
          pre: ({ children }) => <pre className="my-2">{children}</pre>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Card>
  );
};
