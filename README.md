## @sdarbonne/react-guitar-chord

### What this library does:

takes in a chord name ("C", "Ddim", "G#maj7b9") and displays a guitar chord diagram for it.

### What this library does not do:

- have any regard for playability
- think about bar chords
- display alternate positions
- display fingering

usage:

```
import GuitarChord from '@sdarbonne/react-guitar-chord'

...
return (
    <GuitarChord chord="Cm">
    <GuitarChord chord="Dmaj7">
    <GuitarChord chord="Emb9#13">
)
```
