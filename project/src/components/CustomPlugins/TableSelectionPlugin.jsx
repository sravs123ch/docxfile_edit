import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { 
  $getSelection, 
  $isRangeSelection, 
  COMMAND_PRIORITY_LOW,
  CLICK_COMMAND,
} from "lexical";
import { $isTableCellNode } from "@lexical/table";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";

export default function TableSelectionPlugin() {
  const [editor] = useLexicalComposerContext();
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    let isMouseDown = false;

    const handleMouseDown = (event) => {
      const target = event.target;
      const cell = target.closest('td, th');
      
      if (cell) {
        isMouseDown = true;
        setIsSelecting(true);
        setStartCell(cell);
        
        const cellKey = cell.getAttribute('data-lexical-key');
        if (cellKey) {
          setSelectedCells(new Set([cellKey]));
        }
        
        event.preventDefault();
      }
    };

    const handleMouseMove = (event) => {
      if (!isMouseDown || !isSelecting) return;
      
      const target = event.target;
      const cell = target.closest('td, th');
      
      if (cell && startCell) {
        const cellKey = cell.getAttribute('data-lexical-key');
        const startCellKey = startCell.getAttribute('data-lexical-key');
        
        if (cellKey && startCellKey) {
          // Get all cells between start and current cell
          const table = cell.closest('table');
          if (table) {
            const cells = Array.from(table.querySelectorAll('td, th'));
            const startIndex = cells.indexOf(startCell);
            const endIndex = cells.indexOf(cell);
            
            const minIndex = Math.min(startIndex, endIndex);
            const maxIndex = Math.max(startIndex, endIndex);
            
            const selectedKeys = new Set();
            for (let i = minIndex; i <= maxIndex; i++) {
              const key = cells[i].getAttribute('data-lexical-key');
              if (key) selectedKeys.add(key);
            }
            
            setSelectedCells(selectedKeys);
          }
        }
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setIsSelecting(false);
      setStartCell(null);
    };

    const handleClick = (event) => {
      const target = event.target;
      const cell = target.closest('td, th');
      
      if (!cell) {
        // Clicked outside table, clear selection
        setSelectedCells(new Set());
      }
    };

    rootElement.addEventListener('mousedown', handleMouseDown);
    rootElement.addEventListener('mousemove', handleMouseMove);
    rootElement.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleClick);

    return mergeRegister(
      () => {
        rootElement.removeEventListener('mousedown', handleMouseDown);
        rootElement.removeEventListener('mousemove', handleMouseMove);
        rootElement.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('click', handleClick);
      }
    );
  }, [editor, isSelecting, startCell]);

  // Apply visual selection to cells
  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    // Remove previous selections
    const previouslySelected = rootElement.querySelectorAll('.table-cell-selected');
    previouslySelected.forEach(cell => {
      cell.classList.remove('table-cell-selected');
    });

    // Apply new selections
    selectedCells.forEach(cellKey => {
      const cellElement = rootElement.querySelector(`[data-lexical-key="${cellKey}"]`);
      if (cellElement) {
        cellElement.classList.add('table-cell-selected');
      }
    });
  }, [selectedCells, editor]);

  // Expose selected cells for other plugins to use
  useEffect(() => {
    // Store selected cells in editor for other plugins to access
    editor._selectedTableCells = selectedCells;
  }, [selectedCells, editor]);
  return null;
}