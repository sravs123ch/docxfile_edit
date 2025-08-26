import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

export default function PageBreakHandler({ onPageChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const content = root.getTextContent();
        
        // Simple page calculation based on content length
        // In a real implementation, you'd measure actual rendered height
        const wordsPerPage = 500; // Approximate words per page
        const wordCount = content.split(/\s+/).length;
        const pageCount = Math.max(1, Math.ceil(wordCount / wordsPerPage));
        
        if (onPageChange) {
          onPageChange(pageCount);
        }
      });
    });

    return unregister;
  }, [editor, onPageChange]);

  return null;
}