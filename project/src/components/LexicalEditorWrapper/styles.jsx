import styled from "@emotion/styled";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 300,
  width: "100%",
  padding: "0 8px",
  borderRadius: 5,
  paddingTop: 2,
  paddingLeft: 10,
  position: "relative",
  outline: "none",
  lineHeight: 1.4,
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
});

export const placeHolderSx = {
  position: "absolute",
  top: 15,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
  fontSize: "15px",
  lineHeight: 1.4,
};
