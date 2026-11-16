import { useEffect, useRef } from 'react';
import { PDFDocument, PDFViewer } from '@kernstra/pdf-web-sdk';
import { initKernstra } from '../lib/kernstra';

type Props = {
  file: File;
  /** The file did not open. Pass a stable function (useCallback). */
  onError: (file: File, error: unknown) => void;
};

export function DocumentViewer({ file, onError }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let canceled = false;
    let doc: PDFDocument | undefined;
    let viewer: PDFViewer | undefined;

    (async () => {
      await initKernstra(); // safe on every mount
      const opened = await PDFDocument.fromFile(file);
      // Unmounted while loading (StrictMode's first run, a new file):
      // nothing else will close it.
      if (canceled) {
        await opened.close();
        return;
      }
      doc = opened;
      viewer = new PDFViewer(ref.current!, doc);
    })().catch((error) => {
      if (!canceled) onError(file, error);
    });

    return () => {
      canceled = true;
      viewer?.destroy();
      void doc?.close();
    };
  }, [file, onError]); // a new file opens a new document

  // The container needs a height: .viewer fills what the header leaves.
  return <div ref={ref} className="viewer" />;
}
