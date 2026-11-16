import { useState, type ChangeEvent, type DragEvent } from 'react';

type Props = {
  /** The framework this example is written in, shown on the page. */
  framework: string;
  /** Why the last file did not open, if it did not. */
  error?: string;
  onFile: (file: File) => void;
};

// The landing page: takes a PDF from the file picker or a drop.
export function PdfDropzone({ framework, error, onFile }: Props) {
  const [dragging, setDragging] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ''; // so choosing the same file again fires `change`
    if (file) onFile(file);
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault(); // allow the drop
    setDragging(true);
  }

  function onDrop(event: DragEvent) {
    event.preventDefault(); // keep the browser from opening the file itself
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFile(file);
  }

  return (
    <main className="landing">
      <div className="landing-lockup" aria-hidden="true">
        <span className="brand-mark" />
        <span>+</span>
        <span className="framework-mark" />
      </div>
      <a className="brand" href="https://kernstra.com/web-sdk">Kernstra PDF Web SDK</a>
      <p className="landing-framework">{framework} example</p>
      <h1>Open a PDF to view, annotate and edit it</h1>
      <p className="landing-lead">
        The Kernstra PDF Web SDK running in a {framework} app. Your file stays in the browser:
        nothing is uploaded.
      </p>
      <label
        className="dropzone"
        data-dragging={dragging}
        onDragOver={onDragOver}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input type="file" accept="application/pdf,.pdf" onChange={onChange} />
        <strong>Drop a PDF here</strong>
        <span>
          or <u>choose a file</u>
        </span>
      </label>
      {error && (
        <p className="landing-error" role="alert">
          {error}
        </p>
      )}
      <p className="landing-links">
        <a href="https://kernstra.com/web-sdk/get-started">Get started</a>
        <a href="https://kernstra.com/docs/web-sdk">Documentation</a>
        <a href="https://kernstra.com/">kernstra.com</a>
      </p>
    </main>
  );
}
