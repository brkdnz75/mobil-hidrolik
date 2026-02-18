export function MarkdownView({ content }: { content: string }) {
  const lines = content.split('\n').filter((line) => line.trim() !== '');

  return (
    <div className="prose-lite">
      {lines.map((line, index) => {
        if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={index}>{line.replace('### ', '')}</h3>;
        if (line.startsWith('- ')) return <li key={index}>{line.replace('- ', '')}</li>;
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}
