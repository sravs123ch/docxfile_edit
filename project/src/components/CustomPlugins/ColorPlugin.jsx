import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import ColorPicker from "../ColorPicker";
const LOW_PRIORIRTY = 1
// Material UI Icons
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

export default function ColorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [{ color, bgColor }, setColors] = useState({
    color: "#000",
    bgColor: "#fff",
  });

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const color = $getSelectionStyleValueForProperty(
        selection,
        "color",
        "#000"
      );
      const bgColor = $getSelectionStyleValueForProperty(
        selection,
        "background",
        "#fff"
      );
      setColors({ color, bgColor });
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LOW_PRIORIRTY
      )
    );
  }, [editor]);

  const updateColor = ({ property, color }) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $patchStyleText(selection, { [property]: color });
      }
    });
  };

  return (
    <>
      {/* Text Color */}
      <ColorPicker
        color={color}
        onChange={(color) => {
          updateColor({ property: "color", color });
        }}
        icon={<FormatColorTextIcon />}
      />

      {/* Background Color */}
      <ColorPicker
        color={bgColor}
        onChange={(color) => {
          updateColor({ property: "background", color });
        }}
        icon={<FormatColorFillIcon />}
      />
    </>
  );
}
