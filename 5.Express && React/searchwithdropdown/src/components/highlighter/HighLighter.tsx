import { highlighterProps } from "../types";

function HighLighter({ phrase, name }: highlighterProps) {
  const parts = name.split(new RegExp(`(${phrase})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === phrase.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
}

export default HighLighter;
