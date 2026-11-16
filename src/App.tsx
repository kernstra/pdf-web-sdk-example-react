import { useCallback, useState } from 'react';
import { DocumentViewer } from './components/DocumentViewer';
import { PdfDropzone } from './components/PdfDropzone';

const FRAMEWORK = 'React';

export default function App() {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();

  function pick(picked: File) {
    const isPdf = picked.type === 'application/pdf' || picked.name.toLowerCase().endsWith('.pdf');
    setError(isPdf ? undefined : `${picked.name} is not a PDF.`);
    if (isPdf) setFile(picked);
  }

  // Back to the landing page, saying why.
  const fail = useCallback((failed: File, reason: unknown) => {
    console.error(reason);
    setError(`Could not open ${failed.name}: ${reason instanceof Error ? reason.message : reason}`);
    setFile(undefined);
  }, []);

  // The landing page until a PDF is chosen; the SDK loads only after that.
  if (!file) {
    return (
      <div className="app">
        <PdfDropzone framework={FRAMEWORK} error={error} onFile={pick} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <a className="brand" href="https://kernstra.com/web-sdk">
            <span className="brand-mark" aria-hidden="true" />
            Kernstra PDF Web SDK
          </a>
          <span>
            <span className="framework-mark" aria-hidden="true" />
            {FRAMEWORK}
          </span>
        </h1>
        <div className="app-nav">
          <span className="app-file">{file.name}</span>
          <button type="button" onClick={() => setFile(undefined)}>
            Open another PDF
          </button>
        </div>
      </header>
      <DocumentViewer file={file} onError={fail} />
    </div>
  );
}
