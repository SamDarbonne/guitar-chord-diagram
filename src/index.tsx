import React from "react";
import "./index.css";

const noteSemitones: { [note: string]: number } = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  "E#": 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

const semitoneNotes: string[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const chordFormulas: { [chordType: string]: number[] } = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  "7": [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  maj6: [0, 4, 7, 9],
  min6: [0, 3, 7, 9],
};

const chordTypeMap: { [key: string]: { type: string; formatted: string } } = {
  "": { type: "maj", formatted: "Major" },
  m: { type: "min", formatted: "Minor" },
  min: { type: "min", formatted: "Minor" },
  M: { type: "maj", formatted: "Major" },
  maj: { type: "maj", formatted: "Major" },
  "7": { type: "7", formatted: "Dominant 7th" },
  maj7: { type: "maj7", formatted: "Major 7th" },
  M7: { type: "maj7", formatted: "Major 7th" },
  min7: { type: "min7", formatted: "Minor 7th" },
  m7: { type: "min7", formatted: "Minor 7th" },
  dim: { type: "dim", formatted: "Diminished" },
  dim7: { type: "dim7", formatted: "Diminished 7th" },
  aug: { type: "aug", formatted: "Augmented" },
  "+": { type: "aug", formatted: "Augmented" },
  sus2: { type: "sus2", formatted: "Suspended 2nd" },
  sus4: { type: "sus4", formatted: "Suspended 4th" },
  sus: { type: "sus4", formatted: "Suspended 4th" },
};

function getChordNotes(chordName: string): [string[], string | null] {
  // grab the root note
  let chordNameRemainder = chordName;
  const rootNoteMatch = chordNameRemainder.match(/^([A-G][#b]?)/);
  if (!rootNoteMatch) {
    return [[], null];
  }
  const rootNote = rootNoteMatch[1];
  chordNameRemainder = chordNameRemainder.slice(rootNote.length);

  // grab alterations from end of string
  const alterations: string[] = [];
  const alterationRegex = /([b#]\d+)$/;
  let alterationMatch;
  while (
    (alterationMatch = chordNameRemainder.match(alterationRegex)) !== null
  ) {
    alterations.unshift(alterationMatch[1]);
    chordNameRemainder = chordNameRemainder.slice(
      0,
      -alterationMatch[1].length
    );
  }
  // we're left with the chord type
  const chordType = chordNameRemainder;

  const chordTypeInfo = chordTypeMap[chordType];
  const normalizedChordType = chordTypeInfo?.type;
  const formattedChordName = chordTypeInfo?.formatted;

  if (!normalizedChordType) {
    return [[], null];
  }

  const rootSemitone = noteSemitones[rootNote];
  const intervals = chordFormulas[normalizedChordType]?.slice();

  if (!intervals) {
    return [[], null];
  }

  function degreeToSemitone(degree: number): number | null {
    switch (degree) {
      case 1:
        return 0;
      case 2:
        return 2;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 7;
      case 6:
        return 9;
      case 7:
        return 10;
      case 9:
        return 14;
      case 11:
        return 17;
      case 13:
        return 21;
      default:
        return null;
    }
  }

  alterations.forEach((alteration) => {
    const match = alteration.match(/([b#])(\d+)/);
    if (match) {
      const sign = match[1];
      const degree = parseInt(match[2], 10);
      let semitoneOffset = degreeToSemitone(degree);
      if (semitoneOffset !== null) {
        if (sign === "b") {
          semitoneOffset -= 1;
        } else if (sign === "#") {
          semitoneOffset += 1;
        }
        if (semitoneOffset < 0) {
          semitoneOffset += 12;
        }
        if (!intervals.includes(semitoneOffset)) {
          intervals.push(semitoneOffset);
        } else {
          intervals[intervals.indexOf(semitoneOffset)] = semitoneOffset;
        }
      }
    }
  });

  const notes = intervals.map((interval) => {
    const semitone = (rootSemitone + interval) % 12;
    return semitoneNotes[semitone];
  });

  return [notes, `${rootNote} ${formattedChordName} ${alterations.join(" ")}`];
}

const stringOrder = ["E", "A", "D", "G", "B", "E"];

const ChordCard: React.FC<{ chord: string }> = ({ chord }) => {
  const [notes, formattedChordName] = getChordNotes(chord);
  const getFirstMatchingNotePosition = (notes: string[], string: string) => {
    const chordSemitones = notes.map((note: string) => noteSemitones[note]);
    for (let i = 0; i < 12; i++) {
      console.log({
        chordSemitones,
        string,
        i,
        noteSemitones: noteSemitones[string],
      });
      if (chordSemitones.includes((noteSemitones[string] + i) % 12)) {
        return i;
      }
    }
    return 0;
  };

  return (
    <div className="chord-diagram-wrapper">
      <div className="chord-name">{formattedChordName}</div>
      <div className="chord-diagram">
        <div className="grid first-grid">
          {[1, 2, 3, 4, 5].map((_, stringIndex) => (
            <div className="string" key={stringIndex}>
              {[0, 1, 2, 3].map((fretIndex) => (
                <div className="fret" key={fretIndex}></div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid second-grid">
          {notes.length > 0 &&
            stringOrder.map((string, stringIndex) => {
              const fret = getFirstMatchingNotePosition(notes, string);
              return (
                <div
                  key={stringIndex}
                  className="note-string"
                  style={{ gridColumn: stringIndex + 1, gridRow: fret }}
                >
                  <div className={`note-dot ${fret === 0 ? "open" : ""}`} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ChordCard;
